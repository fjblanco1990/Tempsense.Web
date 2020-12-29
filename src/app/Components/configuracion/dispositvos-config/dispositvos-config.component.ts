import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { DispositivosService } from 'src/app/Services/Dispositivos/Dispositivos.services';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { LoginService } from 'src/app/Services/Login/Login.service';
import { MaestrosService } from 'src/app/Services/Maestros/Maestros.service';
import { SedesService } from 'src/app/Services/Sedes/Sedes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dispositvos-config',
  templateUrl: './dispositvos-config.component.html',
  styleUrls: ['./dispositvos-config.component.css'],
  providers: [EmpresasService, LoginService, SedesService, MaestrosService,
    DispositivosService, NotificacionesService]
})
export class DispositvosConfigComponent implements OnInit {

  public DataEmpresa: any;
  public DataSedes: any;
  public DataSedesAll: any;
  public DataMedidas: any;
  public DataDispositivos: any[] = [];
  public dispositivoFrom: any;
  public activarActualizar: boolean;
  public activarGuardar: boolean;
  public ValidarSesionModel = new ValidarSesionModel();
  @Output() emitEventDispo: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public empresasService: EmpresasService, public sedesService: SedesService,
              private loginService: LoginService, private mestrosService: MaestrosService,
              private dispositivosService: DispositivosService, private notificacionesService: NotificacionesService) { }

  ngOnInit(): void {
    this.validarDispositivo();
    this.GetAllEmpresas();
    this.activarGuardar = true;
  }

  GetAllSedes(): any {

  }

  GetAllSedesEmp(): any {
    this.sedesService.GetSedeXEmpresa(this.dispositivoFrom.get('Empresa').value).subscribe(
      resutl => {
        this.DataSedes = resutl;
      }
    );
  }

  GetAllEmpresas(): any {
    this.empresasService.GetAllEmpresas().subscribe(
      resutl => {
        this.DataEmpresa = resutl;
        this.mestrosService.GetAllMedidas().subscribe(
          resutlMedida => {
            this.DataMedidas = resutlMedida;
            this.sedesService.GetAllSedes().subscribe(
              resutlSede => {
                this.DataSedesAll = resutlSede;
                this.GetAllDispositivos();
              }
            );
          }
        );
      }
    );
  }

  GetMedidas(): any {

  }

  GetAllDispositivos(): any {
    this.DataDispositivos = [];
    this.dispositivosService.GetAllDispositivos().subscribe(
      resutl => {
        resutl.forEach(elementDispo => {
          this.dispositivoFrom.get('IdDispositivo').setValue(elementDispo.IdDispositivo);
          this.dispositivoFrom.get('Nombre').setValue(elementDispo.Nombre);
          this.dispositivoFrom.get('TiempoNotificacion').setValue(elementDispo.TiempoNotificacion);
          this.dispositivoFrom.get('Activo').setValue(elementDispo.Activo);
          this.DataEmpresa.forEach(elementEmp => {
            this.dispositivoFrom.get('Empresa').setValue(elementEmp);
            this.DataMedidas.forEach(elementMedi => {
              this.dispositivoFrom.get('IdTipoMedida').setValue(elementMedi);
              this.DataSedesAll.forEach(elementSede => {
                this.dispositivoFrom.get('IdSede').setValue(elementSede);
              });
            });
          });
          this.DataDispositivos.push(this.dispositivoFrom.value);
          this.dispositivoFrom.reset();
        });
      }
    );
  }

  GuardarDispositivo(): any {
    if (this.dispositivoFrom.valid) {
      this.dispositivosService.SaveDispositivos(JSON.stringify(this.dispositivoFrom.value)).subscribe(
        resutl => {
          this.dispositivoFrom.reset();
          this.GetAllDispositivos();
          this.notificacionesService.Exitoso('dispositivo');
          this.emitEventDispo.emit(true);
        }
      );
    } else {
      this.ValidarErrorForm(this.dispositivoFrom);
    }
  }

  MappearDispositivo(dataDispo): any {
    this.activarActualizar = true;
    this.activarGuardar = false;
    this.DataSedes = this.DataSedesAll;
    this.dispositivoFrom.get('IdDispositivo').setValue(dataDispo.IdDispositivo);
    this.dispositivoFrom.get('Nombre').setValue(dataDispo.Nombre);
    this.DataEmpresa.forEach(elementEmp => {
      if (elementEmp.IdEmpresa === dataDispo.IdSede.IdEmpresa) {
        this.dispositivoFrom.get('Empresa').setValue(elementEmp.IdEmpresa);
      }
    });
    this.dispositivoFrom.get('IdTipoMedida').setValue(dataDispo.IdTipoMedida.IdTipoMedida);
    this.dispositivoFrom.get('IdSede').setValue(dataDispo.IdSede.IdSede);
    this.dispositivoFrom.get('TiempoNotificacion').setValue(dataDispo.TiempoNotificacion);
    this.dispositivoFrom.get('Activo').setValue(dataDispo.Activo);
  }

  ActualizarDispositivo(): any {
    if (this.dispositivoFrom.valid) {
      this.dispositivosService.UpdateDispositivo(JSON.stringify(this.dispositivoFrom.value)).subscribe(
        resutl => {
          this.dispositivoFrom.reset();
          this.GetAllDispositivos();
          this.notificacionesService.ExitosoActualizar('Registro');
          this.DataSedes = [];
          this.activarActualizar = false;
          this.activarGuardar = true;
          this.emitEventDispo.emit(true);
        }
      );
    } else {
      this.ValidarErrorForm(this.dispositivoFrom);
    }
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
        this.dispositivosService.DeleteDispositivo(JSON.stringify(id)).subscribe(
          resutl => {
            this.dispositivoFrom.reset();
            this.GetAllDispositivos();
            this.notificacionesService.ExitosoEliminar('Registro');
            this.emitEventDispo.emit(true);
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
    this.dispositivoFrom.reset();
    this.DataSedes = [];
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
            // validar si la persona conectada no tiene permisos para el modulo devolverlo al incio
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

  validarDispositivo(): any {
    const IdDispositivo = new FormControl('', []);
    const Nombre = new FormControl('', [Validators.required]);
    const IdTipoMedida = new FormControl('', [Validators.required]);
    const Empresa = new FormControl('', [Validators.required]);
    const IdSede = new FormControl('', [Validators.required]);
    const TiempoNotificacion = new FormControl('', [Validators.required]);
    const Activo = new FormControl('', [Validators.required]);

    this.dispositivoFrom = new FormGroup({
      IdDispositivo,
      Nombre,
      IdTipoMedida,
      Empresa,
      IdSede,
      TiempoNotificacion,
      Activo
    });
  }
}
