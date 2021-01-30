import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { PerfilesService } from 'src/app/Services/Perfiles/Perfiles.service';
import { SedesService } from 'src/app/Services/Sedes/Sedes.service';
import { UsuariosService } from 'src/app/Services/Usuarios/Usuarios.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css'],
  providers: [UsuariosService, EmpresasService, SedesService, PerfilesService, NotificacionesService]
})
export class UserConfigComponent implements OnInit {
  //#region Variables carga
  public DataEmpresa: any;
  public DataSedes: any;
  public DataPerfiles: any;
  public usuariosFrom: any;
  isTrue = 1;
  //#endregion
  @Output() emitEventClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  public DataUsuarios: any[] = [];
  public items = [];
  public DataSede: any[] = [];
  public activarActualizar;
  public activarGuardar;
  constructor(public usuariosService: UsuariosService, public perfilesService: PerfilesService, public empresasService: EmpresasService,
              private notificacionesService: NotificacionesService, public sedesService: SedesService) { }

  ngOnInit(): void {
    this.activarGuardar = true;
    this.activarActualizar = false;
    // this.isTrue = 1;
    $('#example').DataTable({
      '"columns"': [
        { '"data"': 'name' },
        { '"data"': 'name' },
        { '"data"': 'name' },
        { '"data"': 'name' },
        { '"data"': 'name' },
      ]
    });
    this.validarUsuarios();
    this.GetAllEmpresas();
    this.GetAllProfileS();
    this.GetAllUsers();
  }

  returnBack(): any {
    this.emitEventClose.emit(true);
  }

  GuardarUsuarios(): any {
    if (this.usuariosFrom.valid) {
      if (this.ValidarSeleccion(this.usuariosFrom.value.IdSede)) {
        if (this.usuariosFrom.value.sedes.length > 0) {
          this.usuariosFrom.get('IdUsuario').setValue(0);

          this.usuariosService.GuardarUsuarios(JSON.stringify(this.usuariosFrom.value)).subscribe(
            resutl => {
              this.usuariosFrom.reset();
              this.notificacionesService.Exitoso('Usuario');
              this.GetAllUsers();
            }
          );
        } else {
          this.notificacionesService.Advertencia('Debe agregar sedes al usuario.');
        }
      }
    } else {
      this.ValidarErrorForm(this.usuariosFrom);
    }
  }

  ActualizarUsuarios(): any {
    if (this.usuariosFrom.valid) {
      if (this.ValidarSeleccion(this.usuariosFrom.value.IdSede)) {
        if (this.usuariosFrom.value.sedes.length > 0) {
          this.usuariosService.UpdateUsuario(JSON.stringify(this.usuariosFrom.value)).subscribe(
            resutl => {
              this.usuariosFrom.reset();
              this.notificacionesService.Exitoso('Usuario');
              this.GetAllUsers();
              this.activarGuardar = true;
              this.activarActualizar = false;
            }
          );
        } else {
          this.notificacionesService.Advertencia('Debe agregar sedes al usuario.');
        }
      }
    } else {
      this.ValidarErrorForm(this.usuariosFrom);
    }
  }

  GetAllUsers(): any {
    this.usuariosService.GetAllUsuarios().subscribe(
      resutl => {
        this.DataUsuarios = resutl;
      },
      error => {
        this.notificacionesService.Error(error);
      }
    );
  }

  EliminarDispositivo(id): any {
    Swal.fire({
      title: 'Advertencia',
      text: 'Esta seguro de eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9F0C09',
      cancelButtonColor: '#EA9700',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.DeleteUsuario(JSON.stringify(id)).subscribe(
          resutl => {
            this.usuariosFrom.reset();
            this.GetAllUsers();
            this.notificacionesService.ExitosoEliminar('Registro');
          }, error => {
            console.error(error);
          }
        );
      }
    });
  }

  MappearUsuario(dataUser): any {
    this.activarGuardar = false;
    this.activarActualizar = true;
    this.usuariosFrom.get('IdUsuario').setValue(dataUser.IdUsuario);
    this.usuariosFrom.get('Nombre').setValue(dataUser.Nombre);
    this.usuariosFrom.get('Passwords').setValue(dataUser.Passwords);
    this.usuariosFrom.get('Telefono').setValue(dataUser.Telefono);
    this.usuariosFrom.get('Email').setValue(dataUser.Email);
    this.usuariosFrom.get('IdPerfil').setValue(dataUser.IdPerfil.IdPerfil);
    this.usuariosFrom.get('IdEmpresa').setValue(dataUser.IdEmpresa.IdEmpresa);
    this.usuariosFrom.get('IdSede').setValue(0);
    this.GetSedesXEmpresa();
    this.usuariosFrom.get('sedes').setValue(dataUser.IdSede);
  }

  GetAllEmpresas(): any {
    this.empresasService.GetAllEmpresas().subscribe(
      resutl => {
        this.DataEmpresa = resutl;
      }
    );
  }

  GetSedesXEmpresa(): any {
    const empresa = this.usuariosFrom.get('IdEmpresa').value;
    this.sedesService.GetSedeXEmpresa(empresa).subscribe(
      resutl => {
        this.DataSedes = resutl;
      }
    );
  }

  GetAllProfileS(): any {
    this.perfilesService.GetAllProfiles().subscribe(
      resutl => {
        this.DataPerfiles = resutl;
      }
    );
  }

  RemovedTags($event): any {
    const indexDelete = this.items.findIndex(status => status.IdSede === $event.IdSede);
    this.items.splice(indexDelete, 1);
  }

  addSedesTags(data): any {
    let existeSede = false;

    if (this.items.length === 0) {
      this.items.push(this.usuariosFrom.get('IdSede').value);
      this.usuariosFrom.get('sedes').setValue(this.items);
      existeSede = true;
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].IdSede === this.usuariosFrom.controls.IdSede.value.IdSede) {
          existeSede = true;
        }
      }
    }
    if (!existeSede) {
      this.items.push(this.usuariosFrom.get('IdSede').value);
      this.usuariosFrom.get('sedes').setValue(this.items);
    }

    this.usuariosFrom.get('IdSede').reset();
  }

  DetallerSedes(dataSedes): any {
    this.DataSede = dataSedes;
  }

  LimpiarFormulario(): any {
    this.activarGuardar = true;
    this.activarActualizar = false;
    this.usuariosFrom.reset();
  }

  ValidarSeleccion(selecc): boolean {
    if (selecc === 0 && selecc !== null) {
      this.notificacionesService.Advertencia('debe seleccionar un valor');
      return false;
    } else {
      return true;
    }
  }
  ValidarErrorForm(formulario: any): any {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }

  validarUsuarios(): any {
    const IdUsuario = new FormControl('', []);
    const Nombre = new FormControl('', [Validators.required, Validators.pattern('[A-Za-zñÑ ]*')]);
    const Passwords = new FormControl('', [Validators.required]);
    const Telefono = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*')]);
    const IdEmpresa = new FormControl('', [Validators.required]);
    const IdSede = new FormControl('', []);
    const IdPerfil = new FormControl('', [Validators.required]);
    const Email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
    const sedes = new FormControl('', [Validators.required]);
    this.usuariosFrom = new FormGroup({
      IdUsuario,
      Nombre,
      Passwords,
      Telefono,
      IdEmpresa,
      IdSede,
      IdPerfil,
      Email,
      sedes
    });
  }

}
