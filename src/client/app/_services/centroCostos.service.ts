import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {CentroCostos} from "../_models/centroCostos";
import "rxjs/add/operator/toPromise";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class CentroCostosService {

    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_SP_URL %>/centrosCostos/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }
    listCentroCostos() {
        return this.http.get(this.serviceURL,{headers: this.headers}).map((res: Response) => res.json() as CentroCostos[]);
    }

    addCentroCostos(c: CentroCostos): Promise<CentroCostos> {
        return this.http.post(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().then(res => res.json() as CentroCostos).catch(this.handleError);
    };

    updateCentroCostos(c: CentroCostos): Promise<CentroCostos> {
        return this.http.put(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewCentroCostos(id: number) {
        return this.http.get(this.serviceURL + id,{headers: this.headers}).map(res => res.json() as CentroCostos);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }
}
