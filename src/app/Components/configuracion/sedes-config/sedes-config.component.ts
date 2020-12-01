import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { LoginService } from 'src/app/Services/Login/Login.service';
import { SedesService } from 'src/app/Services/Sedes/Sedes.service';

@Component({
  selector: 'app-sedes-config',
  templateUrl: './sedes-config.component.html',
  styleUrls: ['./sedes-config.component.css'],
  providers: [SedesService, EmpresasService, LoginService]
})
export class SedesConfigComponent implements OnInit {


  public DataEmpresa: any;
  public DataSedes: any;
  public sedesFrom: any;
  public activarActualizar: boolean;
  public ValidarSesionModel = new ValidarSesionModel();
  constructor(public sedesService: SedesService, public EmpresasService: EmpresasService, private LoginService: LoginService) { }

  ngOnInit(): void {
    this.activarActualizar = null;
    this.ValidarSesion();
    this.validarSedes();
    this.GetAllSedes();
    this.GetAllEmpresas();
  }


  GetAllSedes() {
    this.sedesService.GetAllSedes().subscribe(
      resutl => {
        this.DataSedes = resutl;
      }
    )
  }

  GetAllEmpresas() {
    this.EmpresasService.GetAllEmpresas().subscribe(
      resutl => {
        this.DataEmpresa = resutl;
      }
    )
  }

  GuardarSede() {
    if (this.sedesFrom.valid) {
      this.sedesService.SaveSede(JSON.stringify(this.sedesFrom.value)).subscribe(
        resutl => {
          this.sedesFrom.reset();
          this.GetAllSedes();
        }
      )
    } else {
      this.ValidarErrorForm(this.sedesFrom);
    }
  }

  MappearEmpresa(id) {

  }

  ActualizarSede() {
    if (this.sedesFrom.valid) {
      this.sedesService.UpdateSede(JSON.stringify(this.sedesFrom.value)).subscribe(
        resutl => {
          this.sedesFrom.reset();
          this.GetAllSedes();
        }
      )
    } else {
      this.ValidarErrorForm(this.sedesFrom);
    }
  }
  
  EliminarSede(id) {
    if (this.sedesFrom.valid) {
      this.sedesService.DeleteSede(JSON.stringify(id)).subscribe(
        resutl => {
          this.sedesFrom.reset();
          this.GetAllSedes();
        }
      )
    } else {
      this.ValidarErrorForm(this.sedesFrom);
    }
  }
 

  LimpiarFormulario() {
    this.activarActualizar = null;
    this.sedesFrom.reset();
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

  validarSedes() {

    const Nombre = new FormControl('', [Validators.required]);
    const IdEmpresa = new FormControl('', [Validators.required]);

    this.sedesFrom = new FormGroup({
      Nombre: Nombre,
      IdEmpresa: IdEmpresa
    });
  }

}
