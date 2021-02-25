import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { Observable } from 'rxjs';


@Injectable()
export class ReporteService {
    public url: string;
    public headers: HttpHeaders;
    constructor(private http: HttpClient, private envirment: EnvironmentService) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    }

    SendReport(email): Observable<any> {
        this.url = this.envirment.Url + '/SendMailReport?email=' + email;
        return this.http.post(this.url, { headers: this.headers });
    }

    GetDataReport(user): Observable<any>{
        this.url = this.envirment.Url + '/GetDataReport?user=' + user;
        return this.http.get(this.url, { headers: this.headers });
    }

    GetDataReporteFiltros(user, dispo, inicio, fin): Observable<any> {
        this.url = this.envirment.Url + '/GetDataReporteFiltros?ususario=' + user + '&dispo=' + dispo + '&inicio=' + inicio + '&fin=' + fin;
        return this.http.get(this.url, { headers: this.headers });
    }

    GetDataReporteConFiltros(user, dispo, inicio, fin, filtro): Observable<any> {
        this.url = this.envirment.Url + '/ListarDataReporteFiltro?ususario=' +
         user + '&dispo=' + dispo + '&inicio=' + inicio + '&fin=' + fin + '&filtro=' + filtro;
        return this.http.get(this.url, { headers: this.headers });
    }
}
