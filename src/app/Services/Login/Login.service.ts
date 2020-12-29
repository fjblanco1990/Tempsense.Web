import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { Observable } from 'rxjs';


@Injectable()
export class LoginService {
    public url: string;
    public headers: HttpHeaders;
    constructor(private http: HttpClient, private envirment: EnvironmentService) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    }
    CrearSesion(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/CrearSessionUsuario';
        return this.http.post(this.url, Datos, httpOptions);
    }

    CerrarSesion(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/CerrarSesionUsuario';
        return this.http.post(this.url, Datos, httpOptions);
    }

    ValidarSesionActiva(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/ValidarSessionUsuario';
        return this.http.post(this.url, Datos, httpOptions);
    }

    RecuperarContrasena(email: any): Observable<any> {
        this.url = this.envirment.Url + '/RecuperarPassword?email=' + email;
        return this.http.get(this.url, { headers: this.headers });
    }
}
