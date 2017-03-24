import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Ocupaciones} from "../_models/ocupaciones";
import {OcupacionesTipos} from "../_models/ocupacionesTipos";
import {AuthenticationService} from "./authentication.service";
import {Search} from "../_models/search";

@Injectable()
export class OcupacionesService {

    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_SP_URL %>/ocupaciones/';
    private serviceTiposURL = '<%= SVC_SP_URL %>/ocupacionesTipos/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listOcupaciones() {
        return this.http.get(this.serviceURL,{headers: this.headers}).map((res: Response) => res.json() as Ocupaciones[]);
    }

    addOcupaciones(c: Ocupaciones): Promise<Ocupaciones> {
        return this.http.post(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().then(res => res.json() as Ocupaciones).catch(this.handleError);
    };

    updateOcupaciones(c: Ocupaciones): Promise<Ocupaciones> {
        return this.http.put(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewOcupaciones(id: number) {
        return this.http.get(this.serviceURL + id,{headers: this.headers}).map(res => res.json() as Ocupaciones);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }

    listOcupacionesTipos() {
        return this.http.get(this.serviceTiposURL,{headers: this.headers}).map((res: Response) => res.json() as OcupacionesTipos[]);
    }
    getSearch(val: string) {
        return this.http.get(this.serviceURL +'search/'+ val+'/',{headers: this.headers}).map(res => res.json() as Search[]);
    }
}
