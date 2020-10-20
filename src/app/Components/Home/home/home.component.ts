import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { LoginService } from 'src/app/Services/Login/Login.service';
import { DispositivosComponent } from '../../dispositivos/dispositivos.component';
import { EmpresasComponent } from '../../empresas/empresas.component';
import { SedesComponent } from '../../sedes/sedes.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LoginService, NotificacionesService]
})
export class HomeComponent implements OnInit {

  //#region variables
  public mostrarMenu = true;
  public mostrarTablero = false;
  public mostrarEmpresa = false;
  public mostrarDispositivo = false;
  public mostrarUsuario = false;
  public mostrarReporte = false;
  public mostrarUmbral = false;
  public ValidarSesionModel = new ValidarSesionModel();
  //#endregion
  //#region variables componentes 
  @ViewChild('empresasComponet', { static: false }) empresasComponet: EmpresasComponent;
  @ViewChild('dispositivosComponent', { static: false }) dispositivosComponent: DispositivosComponent;
  //#endregion
  constructor(private LoginService: LoginService, private notificacionesService: NotificacionesService, private router: Router) { }

  ngOnInit(): void {
    this.ValidarSesion();
  }

  SelecionModulos(modulo) {
    switch (modulo) {
      case 0:
        this.mostrarMenu = true;
        this.mostrarTablero = false;
        this.mostrarEmpresa = false;
        this.mostrarDispositivo = false;
        this.mostrarUsuario = false;
        this.mostrarReporte = false;
        this.mostrarUmbral = false;
      case 1:
        this.mostrarMenu = false;
        this.mostrarTablero = true;
        this.mostrarEmpresa = false;
        this.mostrarDispositivo = false;
        this.mostrarUsuario = false;
        this.mostrarReporte = false;
        this.mostrarUmbral = false;
      case 2:
        this.mostrarMenu = false;
        this.mostrarTablero = false;
        this.mostrarEmpresa = true;
        this.mostrarDispositivo = false;
        this.mostrarUsuario = false;
        this.mostrarReporte = false;
        this.mostrarUmbral = false;
      case 3:
        this.mostrarMenu = false;
        this.mostrarTablero = false;
        this.mostrarEmpresa = false;
        this.mostrarDispositivo = true;
        this.mostrarUsuario = false;
        this.mostrarReporte = false;
        this.mostrarUmbral = false;
      case 4:
        this.mostrarMenu = false;
        this.mostrarTablero = false;
        this.mostrarEmpresa = false;
        this.mostrarDispositivo = false;
        this.mostrarUsuario = true;
        this.mostrarReporte = false;
        this.mostrarUmbral = false;
      case 5:
        this.mostrarMenu = false;
        this.mostrarTablero = false;
        this.mostrarEmpresa = false;
        this.mostrarDispositivo = false;
        this.mostrarUsuario = false;
        this.mostrarReporte = true;
        this.mostrarUmbral = false;
      case 6:
        this.mostrarMenu = false;
        this.mostrarTablero = false;
        this.mostrarEmpresa = false;
        this.mostrarDispositivo = false;
        this.mostrarUsuario = false;
        this.mostrarReporte = false;
        this.mostrarUmbral = true;
    }
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

}
