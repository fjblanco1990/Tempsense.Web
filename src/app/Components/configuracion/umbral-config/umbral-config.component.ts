import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { DispositivosService } from 'src/app/Services/Dispositivos/Dispositivos.services';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { LoginService } from 'src/app/Services/Login/Login.service';
import { SedesService } from 'src/app/Services/Sedes/Sedes.service';
import { UmbralesService } from 'src/app/Services/Umbrales/Umbral.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-umbral-config',
  templateUrl: './umbral-config.component.html',
  styleUrls: ['./umbral-config.component.css'],
  providers: [EmpresasService, LoginService, SedesService, DispositivosService,
    UmbralesService, NotificacionesService]
})
export class UmbralConfigComponent implements OnInit {

  public DataDispositivo: any;
  public DataDispositivoTable: any;
  public DataEmpresa: any;
  public DataSedes: any;
  public umbralFrom: any;
  public DataUmbral: any[] = [];
  public activarActualizar: boolean;
  public ValidarSesionModel = new ValidarSesionModel();
  constructor(public empresasService: EmpresasService, public sedesService: SedesService, private loginService: LoginService,
              private dispositivosService: DispositivosService, private umbralesService: UmbralesService,
              private notificacionesService: NotificacionesService) {
  }

  ngOnInit(): void {
    this.validarUmbral();
    this.ValidarPerfilUser();

  }


  GetAllUmbrales(): any {
    this.DataUmbral = [];
    this.dispositivosService.GetAllDispositivos().subscribe(
      resutlDis => {
      this.umbralesService.GetAllUmbrales().subscribe(
        resutlUmbr => {
          resutlUmbr.forEach(element => {
            this.umbralFrom.get('IdUmbral').setValue(element.IdUmbral);
            this.umbralFrom.get('TemperaturaMin').setValue(element.TemperaturaMin);
            this.umbralFrom.get('TemperaturaMax').setValue(element.TemperaturaMax);
            this.umbralFrom.get('ToleranciaMin').setValue(element.ToleranciaMin);
            this.umbralFrom.get('ToleranciaMax').setValue(element.ToleranciaMax);
            this.umbralFrom.get('Activo').setValue(element.Activo);
            resutlDis.forEach(elementUmb => {
              if (elementUmb.IdDispositivo === element.IdDispositivo) {
                this.umbralFrom.get('IdDispositivo').setValue(elementUmb);
              }
            });
            this.DataUmbral.push(this.umbralFrom.value);
            this.umbralFrom.reset();
          });
        });
    });
  }

  GetAllUmbralesXId(idUserEmp): any {
    this.DataUmbral = [];
    this.dispositivosService.GetAllDispositivos().subscribe(
      resutlDis => {
        this.umbralesService.GetAllUmbralesUser(idUserEmp).subscribe(
          resutlUmbr => {
            resutlUmbr.forEach(element => {
              this.umbralFrom.get('IdUmbral').setValue(element.IdUmbral);
              this.umbralFrom.get('TemperaturaMin').setValue(element.TemperaturaMin);
              this.umbralFrom.get('TemperaturaMax').setValue(element.TemperaturaMax);
              this.umbralFrom.get('ToleranciaMin').setValue(element.ToleranciaMin);
              this.umbralFrom.get('ToleranciaMax').setValue(element.ToleranciaMax);
              this.umbralFrom.get('Activo').setValue(element.Activo);
              resutlDis.forEach(elementUmb => {
                if (elementUmb.IdDispositivo === element.IdDispositivo) {
                  this.umbralFrom.get('IdDispositivo').setValue(elementUmb);
                }
              });
              this.DataUmbral.push(this.umbralFrom.value);
              this.umbralFrom.reset();
            });
          });
      });
  }

  GetAllDispositivosId(idUserEmp): any {
    this.dispositivosService.GetAllDispositivosUser(idUserEmp).subscribe(
      resutl => {
        this.DataDispositivo = resutl;
      }
    );
  }

  GetAllDispositivos(): any {
    this.dispositivosService.GetAllDispositivos().subscribe(
      resutl => {
        this.DataDispositivo = resutl;
      }
    );
  }


  MappearUmbral(dataUmbral): any {
    this.activarActualizar = true;
    this.umbralFrom.get('IdUmbral').setValue(dataUmbral.IdUmbral);
    this.umbralFrom.get('TemperaturaMin').setValue(dataUmbral.TemperaturaMin);
    this.umbralFrom.get('TemperaturaMax').setValue(dataUmbral.TemperaturaMax);
    this.umbralFrom.get('ToleranciaMin').setValue(dataUmbral.ToleranciaMin);
    this.umbralFrom.get('ToleranciaMax').setValue(dataUmbral.ToleranciaMax);
    this.umbralFrom.get('Activo').setValue(dataUmbral.Activo);
    this.umbralFrom.get('IdDispositivo').setValue(dataUmbral.IdDispositivo.IdDispositivo);
  }

  CrearUmbral(): any {
    if (this.umbralFrom.valid) {
      this.umbralesService.SaveUmbral(JSON.stringify(this.umbralFrom.value)).subscribe(
        resutl => {
          this.umbralFrom.reset();
          this.ValidarPerfilUser();
          this.notificacionesService.Exitoso('Registro');
        }
      );
    } else {
      this.ValidarErrorForm(this.umbralFrom);
    }
  }

  ActualizarUmbral(): any {
    if (this.umbralFrom.valid) {
      this.umbralesService.UpdateUmbral(JSON.stringify(this.umbralFrom.value)).subscribe(
        resutl => {
          this.umbralFrom.reset();
          this.ValidarPerfilUser();
          this.notificacionesService.ExitosoActualizar('Registro');
        }
      );
    } else {
      this.ValidarErrorForm(this.umbralFrom);
    }
  }

  EliminarUmbral(id): any {
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
        this.umbralesService.DeleteUmbral(JSON.stringify(id)).subscribe(
          resutl => {
            this.umbralFrom.reset();
            this.ValidarPerfilUser();
            this.notificacionesService.ExitosoEliminar('Registro');
          }, error => {
            console.error(error);
          }
        );
      }
    });
  }

  LimpiarFormulario(): any {
    this.activarActualizar = null;
    this.umbralFrom.reset();
  }

  ValidarErrorForm(formulario: any): any {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }

  private ValidarPerfilUser(): any {
    if (localStorage.getItem('InfoLogin') !== null) {
      const infoLogin = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
      if (infoLogin.IdPerfil === 1) {
        this.GetAllDispositivos();
        this.GetAllUmbrales();
      } else {
        this.GetAllDispositivosId(infoLogin.IdUsuario);
        this.GetAllUmbralesXId(infoLogin.IdUsuario);
      }
    }
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

  validarUmbral(): any {
    const IdUmbral = new FormControl('', []);
    const TemperaturaMin = new FormControl('', [Validators.required]);
    const TemperaturaMax = new FormControl('', [Validators.required]);
    const Activo = new FormControl('', []);
    const FechaInicio = new FormControl('', []);
    const IdDispositivo = new FormControl('', [Validators.required]);
    const ToleranciaMin = new FormControl('', [Validators.required]);
    const ToleranciaMax = new FormControl('', [Validators.required]);

    this.umbralFrom = new FormGroup({
      IdUmbral,
      TemperaturaMin,
      TemperaturaMax,
      Activo,
      FechaInicio,
      IdDispositivo,
      ToleranciaMin,
      ToleranciaMax
    });
  }

}
