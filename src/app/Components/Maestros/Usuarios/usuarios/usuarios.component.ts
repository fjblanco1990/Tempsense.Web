import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { PerfilesService } from 'src/app/Services/Perfiles/Perfiles.service';
import { UsuariosService } from 'src/app/Services/Usuarios/Usuarios.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService, EmpresasService, PerfilesService, NotificacionesService]
})
export class UsuariosComponent implements OnInit {
  //#region Variables carga
  public DataEmpresa: any;
  public DataPerfiles: any;
  public usuariosFrom: any;
  //#endregion
  @Output() emitEventClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public usuariosService: UsuariosService, public PerfilesService: PerfilesService, public empresasService: EmpresasService, private notificacionesService: NotificacionesService) { }

  ngOnInit(): void {
    this.validarUsuarios();
    this.GetAllEmpresas();
    this.GetAllProfileS();
  }

  returnBack() {
    this.emitEventClose.emit(true);
  }

  GuardarUsuarios() {
    if (this.usuariosFrom.valid) {
      this.usuariosFrom.get('IdUsuario').setValue(0);
      this.usuariosService.GuardarUsuarios(JSON.stringify(this.usuariosFrom.value)).subscribe(
        resutl => {
          this.usuariosFrom.reset();
          this.notificacionesService.Exitoso('Usuario');
        }
      )
    } else {
      this.ValidarErrorForm(this.usuariosFrom);
    }
    
  }

  GetAllEmpresas() {
    this.empresasService.GetAllEmpresas().subscribe(
      resutl => {
        this.DataEmpresa = resutl;
      }
    )
  }

  GetAllProfileS() {
    this.PerfilesService.GetAllProfiles().subscribe(
      resutl => {
        this.DataPerfiles = resutl;
      }
    )
  }

  ValidarErrorForm(formulario: any) {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }
  
  validarUsuarios() {
    const IdUsuario = new FormControl('', [])
    const Nombre = new FormControl('', [Validators.required, Validators.pattern('[A-Za-zñÑ ]*')]);
    const Passwords = new FormControl('', [Validators.required]);
    const Telefono = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*')]);
    const IdEmpresa = new FormControl('', [Validators.required]);
    const IdPerfil = new FormControl('', [Validators.required]);
    const Email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);

    this.usuariosFrom = new FormGroup({
      IdUsuario: IdUsuario,
      Nombre: Nombre,
      Passwords: Passwords,
      Telefono: Telefono,
      IdEmpresa: IdEmpresa,
      IdPerfil: IdPerfil,
      Email: Email
    });
  }
}
