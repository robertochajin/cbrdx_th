import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {ActividadEconomica} from "../_models/actividadEconomica";
import {ActividadEconomicaTipos} from "../_models/actividadEconomicaTipos";
import {AuthenticationService} from "./authentication.service";
import {Search} from "../_models/search";

@Injectable()
export class ActividadEconomicaService {

    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_SP_URL %>/actividadesEconomicas/';
    private serviceTypesURL = '<%= SVC_SP_URL %>/actividadesEconomicasTipos/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listActividadEconomica() {
        return this.http.get(this.serviceURL,{headers: this.headers}).map((res: Response) => res.json() as ActividadEconomica[]);
    }

    addActividadEconomica(c: ActividadEconomica): Promise<ActividadEconomica> {
        return this.http.post(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().then(res => res.json() as ActividadEconomica).catch(this.handleError);
    };

    updateActividadEconomica(c: ActividadEconomica): Promise<ActividadEconomica> {
        return this.http.put(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewActividadEconomica(id: number) {
        return this.http.get(this.serviceURL + id,{headers: this.headers}).map(res => res.json() as ActividadEconomica);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }

    listActividadEconomicaTipos() {
        return this.http.get(this.serviceTypesURL,{headers: this.headers}).map((res: Response) => res.json() as ActividadEconomicaTipos[]);
    }
    getSearch(val: string) {
        return this.http.get(this.serviceURL +'search/'+ val+'/',{headers: this.headers}).map(res => res.json() as Search[]);
    }
}
