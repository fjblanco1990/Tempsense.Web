import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { Observable } from 'rxjs';


@Injectable()
export class UsuariosService {
    public url: string;
    public httpOptions: HttpHeaders;
    public headers: HttpHeaders;
    constructor(private http: HttpClient, private envirment: EnvironmentService) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    }

    GuardarUsuarios(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/GuardarUsuario';
        return this.http.post(this.url, Datos, httpOptions);
    }

    UpdateUsuario(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/EditarUsuario';
        return this.http.post(this.url, Datos, httpOptions);
    }

    GetAllUsuarios(): Observable<any> {
        this.url = this.envirment.Url + '/GetAllUsuarios';
        return this.http.get(this.url, { headers: this.headers });
    }

    DeleteUsuario(idUser: any): Observable<any> {
        this.url = this.envirment.Url + '/EliminarUsuario?id=' + idUser;
        return this.http.get(this.url, { headers: this.headers });
    }

}
