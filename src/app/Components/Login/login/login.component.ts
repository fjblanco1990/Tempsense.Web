import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public url ='http://localhost:4200';
  public MostrarRegistro = false;
  
  constructor() { }

  ngOnInit(): void {
     this.MostrarRegistro = false;
  }

  IniciarSesion() {
    window.location.href = 'http://localhost:4200/Home';
  }

  recibirFormUsuario(event) {
    if(event) {
      this.MostrarRegistro = false;
    }
  }

  RegistrarUsuarios () {
    this.MostrarRegistro = true;
  }
}
