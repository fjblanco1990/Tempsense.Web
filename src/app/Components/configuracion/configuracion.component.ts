import { AfterContentInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BitacorasConfigComponent } from './bitacoras-config/bitacoras-config.component';
import { DispositvosConfigComponent } from './dispositvos-config/dispositvos-config.component';
import { EmpresasConfigComponent } from './empresas-config/empresas-config.component';
import { SedesConfigComponent } from './sedes-config/sedes-config.component';
import { UmbralConfigComponent } from './umbral-config/umbral-config.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit, OnChanges {
  @ViewChild('empresaConfigComponent', { static: false }) empresaConfigComponent: EmpresasConfigComponent;
  @ViewChild('dispositivoConfigComponent', { static: false }) dispositivoConfigComponent: DispositvosConfigComponent;
  @ViewChild('sedesConfigComponent', { static: false }) sedesConfigComponent: SedesConfigComponent;
  @ViewChild('umbralConfigComponent', { static: false }) umbralConfigComponent: UmbralConfigComponent;
  constructor() { }

  ngOnChanges(): void {

  }

  ngOnInit(): void {

  }



  RecibiarCambios($event): any {
    if ($event) {
        this.dispositivoConfigComponent.GetAllEmpresas();
        this.sedesConfigComponent.GetAllEmpresas();
      }
  }

  RecibirCambiosDispo($event): any {
    if ($event) {
      this.umbralConfigComponent.GetAllDispositivos();
    }
  }

}
