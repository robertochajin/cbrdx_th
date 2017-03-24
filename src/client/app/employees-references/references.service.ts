import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {References} from './references';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class ReferencesService {


    headers = new Headers({'Content-Type': 'application/json'});
    private serviceURL = '<%= SVC_TH_URL %>/employeesReferences/';

    constructor(private http: Http,
                private authenticationService: AuthenticationService) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    getAll()  {
        return this.http.get(this.serviceURL, {headers: this.headers})
                    .map((res:Response) => res.json().data);
    }

    getAllgetAllByEmployee(idTercero: number)  {
        // return this.http.get(this.serviceURL+'employee/'+ idTercero, {headers: this.headers})
        return this.http.get(this.serviceURL, {headers: this.headers})
                    .map((res:Response) => res.json());
    }

    add(f: References) {
        return this.http.post(this.serviceURL, f, {headers: this.headers})
                    .map((res:Response) => res.json());
    };

    update(f: References) {
        return this.http.put(this.serviceURL+'/'+ f.idTercerosReferencia, f, {headers: this.headers})
                    .map((res:Response) => res.json());
    }

    get(id: number) {
        return this.http.get(this.serviceURL+'/'+ id, {headers: this.headers})
                    .map((res:Response) => res.json().data as References);
    }

    delete(f: References) {
        return this.http.delete(this.serviceURL+'/'+ f.idTercerosReferencia, {headers: this.headers})
                    .map((res:Response) => res.json());
    }

}
