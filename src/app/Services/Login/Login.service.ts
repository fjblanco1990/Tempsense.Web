import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class LoginService {
    public url: string;
    public httpOptions: HttpHeaders;

    constructor(private _http: HttpClient, private envirment: EnvironmentService) {

    }

    CrearSesion(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/CrearSessionUsuario';
        return this._http.post(this.url, Datos, httpOptions);
    }

    CerrarSesion(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/CerrarSesionUsuario';
        return this._http.post(this.url, Datos, httpOptions);
    }

    ValidarSesionActiva(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/ValidarSessionUsuario';
        return this._http.post(this.url, Datos, httpOptions);
    }

    
}