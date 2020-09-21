import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class EnvironmentService {
    public Url;
    public UrlFront;

    /*URL DE BACKEND*/
    private urlDev = 'http://localhost:50106'; // Produccion desarrollo

    private urlProd = ''; // Pruebas pruebas

    // private urlProd = ''; // Pruebas produccion

    // private urlProd = ''; // Produccion

    /*FIN URL DE BACKEND*/

    constructor() {
        this.getUrlEnvironment();
    }

    private getUrlEnvironment() {
        // Cambiar el valor a true cuando se publique
        // NOTA: Enviar correo cada vez que se realice una publicación final
        // environment.production = true;

        if (environment.production) {
            this.Url = this.urlProd;
        } else {
            this.Url = this.urlDev;
        }
    }
}
