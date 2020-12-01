import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { DispositivosService } from 'src/app/Services/Dispositivos/Dispositivos.services';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { LoginService } from 'src/app/Services/Login/Login.service';
import { SedesService } from 'src/app/Services/Sedes/Sedes.service';

@Component({
  selector: 'app-umbral-config',
  templateUrl: './umbral-config.component.html',
  styleUrls: ['./umbral-config.component.css'],
  providers: [EmpresasService, LoginService, SedesService, DispositivosService]
})
export class UmbralConfigComponent implements OnInit {

  public DataDispositivo: any;
  public DataEmpresa: any;
  public DataSedes: any;
  public umbralFrom: any;
  public activarActualizar: boolean;
  public ValidarSesionModel = new ValidarSesionModel();
  constructor(public empresasService: EmpresasService, public sedesService: SedesService, private LoginService: LoginService,
    private dispositivosService: DispositivosService) { }

  ngOnInit(): void {
    this.validarUmbral();
    this.GetAllDispositivos();
  }


  GetAllUmbrales() {
    this.sedesService.GetAllSedes().subscribe(
      resutl => {
        this.DataSedes = resutl;
      }
    )
  }

  GetAllDispositivos() {
    this.dispositivosService.GetAllDispositivos().subscribe(
      resutl => {
        this.DataDispositivo = resutl;
      }
    )
  }


  MappearEmpresa(id) {

  }

  ActualizarUmbral() {
    if (this.umbralFrom.valid) {
      this.sedesService.UpdateSede(JSON.stringify(this.umbralFrom.value)).subscribe(
        resutl => {
          this.umbralFrom.reset();
          this.GetAllUmbrales();
        }
      )
    } else {
      this.ValidarErrorForm(this.umbralFrom);
    }
  }

  EliminarUmbral(id) {
    if (this.umbralFrom.valid) {
      this.sedesService.DeleteSede(JSON.stringify(id)).subscribe(
        resutl => {
          this.umbralFrom.reset();
          this.GetAllUmbrales();
        }
      )
    } else {
      this.ValidarErrorForm(this.umbralFrom);
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

  validarUmbral() {
    const IdUmbral = new FormControl('', [Validators.required]);
    const Temperatura_min = new FormControl('', [Validators.required]);
    const Temperatura_max = new FormControl('', [Validators.required]);
    const Activo = new FormControl('', [Validators.required]);
    const Fecha_inicio = new FormControl('', [Validators.required]);
    const IdDispositivo = new FormControl('', [Validators.required]);
    const Tolerancia_min = new FormControl('', [Validators.required]);
    const Tolerancia_max = new FormControl('', [Validators.required]);

    this.umbralFrom = new FormGroup({
      IdUmbral: IdUmbral,
      Temperatura_min: Temperatura_min,
      Temperatura_max: Temperatura_max,
      Activo: Activo,
      Fecha_inicio: Fecha_inicio,
      IdDispositivo: IdDispositivo,
      Tolerancia_min: Tolerancia_min,
      Tolerancia_max: Tolerancia_max
    });
  }

}
