import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { LoginService } from 'src/app/Services/Login/Login.service';
import { MaestrosService } from 'src/app/Services/Maestros/Maestros.service';
import { SedesService } from 'src/app/Services/Sedes/Sedes.service';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.css'],
  providers: [EmpresasService, LoginService, SedesService, MaestrosService]
})
export class DispositivosComponent implements OnInit {

  public DataEmpresa: any;
  public DataSedes: any;
  public DataMedidas: any;
  public dispositivoFrom: any;
  public activarActualizar: boolean;
  public ValidarSesionModel = new ValidarSesionModel();
  constructor(public empresasService: EmpresasService, public sedesService: SedesService,
    private LoginService: LoginService, private mestrosService: MaestrosService) { }

  ngOnInit(): void {
    this.validarDispositivo();
    this.GetAllEmpresas();
    this.GetMedidas();
  }



  GetAllSedes() {
    this.sedesService.GetSedeXEmpresa(this.dispositivoFrom.get('Empresa').value).subscribe(
      resutl => {
        this.DataSedes = resutl;
      }
    )
  }

  GetAllEmpresas() {
    this.empresasService.GetAllEmpresas().subscribe(
      resutl => {
        this.DataEmpresa = resutl;
      }
    )
  }

  GetMedidas() {
    this.mestrosService.GetAllMedidas().subscribe(
      resutl => {
        this.DataMedidas = resutl;
      }
    )
  }

  GuardarDispositivo() {
    if (this.dispositivoFrom.valid) {
      this.sedesService.SaveSede(JSON.stringify(this.dispositivoFrom.value)).subscribe(
        resutl => {
          this.dispositivoFrom.reset();
          this.GetAllSedes();
        }
      )
    } else {
      this.ValidarErrorForm(this.dispositivoFrom);
    }
  }

  MappearEmpresa(id) {

  }

  ActualizarUmbral() {
    if (this.dispositivoFrom.valid) {
      this.sedesService.UpdateSede(JSON.stringify(this.dispositivoFrom.value)).subscribe(
        resutl => {
          this.dispositivoFrom.reset();
          this.GetAllSedes();
        }
      )
    } else {
      this.ValidarErrorForm(this.dispositivoFrom);
    }
  }

  EliminarSede(id) {
    if (this.dispositivoFrom.valid) {
      this.sedesService.DeleteSede(JSON.stringify(id)).subscribe(
        resutl => {
          this.dispositivoFrom.reset();
          this.GetAllSedes();
        }
      )
    } else {
      this.ValidarErrorForm(this.dispositivoFrom);
    }
  }

  ValidarErrorForm(formulario: any) {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }

  ValidarSesion() {
    if (localStorage.getItem('InfoLogin') !== null) {
      const infoLogin = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
      this.ValidarSesionModel.IdUsuario = infoLogin.IdUsuario;
      this.ValidarSesionModel.IdSesionUsuario = infoLogin.IdSesionUsuario;
      this.LoginService.ValidarSesionActiva(JSON.stringify(this.ValidarSesionModel)).subscribe(
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

  validarDispositivo() {

    const IdDispositivo = new FormControl('', []);
    const Nombre = new FormControl('', [Validators.required, Validators.pattern('[A-Za-zñÑ ]*')]);
    const IdTipoMedida = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*')]);
    const Empresa = new FormControl('', [Validators.required]);
    const IdSede = new FormControl('', [Validators.required]);
    const TiempoNotificacion = new FormControl('', [Validators.required]);
    const Activo = new FormControl('', [Validators.required]);

    this.dispositivoFrom = new FormGroup({
      IdDispositivo: IdDispositivo,
      Nombre: Nombre,
      IdTipoMedida: IdTipoMedida,
      Empresa: Empresa,
      IdSede: IdSede,
      TiempoNotificacion: TiempoNotificacion,
      Activo: Activo
    });
  }

}
