import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { UsuariosService } from 'src/app/Services/Usuarios/Usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService, EmpresasService]
})
export class UsuariosComponent implements OnInit {
  //#region Variables carga
  public DataEmpresa: any;
  //#endregion
  @Output() emitEventClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public usuariosService: UsuariosService, public empresasService: EmpresasService) { }

  ngOnInit(): void {
    this.GetAllEmpresas();
  }

  returnBack() {
    this.emitEventClose.emit(true);
  }

  GuardarUsuarios() {
    this.usuariosService.GuardarUsuarios('').subscribe(
      resutl => {
        console.log('usuario guardado');
      }
    )
  }

  GetAllEmpresas() {
    this.empresasService.GetAllEmpresas().subscribe(
      resutl => {
        this.DataEmpresa = resutl;
      }
    )
  }

}
