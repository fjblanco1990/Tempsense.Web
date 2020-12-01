import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { DispositivosService } from 'src/app/Services/Dispositivos/Dispositivos.services';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { LoginService } from 'src/app/Services/Login/Login.service';
import { MaestrosService } from 'src/app/Services/Maestros/Maestros.service';
import { SedesService } from 'src/app/Services/Sedes/Sedes.service';

@Component({
  selector: 'app-dispositvos-config',
  templateUrl: './dispositvos-config.component.html',
  styleUrls: ['./dispositvos-config.component.css'],
  providers: [EmpresasService, LoginService, SedesService, MaestrosService,
    DispositivosService]
})
export class DispositvosConfigComponent implements OnInit {

  public DataEmpresa: any;
  public DataSedes: any;
  public DataMedidas: any;
  public dispositivoFrom: any;
  public activarActualizar: boolean;
  public ValidarSesionModel = new ValidarSesionModel();
  constructor(public empresasService: EmpresasService, public sedesService: SedesService,
    private LoginService: LoginService, private mestrosService: MaestrosService, private dispositivosService: DispositivosService) { }

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

  GetAllDispositivos() {
    this.dispositivosService.GetAllDispositivos().subscribe(
      resutl => {
        this.DataMedidas = resutl;
      }
    )
  }

  GuardarDispositivo() {
    if (this.dispositivoFrom.valid) {
      this.dispositivosService.SaveDispositivos(JSON.stringify(this.dispositivoFrom.value)).subscribe(
        resutl => {
          this.dispositivoFrom.reset();
          this.GetAllDispositivos();
        }
      )
    } else {
      this.ValidarErrorForm(this.dispositivoFrom);
    }
  }

  MappearDispositivo(id) {

  }

  ActualizarDispositivo() {
    if (this.dispositivoFrom.valid) {
      this.dispositivosService.UpdateDispositivo(JSON.stringify(this.dispositivoFrom.value)).subscribe(
        resutl => {
          this.dispositivoFrom.reset();
          this.GetAllDispositivos();
        }
      )
    } else {
      this.ValidarErrorForm(this.dispositivoFrom);
    }
  }

  EliminarDispositivo(id) {
    if (this.dispositivoFrom.valid) {
      this.sedesService.DeleteSede(JSON.stringify(id)).subscribe(
        resutl => {
          this.dispositivoFrom.reset();
          this.GetAllDispositivos();
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
