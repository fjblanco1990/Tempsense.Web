import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { Observable } from 'rxjs';


@Injectable()
export class BitacorasService {
    public url: string;
    public headers: HttpHeaders;
    constructor(private http: HttpClient, private envirment: EnvironmentService) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    }

    GetAllBitacoras(): Observable<any> {
        this.url = this.envirment.Url + '/GetAllBitacoras';
        return this.http.get(this.url, { headers: this.headers });
    }

    GetAllBitacorasUser(Id): Observable<any> {
        this.url = this.envirment.Url + '/GetAllBitacorasUser?Id=' + Id;
        return this.http.get(this.url, { headers: this.headers });
    }


    SaveBitacoras(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/CrearBitacora';
        return this.http.post(this.url, Datos, httpOptions);
    }

    UpdateBitacora(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/EditarBitacoraId';
        return this.http.post(this.url, Datos, httpOptions);
    }

}
