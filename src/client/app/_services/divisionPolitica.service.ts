import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {AuthenticationService} from "./authentication.service";
import {DivisionPolitica} from "../_models/divisionPolitica";
import {DivisionPoliticaAreas} from "../_models/divisionPoliticaAreas";
import {DivisionPoliticaLocalidades} from "../_models/divisionPoliticaLocalidades";
import {DivisionPoliticaResguardos} from "../_models/divisionPoliticaResguardos";
import {DivisionPoliticaComunas} from "../_models/divisionPoliticaComunas";
import {DivisionPoliticaTipos} from "../_models/divisionPoliticaTipos";
import {Search} from "../_models/search";

@Injectable()
export class DivisionPoliticaService {

    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_SP_URL %>/divisionPolitica/';
    private serviceAreasURL = '<%= SVC_SP_URL %>/divisionPoliticaAreas/';
    private serviceTiposURL = '<%= SVC_SP_URL %>/divisionPoliticaTipos/';
    private serviceComunasURL = '<%= SVC_SP_URL %>/divisionPoliticaComunas/';
    private serviceLocalidadesURL = '<%= SVC_SP_URL %>/divisionPoliticaLocalidades/';
    private serviceResguardosURL = '<%= SVC_SP_URL %>/divisionPoliticaResguardos/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listDivisionPolitica() {
        return this.http.get(this.serviceURL,{headers: this.headers}).map((res: Response) => res.json() as DivisionPolitica[]);
    }

    listByPadreDivisionPolitica(id:number) {
        return this.http.get(this.serviceURL+"query/"+id,{headers: this.headers}).map((res: Response) => res.json() as DivisionPolitica[]);
    }
    addDivisionPolitica(c: DivisionPolitica): Promise<DivisionPolitica> {
        return this.http.post(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().then(res => res.json() as DivisionPolitica).catch(this.handleError);
    };

    updateDivisionPolitica(c: DivisionPolitica): Promise<DivisionPolitica> {
        return this.http.put(this.serviceURL, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewDivisionPolitica(id: number) {
        return this.http.get(this.serviceURL + id,{headers: this.headers}).map(res => res.json() as DivisionPolitica);
    }

    listDivisionPoliticaAreas() {
        return this.http.get(this.serviceAreasURL,{headers: this.headers}).map((res: Response) => res.json() as DivisionPoliticaAreas[]);
    }

    listDivisionPoliticaTipos() {
        return this.http.get(this.serviceTiposURL,{headers: this.headers}).map((res: Response) => res.json() as DivisionPoliticaTipos[]);
    }

    listDivisionPoliticaComunas() {
        return this.http.get(this.serviceComunasURL,{headers: this.headers}).map((res: Response) => res.json() as DivisionPoliticaComunas[]);
    }

    listDivisionPoliticaLocalidades() {
        return this.http.get(this.serviceLocalidadesURL,{headers: this.headers}).map((res: Response) => res.json() as DivisionPoliticaLocalidades[]);
    }

    listDivisionPoliticaResguardos() {
        return this.http.get(this.serviceResguardosURL,{headers: this.headers}).map((res: Response) => res.json() as DivisionPoliticaResguardos[]);
    }

    getSearch(val: string) {
        return this.http.get(this.serviceURL +'search/'+ val+'/',{headers: this.headers}).map(res => res.json() as Search[]);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }


}
