import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { LoginService } from 'src/app/Services/Login/Login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas-config',
  templateUrl: './empresas-config.component.html',
  styleUrls: ['./empresas-config.component.css'],
  providers: [EmpresasService, LoginService, NotificacionesService]
})
export class EmpresasConfigComponent implements OnInit {
  public DataEmpresa: any[] = [];
  public empresaFrom: any;
  public ValidarSesionModel = new ValidarSesionModel();
  public activarActualizar: boolean;
  public activarGuardar: boolean;
  @Output() emitEventEmpresa: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public empresasService: EmpresasService, private loginService: LoginService,
              private notificacionesService: NotificacionesService) { }

  ngOnInit(): void {
    this.activarGuardar = true;
    this.activarActualizar = null;
    this.ValidarSesion();
    this.validarEmpresas();
    this.GetAllEmpresas();
  }

  GetAllEmpresas(): any {
    this.empresasService.GetAllEmpresas().subscribe(
      resutl => {
        this.DataEmpresa = resutl;
      }
    );
  }

  GuardarEmpresa(): any {
    if (this.empresaFrom.valid) {
      this.empresasService.SaveEmpresa(JSON.stringify(this.empresaFrom.value)).subscribe(
        resutl => {
          this.empresaFrom.reset();
          this.GetAllEmpresas();
          this.emitEventEmpresa.emit(true);
        }
      );
    } else {
      this.ValidarErrorForm(this.empresaFrom);
    }

  }

  ActualizarEmpresa(): any {
    if (this.empresaFrom.valid) {
      this.empresasService.UpdateEmpresa(JSON.stringify(this.empresaFrom.value)).subscribe(
        resutl => {
          this.LimpiarFormulario();
          this.GetAllEmpresas();
          this.notificacionesService.ExitosoActualizar('Registro');
          this.emitEventEmpresa.emit(true);
          this.activarGuardar = true;
          this.activarActualizar = false;
        }
      );
    } else {
      this.ValidarErrorForm(this.empresaFrom);
    }
  }

  EliminarEmpresa(idEmpresa): any {
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
        this.empresasService.DeleteEmpresas(JSON.stringify(idEmpresa)).subscribe(
          resutl => {
            if (resutl) {
            this.empresaFrom.reset();
            this.GetAllEmpresas();
            this.notificacionesService.ExitosoEliminar('Registro');
            this.emitEventEmpresa.emit(true);
            } else {
              this.notificacionesService.Error('No se puede eliminar el registro, esta siendo usado por otro maestro.');
            }
          }, error => {
            console.error(error);
          }
        );
      }
    });
  }

  MappearEmpresa(dataEmpresa): any {
    this.empresaFrom.reset();
    this.empresaFrom.get('IdEmpresa').setValue(dataEmpresa.IdEmpresa);
    this.empresaFrom.get('Nombre').setValue(dataEmpresa.Nombre);
    this.empresaFrom.get('Correo').setValue(dataEmpresa.Correo);
    this.empresaFrom.get('AbrEmpresa').setValue(dataEmpresa.AbrEmpresa);
    this.empresaFrom.get('Nit').setValue(dataEmpresa.Nit);
    this.empresaFrom.get('Activo').setValue(dataEmpresa.Activo);
    this.empresaFrom.get('NotificaPorCorreo').setValue(dataEmpresa.NotificaPorCorreo);
    this.empresaFrom.get('NotificaPorMSM').setValue(dataEmpresa.NotificaPorMSM);
    this.activarActualizar = true;
    this.activarGuardar = false;
  }

  LimpiarFormulario(): any {
    this.activarActualizar = null;
    this.activarGuardar = true;
    this.empresaFrom.reset();
  }

  ValidarErrorForm(formulario: any): any {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }

  ValidarSesion(): any {
    if (localStorage.getItem('InfoLogin') !== null) {
      const infoLogin = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
      this.ValidarSesionModel.IdUsuario = infoLogin.IdUsuario;
      this.ValidarSesionModel.IdSesionUsuario = infoLogin.IdSesionUsuario;
      this.loginService.ValidarSesionActiva(JSON.stringify(this.ValidarSesionModel)).subscribe(
        resutl => {
          if (resutl) {
            window.location.href = 'http://localhost:4200/Login';
            localStorage.clear();
          }
        },
        error => {

        });
    } else {
      window.location.href = 'http://localhost:4200/Login';
      localStorage.clear();
    }
  }

  validarEmpresas(): any {

    const IdEmpresa = new FormControl('', []);
    const Nombre = new FormControl('', [Validators.required]);
    const AbrEmpresa = new FormControl('', [Validators.required]);
    const Nit = new FormControl('', [Validators.required]);
    const Correo = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
    const Activo = new FormControl('', []);
    const NotificaPorCorreo = new FormControl('', []);
    const NotificaPorMSM = new FormControl('', []);

    this.empresaFrom = new FormGroup({
      IdEmpresa,
      Nombre,
      AbrEmpresa,
      Nit,
      Correo,
      Activo,
      NotificaPorCorreo,
      NotificaPorMSM
    });
  }

}
