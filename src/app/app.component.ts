import { PlatformLocation } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './Services/Login/Login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent implements OnInit {
  title = 'Tempsense';
  public DatosUsuario;
  public resulStore;
  //#region variables
  // public mostrarLayout = true;
  @Output() mostrarLayout = false;
  //#endregion
  constructor(private LoginService: LoginService, private router: Router, private location: PlatformLocation) {
  }

  ngOnInit() {
    this.mostrarLayout = false;
  }




}
