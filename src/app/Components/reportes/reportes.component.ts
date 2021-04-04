import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { SedesService } from 'src/app/Services/Sedes/Sedes.service';
import { DispositivosService } from 'src/app/Services/Dispositivos/Dispositivos.services';
import { ReporteService } from 'src/app/Services/Maestros/Reporte.service';
import { NotificacionesService } from 'src/app/Services/Genrales/alertas.service';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
//  

declare var $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [EmpresasService, SedesService, DispositivosService, ReporteService, NotificacionesService]
})
export class ReportesComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: '80',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'Max'
          }
        },
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: '20',
          borderColor: 'black',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'Min'
          }
        }
      ]
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  public dataEmpresa: object;
  public DataSede: any;
  public DataDispositivo: any;
  public reporteFrom: any;
  public sendFrom: any;
  public DataReport: any[] = [];
  public ModelPrint: string[] = [];
  ActivarDataTable = false;
  private infoLogin = JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('InfoLogin')))));
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  timerSubscription: Subscription;
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(public empresasService: EmpresasService, public sedesService: SedesService,
              private dispositivosService: DispositivosService, private reporteService: ReporteService,
              private notificacionesService: NotificacionesService) { }


  ngOnInit(): void {
    this.ValidarPerfilUser();
    this.validarEmpresas();
    this.DataReport = [];
    this.dtOptions.destroy = true;

    //#region 
    // this.canvas = document.getElementById('myChart'); this.ctx = this.canvas.getContext('2d'); const myChart = new Chart(this.ctx, {
    //   type: 'line', data: {
    //     labels: ['USA', 'Spain', 'Italy', 'France', 'Germany', 'UK', 'Turkey', 'Iran', 'China', 'Russia',
    // 'Brazil', 'Belgium', 'Canada', 'Netherlands', 'Switzerland', 'India', 'Portugal', 'Peru', 'Ireland', 'Sweden'], datasets: [{
    //       label: 'Total cases.',
    //       data: [886789, 213024, 189973, 158183, 153129, 138078, 101790, 87026, 82804, 62773,
    //          50036, 42797, 42110, 35729, 28496, 23502, 22353, 20914, 17607, 16755],
    //       backgroundColor: ['red', , , , , , , , 'orange'],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },
    //     responsive: false,
    //     display: true
    //   }
    // });
    //#endregion
    this.GetDataAllReport();
  }

  //#region Reporte Chart Js.
  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const DataList: number[] = x.data as number[];
      DataList.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor(): void {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel(): void {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  }

  //#endregion

  GetAllEmpresas(): any {
    this.empresasService.GetAllEmpresas().subscribe(
      resutl => {
         this.dataEmpresa = resutl;
       
      }
    );
  }

  GetEmpresaId(id): any {
    this.empresasService.GetLstEmpresaId(id).subscribe(
      resutl => {
        this.dataEmpresa = resutl;
        console.log(this.dataEmpresa);
      }
    );
  }

  GetAllSedes(): any {
    this.sedesService.GetAllSedes().subscribe(
      resutl => {
        this.DataSede = resutl;
      }
    );
  }

  GetAllSedesId(): any {
    const empresa = this.reporteFrom.get('Empresa').value;
    this.sedesService.GetSedeXEmpresa(empresa).subscribe(
      resutl => {
        this.DataSede = resutl;
      }
    );
  }

  GetAllDispositivos(): any {
    this.dispositivosService.GetAllDispositivos().subscribe(
      resutl => {
        this.DataDispositivo = resutl;
      }
    );
  }

  GetAllDispositivosSedeId(): any {
    const idUserEmp = this.reporteFrom.get('Sede').value;
    this.dispositivosService.GetAllDispositivosSede(idUserEmp).subscribe(
      resutl => {
        this.DataDispositivo = resutl;
      }
    );
  }

  SendReportMail(): void {
    if (this.sendFrom.valid) {
    const email = this.sendFrom.get('email').value;
    this.reporteService.SendReport(email, this.DataReport).subscribe(
      result => {
        this.notificacionesService.ExitosoGeneral('El reporte se envio con exito');
      }, error => {

      }
    );
    } else {
      this.ValidarErrorForm(this.sendFrom);
    }
  }

  GetDataAllReport(): void {
    this.DataReport = [];
    $('#example').DataTable();
    const user = this.infoLogin.IdUsuario;
    this.reporteService.GetDataReport(user).subscribe(
      result => {
        this.DataReport = result;
        this.ActivarDataTable = true;
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          lengthMenu: [5, 10, 25],
          search: true,
          data: this.DataReport,
          columns: [
            { data: 'Valor' },
            { data: 'Nombre' },
            { data: 'FechaHora' },
            { data: '$id', visible: false},
            { data: 'Empresa', visible: false },
            { data: 'IdDispositivo', visible: false },
          ],
          destroy: true,
          language: {
            url: 'https://cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'
          }
        };
      }, error  => {
        console.error('Error carga tabla reporte. ' + error);
      }
    );
  }

  realodPage(): void {
    window.location.href = 'http://localhost:4200/Reportes';
  }

  addDataPrint(): any {
    this.ModelPrint.push(this.reporteFrom.get('FechaInicio').value);
    this.ModelPrint.push(this.reporteFrom.get('FechaFin').value);
    this.ModelPrint.push(this.reporteFrom.get('Empresa').value);
    this.ModelPrint.push(this.reporteFrom.get('Sede').value);
    this.ModelPrint.push(this.reporteFrom.get('Dispositivo').value);

  }

  private ValidarPerfilUser(): any {
    if (localStorage.getItem('InfoLogin') !== null) {
      if (this.infoLogin.IdPerfil === 1) {
        this.GetAllEmpresas();
      } else {
        this.GetEmpresaId(this.infoLogin.IdEmpresa);
      }
    }
  }



  LimpiarFormEmail(): void {
    this.sendFrom.reset();
  }

  validarEmpresas(): any {

    const FechaInicio = new FormControl('', [Validators.required]);
    const FechaFin = new FormControl('', [Validators.required]);
    const Filtro = new FormControl('', [Validators.required]);
    const Empresa = new FormControl('', [Validators.required]);
    const Sede = new FormControl('', [Validators.required]);
    const Dispositivo = new FormControl('', [Validators.required]);

    const email = new FormControl('', [Validators.required]);

    this.reporteFrom = new FormGroup({
      FechaInicio,
      FechaFin,
      Filtro,
      Empresa,
      Sede,
      Dispositivo
    });

    this.sendFrom = new FormGroup({
      email
    });
  }

  ValidarErrorForm(formulario: any): any {
    Object.keys(formulario.controls).forEach(field => { // {1}
      const control = formulario.get(field);            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });
  }

}
