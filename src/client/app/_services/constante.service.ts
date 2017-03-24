import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {VConstante} from "../_models/vConstante";
import {Constante} from "../_models/constante";
import "rxjs/add/operator/toPromise";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class ConstanteService {

    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_SP_URL %>/constantes/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listConstants() {
        return this.http.get(this.serviceURL + "vista/",{headers: this.headers}).map((res: Response) => res.json() as VConstante[]);
    }

    listOtherConstants(idConstante: number) {
        return this.http.get(this.serviceURL + "vista/" + idConstante,{headers: this.headers}).map((res: Response) => res.json() as VConstante[]);
    }

    addConstant(c: Constante): Promise<Constante> {
        return this.http.post(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().then(res => res.json() as Constante).catch(this.handleError);
    };

    updateConstant(c: Constante): Promise<Constante> {
        return this.http.put(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewConstant(id: number) {
        return this.http.get(this.serviceURL + id,{headers: this.headers}).map(res => res.json() as Constante);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }
}
