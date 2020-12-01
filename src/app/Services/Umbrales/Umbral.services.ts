
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { Observable } from 'rxjs';


@Injectable()
export class UmbralesService {
    public url: string;
    public headers: HttpHeaders;
    constructor(private _http: HttpClient, private envirment: EnvironmentService) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    }

    GetAllUmbrales(): Observable<any> {
        this.url = this.envirment.Url + '/GetAllUmbrales';
        return this._http.get(this.url, { headers: this.headers });
    }

    SaveUmbral(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/CrearUmbral';
        return this._http.post(this.url, Datos, httpOptions);
    }

    UpdateUmbral(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/EditarUmbralId';
        return this._http.post(this.url, Datos, httpOptions);
    }


    DeleteUmbral(idUmbral: any): Observable<any> {
        this.url = this.envirment.Url + 'EliminarUmbral?umbral=' + idUmbral;
        return this._http.get(this.url, { headers: this.headers });
    }


}