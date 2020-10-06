import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { LoginService } from 'src/app/Services/Login/Login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, NotificacionesService]
})
export class LoginComponent implements OnInit {
  public url ='http://localhost:4200';
  public MostrarRegistro = false;
  public loginFrom: any;
  constructor(private LoginService: LoginService, private notificacionesService: NotificacionesService, private router: Router) { }

  ngOnInit(): void {
     this.MostrarRegistro = false;
     this.validarLogin();
    
      window.location.hash = "no-back-button";
      window.location.hash = "Again-No-back-button";//esta linea es necesaria para chrome
      window.onhashchange = function () { window.location.hash = "no-back-button"; }
    
  }

  IniciarSesion() {
    if (this.loginFrom.valid) {
      this.LoginService.CrearSesion(JSON.stringify(this.loginFrom.value)).subscribe(
        resutl => {
          if(resutl.Token !== null) {
            localStorage.setItem('InfoLogin', window.btoa(unescape(encodeURIComponent(JSON.stringify(resutl)))));
             window.location.href = 'http://localhost:4200/Home';
            // this.router.navigateByUrl('/Home');
          } else {
            this.notificacionesService.Advertencia(resutl.Mensaje);
            this.loginFrom.reset();
          }
        }, 
        error => {

        });
    } else {
      this.notificacionesService.Error('Debe ingresar los datos para inciar sesión');
      this.ValidarErrorForm(this.loginFrom);
    }
  }


  recibirFormUsuario(event) {
    if(event) {
      this.MostrarRegistro = false;
    }
  }

  RegistrarUsuarios () {
    this.MostrarRegistro = true;
  }

  ValidarErrorForm(formulario: any) {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }

  validarLogin() {
    const Email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
    const password = new FormControl('', [Validators.required]);

    this.loginFrom = new FormGroup({
      Email: Email,
      password: password
    });
  }
}
