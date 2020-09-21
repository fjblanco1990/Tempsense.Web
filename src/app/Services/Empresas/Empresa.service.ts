import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { map } from 'rxjs/operators';
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


}