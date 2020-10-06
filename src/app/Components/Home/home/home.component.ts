import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { LoginService } from 'src/app/Services/Login/Login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LoginService, NotificacionesService]
})
export class HomeComponent implements OnInit {
  //#region Variables
  public ValidarSesionModel = new ValidarSesionModel();
  //#endregion
  constructor(private LoginService: LoginService, private notificacionesService: NotificacionesService, private router: Router) { }

  ngOnInit(): void {
    this.ValidarSesion();
  }

  CerrarSesion() {
    if (localStorage.getItem('InfoLogin') !== null) {
      const infoLogin = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
      console.log(infoLogin);
      this.LoginService.CerrarSesion(JSON.stringify(infoLogin)).subscribe(
        resutl => {
            console.log(resutl);
          window.location.href = 'http://localhost:4200/Login';
            localStorage.clear();
        },
        error => {

        });
    } else {
      window.location.href = 'http://localhost:4200/Login';
      localStorage.clear();
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
