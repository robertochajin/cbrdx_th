import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise";
import any = jasmine.any;
import {Tercero} from "../_models/tercero";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class TercerosService {

    public http: Http;
    public headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_TH_URL %>/api/terceros/';

    constructor(http: Http,
                private authenticationService: AuthenticationService) {
        this.http = http;
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.authenticationService ? this.authenticationService.token : ''
        });
    }

    listarTerceros() {
        return this.http.get(this.serviceURL, {headers: this.headers}).map((res: Response) => res.json() as Tercero[]);
    }

    consultarTercero(tipoDocumento: number, numeroDocumento: string) {
        return this.http.get(this.serviceURL + tipoDocumento + "/" + numeroDocumento, {headers: this.headers})
           .map(res => res.json() as Tercero).catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }
}
