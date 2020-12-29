import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BitacorasService } from 'src/app/Services/Bitacoras/Bitacoras.services';
import { DispositivosService } from 'src/app/Services/Dispositivos/Dispositivos.services';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css'],
  providers: [EmpresasService, BitacorasService, NotificacionesService, DispositivosService]
})
export class BitacoraComponent implements OnInit {


  public DataEmpresa: any;
  public DataDispositivo: any;
  public DataBitacoras: any[] = [];
  public bitacorasFrom: any;
  public infoDetalle: any;
  constructor(public empresasService: EmpresasService, private bitacorasService: BitacorasService,
              private notificacionesService: NotificacionesService, private dispositivosService: DispositivosService) { }

  ngOnInit(): void {
    this.validarBitacoras();
    this.ValidarPerfilUser();
  }

  GuardarBitacora(): any {
    const infoLogin = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
    if (this.bitacorasFrom.valid) {
      this.bitacorasFrom.get('Responsable').setValue(infoLogin.IdUsuario);
      this.bitacorasService.SaveBitacoras(JSON.stringify(this.bitacorasFrom.value)).subscribe(
        result => {
          this.bitacorasFrom.reset();
          this.ValidarPerfilUser();
          this.notificacionesService.Exitoso('Registro');
        },
        error => {
          this.notificacionesService.Error(error);
        }
      );
    } else {
      this.ValidarErrorForm(this.bitacorasFrom);
    }
  }

  GetAllDispositivos(): any {
    this.dispositivosService.GetAllDispositivos().subscribe(
      resutl => {
        this.DataDispositivo = resutl;
      }
    );
  }

  GetAllDispositivosUser(idUserEmp): any {
    this.dispositivosService.GetAllDispositivosUser(idUserEmp).subscribe(
      resutl => {
        this.DataDispositivo = resutl;
      }
    );
  }

  GetAllBitacoras(): any {
    this.DataBitacoras = [];
    this.dispositivosService.GetAllDispositivos().subscribe(
      resutlDis => {
        this.bitacorasService.GetAllBitacoras().subscribe(
          resultBit => {
            resultBit.forEach(elementBit => {
              this.bitacorasFrom.get('IdBitacora').setValue(elementBit.IdBitacora);
              this.bitacorasFrom.get('Fecha').setValue(elementBit.Fecha);
              this.bitacorasFrom.get('HoraInicio').setValue(elementBit.HoraInicio);
              this.bitacorasFrom.get('HoraFin').setValue(elementBit.HoraFin);
              this.bitacorasFrom.get('Problema').setValue(elementBit.Problema);
              this.bitacorasFrom.get('Solucion').setValue(elementBit.Solucion);
              this.bitacorasFrom.get('Responsable').setValue(elementBit.Responsable);
              this.bitacorasFrom.get('guardadodebitacora').setValue(elementBit.guardadodebitacora);
              resutlDis.forEach(elementFor => {
                if (elementFor.IdDispositivo === elementBit.IdDispositivo) {
                  this.bitacorasFrom.get('IdDispositivo').setValue(elementFor);
                }
              });
              this.DataBitacoras.push(this.bitacorasFrom.value);
              this.bitacorasFrom.reset();
            });
          });
      },
      error => {
        this.notificacionesService.Error(error);
      }
    );
  }

  GetAllBitacorasUser(user): any {
    this.DataBitacoras = [];
    this.dispositivosService.GetAllDispositivos().subscribe(
      resutlDis => {
        this.bitacorasService.GetAllBitacorasUser(user).subscribe(
          resultBit => {
            resultBit.forEach(elementBit => {
              this.bitacorasFrom.get('IdBitacora').setValue(elementBit.IdBitacora);
              this.bitacorasFrom.get('Fecha').setValue(elementBit.Fecha);
              this.bitacorasFrom.get('HoraInicio').setValue(elementBit.HoraInicio);
              this.bitacorasFrom.get('HoraFin').setValue(elementBit.HoraFin);
              this.bitacorasFrom.get('Problema').setValue(elementBit.Problema);
              this.bitacorasFrom.get('Solucion').setValue(elementBit.Solucion);
              this.bitacorasFrom.get('Responsable').setValue(elementBit.Responsable);
              this.bitacorasFrom.get('guardadodebitacora').setValue(elementBit.guardadodebitacora);
              resutlDis.forEach(elementFor => {
                if (elementFor.IdDispositivo === elementBit.IdDispositivo) {
                  this.bitacorasFrom.get('IdDispositivo').setValue(elementFor);
                }
              });
              this.DataBitacoras.push(this.bitacorasFrom.value);
              this.bitacorasFrom.reset();
            });
        });
      },
      error => {
        this.notificacionesService.Error(error);
      }
    );
  }

  DetallerBitacora(dataBitacora): any {
    this.infoDetalle = dataBitacora;
  }

  LimpiarFormulario(): any {
    this.bitacorasFrom.reset();
  }

  ValidarErrorForm(formulario: any): any {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }

  private ValidarPerfilUser(): any {
    if (localStorage.getItem('InfoLogin') !== null) {
      const infoLogin = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
      if (infoLogin.IdPerfil === 1) {
        this.GetAllBitacoras();
        this.GetAllDispositivos();
      } else {
        this.GetAllBitacorasUser(infoLogin.IdUsuario);
        this.GetAllDispositivosUser(infoLogin.IdUsuario);
      }
    }
  }

  validarBitacoras(): any {
    const IdBitacora = new FormControl('', []);
    const Fecha = new FormControl('', [Validators.required]);
    const HoraInicio = new FormControl('', [Validators.required]);
    const HoraFin = new FormControl('', [Validators.required]);
    const Problema = new FormControl('', [Validators.required]);
    const Solucion = new FormControl('', [Validators.required]);
    const IdDispositivo = new FormControl('', [Validators.required]);
    const Responsable = new FormControl('', []);
    const guardadodebitacora = new FormControl('', []);

    this.bitacorasFrom = new FormGroup({
      IdBitacora,
      Fecha,
      HoraInicio,
      HoraFin,
      Problema,
      Solucion,
      IdDispositivo,
      Responsable,
      guardadodebitacora
    });
  }

}
