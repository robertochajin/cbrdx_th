import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ActividadEconomica } from '../_models/actividadEconomica';
import { ActividadEconomicaTipos } from '../_models/actividadEconomicaTipos';
import { AuthenticationService } from './authentication.service';
import { Search } from '../_models/search';

@Injectable()
export class ActividadEconomicaService {

    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL_SP = '<%= SVC_SP_URL %>/actividadesEconomicas/';
    private serviceTypesURL = '<%= SVC_SP_URL %>/actividadesEconomicasTipos/';
    private serviceURL = '<%= SVC_TH_URL %>/api/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService
    ) {
        this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    listActividadEconomica() {
        return this.http.get(this.serviceURL_SP,{headers: this.headers}).map((res: Response) => res.json() as ActividadEconomica[]);
    }

    addActividadEconomica(c: ActividadEconomica): Promise<ActividadEconomica> {
        return this.http.post(this.serviceURL_SP, JSON.stringify(c), {headers: this.headers})
           .toPromise().then(res => res.json() as ActividadEconomica).catch(this.handleError);
    };

    updateActividadEconomica(c: ActividadEconomica): Promise<any> {
        return this.http.put(this.serviceURL_SP, JSON.stringify(c), {headers: this.headers}).toPromise().catch(this.handleError);
    }

    viewActividadEconomica(id: number) {
        return this.http.get(this.serviceURL_SP + id,{headers: this.headers}).map(res => res.json() as ActividadEconomica);
    }

    handleError(error: any): Promise<any> {
        console.error('Error:', error);
        return Promise.reject(error.message || error);
    }

    listActividadEconomicaTipos() {
        return this.http.get(this.serviceTypesURL,{headers: this.headers}).map((res: Response) => res.json() as ActividadEconomicaTipos[]);
    }
    getSearch(val: string) {
        return this.http.get(this.serviceURL_SP +'search/'+ val+'/',{headers: this.headers}).map(res => res.json() as Search[]);
    }

    /* Refactor */
    listByPadre(id: number) {
      return this.http.get(this.serviceURL+'actividadesEconomicas/padre/'+ id+'/',{headers: this.headers})
         .map((res: Response) => res.json() as ActividadEconomica[]);
    }
    listLastChild(id: number) {
      return this.http.get(this.serviceURL+'actividadesEconomicas/lastChild/'+ id+'/',{headers: this.headers})
         .map((res: Response) => res.json() as ActividadEconomica[]);
    }
}
