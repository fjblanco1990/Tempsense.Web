import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { EnvironmentService } from '../Enviroment/enviroment.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class PerfilesService {
    public url: string;
    public headers: HttpHeaders;
    constructor(private http: HttpClient, private envirment: EnvironmentService) {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json;charset=UTF-8');
    }

    GetAllProfiles(): Observable<any> {
        this.url = this.envirment.Url + '/GetAllProfiles';
        return this.http.get(this.url, { headers: this.headers });
    }
}
