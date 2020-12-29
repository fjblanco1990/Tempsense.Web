import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { LoginService } from 'src/app/Services/Login/Login.service';
import { SedesService } from 'src/app/Services/Sedes/Sedes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sedes-config',
  templateUrl: './sedes-config.component.html',
  styleUrls: ['./sedes-config.component.css'],
  providers: [SedesService, EmpresasService, LoginService, NotificacionesService]
})
export class SedesConfigComponent implements OnInit {


  public DataEmpresa: any;
  public DataSedes: any[] = [];
  public sedesFrom: any;
  public activarActualizar: boolean;
  public activarGuardar: boolean;
  public ValidarSesionModel = new ValidarSesionModel();
  constructor(public sedesService: SedesService, public empresasService: EmpresasService, private loginService: LoginService,
              private notificacionesService: NotificacionesService) { }

  ngOnInit(): void {
    this.activarGuardar = true;
    this.activarActualizar = null;
    this.GetAllEmpresas();
    this.ValidarSesion();
    this.validarSedes();
    this.GetAllSedes();
  }


  GetAllSedes(): any {
    this.DataSedes = [];
    this.empresasService.GetAllEmpresas().subscribe(
      resutEmp => {
        this.DataEmpresa = resutEmp;
        this.sedesService.GetAllSedes().subscribe(
          resutl => {
            resutl.forEach(elementSede => {
              this.sedesFrom.get('IdSede').setValue(elementSede.IdSede);
              this.sedesFrom.get('Nombre').setValue(elementSede.Nombre);
              this.DataEmpresa.forEach(elementEmp => {
                  if (elementEmp.IdEmpresa === elementSede.IdEmpresa) {
                    this.sedesFrom.get('IdEmpresa').setValue(elementEmp);
                  }
                });
              this.DataSedes.push(this.sedesFrom.value);
              this.sedesFrom.reset();
            });
      });
      }
    );
  }

  GetAllEmpresas(): any {
    this.empresasService.GetAllEmpresas().subscribe(
      resutl => {
        this.DataEmpresa = resutl;
      }
    );
  }

  GuardarSede(): any {
    if (this.sedesFrom.valid) {
      this.sedesService.SaveSede(JSON.stringify(this.sedesFrom.value)).subscribe(
        resutl => {
          this.sedesFrom.reset();
          this.GetAllSedes();
        }
      );
    } else {
      this.ValidarErrorForm(this.sedesFrom);
    }
  }

  MappearSede(dataSede): any {
    this.activarActualizar = true;
    this.activarGuardar = false;
    this.sedesFrom.get('IdSede').setValue(dataSede.IdSede);
    this.sedesFrom.get('Nombre').setValue(dataSede.Nombre);
    this.sedesFrom.get('IdEmpresa').setValue(dataSede.IdEmpresa.IdEmpresa);
  }

  ActualizarSede(): any {
    if (this.sedesFrom.valid) {
      this.sedesService.UpdateSede(JSON.stringify(this.sedesFrom.value)).subscribe(
        resutl => {
          this.sedesFrom.reset();
          this.GetAllSedes();
          this.activarActualizar = false;
          this.activarGuardar = true;
          this.notificacionesService.ExitosoActualizar('Registro');
        }
      );
    } else {
      this.ValidarErrorForm(this.sedesFrom);
    }
  }

  EliminarSede(id): any {
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
        this.sedesService.DeleteSede(JSON.stringify(id)).subscribe(
          resutl => {
            this.sedesFrom.reset();
            this.GetAllSedes();
          }, error => {
            console.error(error);
          }
        );
      }
    });
  }

  LimpiarFormulario(): any {
    this.activarActualizar = null;
    this.activarGuardar = true;
    this.sedesFrom.reset();
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

  validarSedes(): any {
    const IdSede = new FormControl('', []);
    const Nombre = new FormControl('', [Validators.required]);
    const IdEmpresa = new FormControl('', [Validators.required]);

    this.sedesFrom = new FormGroup({
      IdSede,
      Nombre,
      IdEmpresa
    });
  }

}
