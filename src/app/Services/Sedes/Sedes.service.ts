
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { Observable } from 'rxjs';


@Injectable()
export class SedesService {
    public url: string;
    public headers: HttpHeaders;
    constructor(private http: HttpClient, private envirment: EnvironmentService) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    }

    GetAllSedes(): Observable<any> {
        this.url = this.envirment.Url + '/GetAllSedes';
        return this.http.get(this.url, { headers: this.headers });
    }

    GetSedeXEmpresa(idSede: any): Observable<any> {
        this.url = this.envirment.Url + '/ListarSedeId?sede=' + idSede;
        return this.http.get(this.url, { headers: this.headers });
    }

    SaveSede(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/CrearSede';
        return this.http.post(this.url, Datos, httpOptions);
    }

    UpdateSede(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/EditarSedeId';
        return this.http.post(this.url, Datos, httpOptions);
    }

    DeleteSede(idSede: any): Observable<any> {
        this.url = this.envirment.Url + '/EliminarSede?sede=' + idSede;
        return this.http.get(this.url, { headers: this.headers });
    }
}
