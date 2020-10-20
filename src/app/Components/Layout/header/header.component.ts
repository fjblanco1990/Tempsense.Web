import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { LoginService } from 'src/app/Services/Login/Login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [LoginService, NotificacionesService]
})
export class HeaderComponent implements OnInit {

  constructor(private LoginService: LoginService, private notificacionesService: NotificacionesService, private router: Router) { }

  ngOnInit(): void {
  }

  CerrarSesion() {
    if (localStorage.getItem('InfoLogin') !== null) {
      const infoLogin = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
      console.log(infoLogin);
      this.LoginService.CerrarSesion(JSON.stringify(infoLogin)).subscribe(
        resutl => {
          console.log(resutl);
          // this.mostrarLayout = false;
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
}
