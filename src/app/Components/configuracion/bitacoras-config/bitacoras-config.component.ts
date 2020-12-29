import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidarSesionModel } from 'src/app/Models/Login-Model/login.model';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { LoginService } from 'src/app/Services/Login/Login.service';
import { SedesService } from 'src/app/Services/Sedes/Sedes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bitacoras-config',
  templateUrl: './bitacoras-config.component.html',
  styleUrls: ['./bitacoras-config.component.css'],
  providers: [EmpresasService, LoginService]
})
export class BitacorasConfigComponent implements OnInit {


  public DataEmpresa: any;
  public DataSedes: any;
  public bitacoraFrom: any;
  public activarActualizar: boolean;
  public ValidarSesionModel = new ValidarSesionModel();
  constructor(public empresasService: EmpresasService, public sedesService: SedesService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.validarEmpresas();
    this.GetAllEmpresas();
  }


  GetAllSedes(): any {
    this.sedesService.GetAllSedes().subscribe(
      resutl => {
        this.DataSedes = resutl;
      }
    );
  }

  GetAllEmpresas(): any {
    this.empresasService.GetAllEmpresas().subscribe(
      resutl => {
        this.DataEmpresa = resutl;
      }
    );
  }

  GuardarSede(): any {
    if (this.bitacoraFrom.valid) {
      this.sedesService.SaveSede(JSON.stringify(this.bitacoraFrom.value)).subscribe(
        resutl => {
          this.bitacoraFrom.reset();
          this.GetAllSedes();
        }
      );
    } else {
      this.ValidarErrorForm(this.bitacoraFrom);
    }
  }

  MappearEmpresa(id): any {

  }

  ActualizarUmbral(): any {
    if (this.bitacoraFrom.valid) {
      this.sedesService.UpdateSede(JSON.stringify(this.bitacoraFrom.value)).subscribe(
        resutl => {
          this.bitacoraFrom.reset();
          this.GetAllSedes();
        }
      );
    } else {
      this.ValidarErrorForm(this.bitacoraFrom);
    }
  }

  EliminarSede(id): any {
    Swal.fire({
      title: 'Advertencia',
      text: 'Esta seguro de eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9F0C09',
      cancelButtonColor: '#EA9700',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sedesService.DeleteSede(JSON.stringify(id)).subscribe(
          resutl => {
            this.bitacoraFrom.reset();
            this.GetAllSedes();
          }, error => {
            console.error(error);
          }
        );
      }
    });
  }

  ValidarErrorForm(formulario: any): any {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }

  ValidarSesion(): any {
    if (localStorage.getItem('InfoLogin') !== null) {
      const infoLogin = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
      this.ValidarSesionModel.IdUsuario = infoLogin.IdUsuario;
      this.ValidarSesionModel.IdSesionUsuario = infoLogin.IdSesionUsuario;
      this.loginService.ValidarSesionActiva(JSON.stringify(this.ValidarSesionModel)).subscribe(
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

  validarEmpresas(): any {

    const Nombre = new FormControl('', [Validators.required, Validators.pattern('[A-Za-zñÑ ]*')]);
    const Telefono = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*')]);
    const Email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);

    this.bitacoraFrom = new FormGroup({

    });
  }

}
