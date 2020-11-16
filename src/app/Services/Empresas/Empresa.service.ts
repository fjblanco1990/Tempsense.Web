import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { Observable } from 'rxjs';


@Injectable()
export class EmpresasService {
    public url: string;
    public headers: HttpHeaders;
    constructor(private _http: HttpClient, private envirment: EnvironmentService) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    }

    GetAllEmpresas(): Observable<any> {
        this.url = this.envirment.Url + '/GetAllEmpresas';
        return this._http.get(this.url, { headers: this.headers });
    }

    SaveEmpresa(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/CrearEmpresa';
        return this._http.post(this.url, Datos, httpOptions);
    }

    UpdateEmpresa(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/EditarEmpresaId';
        return this._http.post(this.url, Datos, httpOptions);
    }


    DeleteEmpresas(idEmpresa: any): Observable<any> {
        this.url = this.envirment.Url + '/EliminarEmpresa?empresa=' + idEmpresa;
        return this._http.get(this.url, { headers: this.headers });
    }


}