import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpRequest } from "@angular/common/http";
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class UsuariosService {
    public url: string;
    public httpOptions: HttpHeaders;
    
    constructor(private _http: HttpClient, private envirment: EnvironmentService) {
        
    }

    GuardarUsuarios(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/GuardarUsuario';
        return this._http.post(this.url, Datos ,httpOptions);
    }


}