import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from 'src/app/Services/Empresas/Empresa.service';

@Component({
  selector: 'app-umbral',
  templateUrl: './umbral.component.html',
  styleUrls: ['./umbral.component.css'],
  providers: [EmpresasService]
})
export class UmbralComponent implements OnInit {

  public DataEmpresa: any;
  public empresaFrom: any;
  constructor(public empresasService: EmpresasService) { }

  ngOnInit(): void {
    this.validarEmpresas();
    this.GetAllEmpresas();
  }


  GetAllEmpresas(): void {
    this.empresasService.GetAllEmpresas().subscribe(
      resutl => {
        this.DataEmpresa = resutl;
      }
    )
  }

  validarEmpresas(): void {

    const Nombre = new FormControl('', [Validators.required, Validators.pattern('[A-Za-zñÑ ]*')]);
    const Telefono = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*')]);
    const Email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);

    this.empresaFrom = new FormGroup({

    });
  }


}
