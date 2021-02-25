import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { Observable } from 'rxjs';


@Injectable()
export class DispositivosService {
    public url: string;
    public headers: HttpHeaders;
    constructor(private http: HttpClient, private envirment: EnvironmentService) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    }

    GetAllDispositivos(): Observable<any> {
        this.url = this.envirment.Url + '/GetAllDispositivos';
        return this.http.get(this.url, { headers: this.headers });
    }

    GetAllDispositivosUser(Id): Observable<any> {
        this.url = this.envirment.Url + '/GetAllDispositivosUser?Id=' + Id;
        return this.http.get(this.url, { headers: this.headers });
    }

    GetAllDispositivosSede(Id): Observable<any> {
        this.url = this.envirment.Url + '/GetAllDispositivosSede?Id=' + Id;
        return this.http.get(this.url, { headers: this.headers });
    }

    SaveDispositivos(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/CrearDispositivo';
        return this.http.post(this.url, Datos, httpOptions);
    }

    UpdateDispositivo(Datos: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
            })
        };
        this.url = this.envirment.Url + '/EditarDispositivoId';
        return this.http.post(this.url, Datos, httpOptions);
    }

    DeleteDispositivo(idDispo: any): Observable<any> {
        this.url = this.envirment.Url + '/EliminarDispositivo?Id=' + idDispo;
        return this.http.get(this.url, { headers: this.headers });
    }
}
