import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  constructor(private LoginService: LoginService, private router: Router, private location: PlatformLocation) {
  }

  ngOnInit() {

    //   if (localStorage.getItem('InfoLogin') !== null) {
    //     this.DatosUsuario = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
    //     if (localStorage.getItem('InfoLogin') !== null) {
    //       this.resulStore = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
    //     } else {
    //       this.router.navigateByUrl('/Login');
    //       localStorage.clear();
    //     }

    //   this.location.onPopState(() => {
        
        
    //   });
    // }
  }


}
