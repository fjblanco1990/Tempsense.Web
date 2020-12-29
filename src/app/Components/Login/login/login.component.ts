import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('cerrarModal', { static: false }) cerrarModal: ElementRef;
  public url = 'http://localhost:4200';
  public MostrarRegistro = false;
  public loginFrom: any;
  constructor(private loginService: LoginService, private notificacionesService: NotificacionesService, private router: Router) { }

  ngOnInit(): void {
     this.MostrarRegistro = false;
     this.validarLogin();
     window.location.hash = 'no-back-button';
     window.location.hash = 'Again-No-back-button'; // esta linea es necesaria para chrome
     window.onhashchange = () => {
       window.location.hash = 'no-back-button';
    };
  }

  IniciarSesion(): any {
    if (this.loginFrom.valid) {
      this.loginService.CrearSesion(JSON.stringify(this.loginFrom.value)).subscribe(
        resutl => {
          if (resutl.Token !== null) {
            localStorage.setItem('InfoLogin', window.btoa(unescape(encodeURIComponent(JSON.stringify(resutl)))));
            window.location.href = 'http://localhost:4200/';
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

  recibirFormUsuario(event): any {
    if (event) {
      this.MostrarRegistro = false;
    }
  }

  RegistrarUsuarios(): any {
    this.MostrarRegistro = true;
  }

  RecuperarContrasena(): any {
    if (this.loginFrom.value.recuperacion !== '' && this.loginFrom.value.recuperacion !== null &&
     this.loginFrom.value.recuperacion !== undefined) {
      const emialIngresado = this.loginFrom.value.recuperacion;
      this.loginService.RecuperarContrasena(this.loginFrom.value.recuperacion).subscribe(
        resutl => {
            this.notificacionesService.ExitosoGeneral('La contraseña se envio a su correo.');
            this.loginFrom.reset();
            this.loginFrom.get('Email').setValue(emialIngresado);
            this.cerrarModal.nativeElement.click();
        },
        error => {
          this.notificacionesService.Error('El correo ingresado no existe en la aplicación.');
        });
    } else {
      this.notificacionesService.Error('El correo es obligatorio.');
    }
  }

  ValidarErrorForm(formulario: any): any {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }

  validarLogin(): any {
    const Email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
    const password = new FormControl('', [Validators.required]);
    const recuperacion = new FormControl('', []);

    this.loginFrom = new FormGroup({
      Email,
      password,
      recuperacion
    });
  }
}
