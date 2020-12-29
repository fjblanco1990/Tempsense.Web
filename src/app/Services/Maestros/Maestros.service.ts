

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { Observable } from 'rxjs';


@Injectable()
export class MaestrosService {
    public url: string;
    public headers: HttpHeaders;
    constructor(private http: HttpClient, private envirment: EnvironmentService) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    }

    GetAllMedidas(): Observable<any> {
        this.url = this.envirment.Url + '/GetAllMedidas';
        return this.http.get(this.url, { headers: this.headers });
    }
}
