import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { LoginService } from 'src/app/Services/Login/Login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [LoginService, NotificacionesService]
})
export class LayoutComponent implements OnInit {
  //#region variables
  public mostrarMenu = true;
  public MostrarDiv = false;
  public mostrarTablero = true;
  public mostrarEmpresa = true;
  public mostrarDispositivo = true;
  public mostrarUsuario = true;
  public mostrarReporte = true;
  public mostrarUmbral = true;
  //#endregion
  //#region variables componentes 
  //#endregion
  constructor(private LoginService: LoginService, private notificacionesService: NotificacionesService, private router: Router) { }

  ngOnInit(): void {
  }

  SelecionModulos(modulo) {
    this.mostrarMenu = false;
    this.MostrarDiv = true;
    // switch (modulo) {
    //   case 0:
    //     this.mostrarMenu = true;
    //     this.mostrarTablero = false;
    //     this.mostrarEmpresa = false;
    //     this.mostrarDispositivo = false;
    //     this.mostrarUsuario = false;
    //     this.mostrarReporte = false;
    //     this.mostrarUmbral = false;
    //   case 1:
    //     this.mostrarMenu = false;
    //     this.mostrarTablero = true;
    //     this.mostrarEmpresa = false;
    //     this.mostrarDispositivo = false;
    //     this.mostrarUsuario = false;
    //     this.mostrarReporte = false;
    //     this.mostrarUmbral = false;
    //   case 2:
    //     this.mostrarMenu = false;
    //     this.mostrarTablero = false;
    //     this.mostrarEmpresa = true;
    //     this.mostrarDispositivo = false;
    //     this.mostrarUsuario = false;
    //     this.mostrarReporte = false;
    //     this.mostrarUmbral = false;
    //   case 3:
    //     this.mostrarMenu = false;
    //     this.mostrarTablero = false;
    //     this.mostrarEmpresa = false;
    //     this.mostrarDispositivo = true;
    //     this.mostrarUsuario = false;
    //     this.mostrarReporte = false;
    //     this.mostrarUmbral = false;
    //   case 4:
    //     this.mostrarMenu = false;
    //     this.mostrarTablero = false;
    //     this.mostrarEmpresa = false;
    //     this.mostrarDispositivo = false;
    //     this.mostrarUsuario = true;
    //     this.mostrarReporte = false;
    //     this.mostrarUmbral = false;
    //   case 5:
    //     this.mostrarMenu = false;
    //     this.mostrarTablero = false;
    //     this.mostrarEmpresa = false;
    //     this.mostrarDispositivo = false;
    //     this.mostrarUsuario = false;
    //     this.mostrarReporte = true;
    //     this.mostrarUmbral = false;
    //   case 6:
    //     this.mostrarMenu = false;
    //     this.mostrarTablero = false;
    //     this.mostrarEmpresa = false;
    //     this.mostrarDispositivo = false;
    //     this.mostrarUsuario = false;
    //     this.mostrarReporte = false;
    //     this.mostrarUmbral = true;
    // }
  }

 


}
