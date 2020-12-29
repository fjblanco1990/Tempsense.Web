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
  //#endregion
  @Output() emitEventClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  public DataUsuarios: any[] = [];
  constructor(public usuariosService: UsuariosService, public perfilesService: PerfilesService, public empresasService: EmpresasService,
              private notificacionesService: NotificacionesService, public sedesService: SedesService) { }

  ngOnInit(): void {
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
      this.usuariosFrom.get('IdUsuario').setValue(0);
      this.usuariosService.GuardarUsuarios(JSON.stringify(this.usuariosFrom.value)).subscribe(
        resutl => {
          this.usuariosFrom.reset();
          this.notificacionesService.Exitoso('Usuario');
        }
      );
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

  LimpiarFormulario(): any {
    this.usuariosFrom.reset();
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
    const IdSede = new FormControl('', [Validators.required]);
    const IdPerfil = new FormControl('', [Validators.required]);
    const Email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);

    this.usuariosFrom = new FormGroup({
      IdUsuario,
      Nombre,
      Passwords,
      Telefono,
      IdEmpresa,
      IdSede,
      IdPerfil,
      Email
    });
  }

}
