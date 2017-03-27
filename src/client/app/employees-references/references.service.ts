import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {References} from './references';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class ReferencesService {


    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_TH_URL %>/api/tercerosReferencias/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    getAll()  {
        return this.http.get(this.serviceURL, {headers: this.headers})
                    .map((res:Response) => res.json());
    }

    getAllgetAllByEmployee(idTercero: number)  {
      return this.http.get(this.serviceURL+'buscarTercero/'+ idTercero, {headers: this.headers})
                    .map((res:Response) => res.json());
    }

    add(f: References) {
        return this.http.post(this.serviceURL, f, {headers: this.headers})
                    .map((res:Response) => res.json());
    };

    update(f: References) {
        return this.http.put(this.serviceURL, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
    }

    get(id: number) {
        return this.http.get(this.serviceURL+'/buscarId/'+ id, {headers: this.headers})
                    .map((res:Response) => res.json() as References);
    }

    handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
    }

}
