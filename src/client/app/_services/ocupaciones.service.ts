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
    private serviceURL_SP = '<%= SVC_TH_URL %>/api/ocupaciones/';
    private serviceTiposURL = '<%= SVC_TH_URL %>/api/ocupacionesTipos/';
    private serviceURL = '<%= SVC_TH_URL %>/api/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listOcupaciones() {
        return this.http.get(this.serviceURL_SP,{headers: this.headers}).map((res: Response) => res.json() as Ocupaciones[]);
    }

    addOcupaciones(c: Ocupaciones): Promise<Ocupaciones> {
        return this.http.post(this.serviceURL_SP, JSON.stringify(c), {headers: this.headers}).toPromise().then(res => res.json() as Ocupaciones).catch(this.handleError);
    };

    updateOcupaciones(c: Ocupaciones): Promise<any> {
        return this.http.put(this.serviceURL_SP, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewOcupaciones(id: number) {
        return this.http.get(this.serviceURL_SP + id,{headers: this.headers}).map(res => res.json() as Ocupaciones);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }

    listOcupacionesTipos() {
        return this.http.get(this.serviceTiposURL,{headers: this.headers}).map((res: Response) => res.json() as OcupacionesTipos[]);
    }
    getSearch(val: string) {
        return this.http.get(this.serviceURL_SP +'search/'+ val+'/',{headers: this.headers}).map(res => res.json() as Search[]);
    }
  
    /* Refactor */
    listByNivel(val: number) {
      return this.http.get(this.serviceURL+'ocupaciones/tipo/'+ val+'/',{headers: this.headers}).map((res: Response) => res.json() as Ocupaciones[]);
    }
}
