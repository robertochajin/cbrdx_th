
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Noformalstudies} from '../employees-academic-education/no-formal-studies';
import {FormalStudies} from '../employees-academic-education/formal-studies';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AcademicEducationService {

    public headers = new Headers({'Content-Type': 'application/json'});
    private masterService = '<%= SVC_TH_URL %>/api/tercerosEstudiosFormales/';
    private detailService  = '<%= SVC_TH_URL %>/api/tercerosEstudiosFormales/';
    private NFmasterService = '<%= SVC_TH_URL %>/api/tercerosEstudiosNoFormales/';

    constructor(private http: Http, private authenticationService: AuthenticationService) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
    }

    getAllFormal()  {
        return this.http.get(this.masterService + 'buscarTercero/', {headers: this.headers}).map((res:Response) => res.json());
    }

    getAllFormalByEmployee(id: number)  {
        return this.http.get(this.masterService + 'buscarTercero/'+id, {headers: this.headers}).map((res:Response) => res.json());
    }

    addFormal(f: FormalStudies) {
        return this.http.post(this.masterService ,f, {headers: this.headers}).map((res:Response) => res.json());
    };

    updateFormal(f: FormalStudies) {
        return this.http.put(this.masterService ,f, {headers: this.headers}).map((res:Response) => res.json());
    }

    getFormal(id: number) {
        return this.http.get(this.masterService + 'buscarId/' + id, {headers: this.headers}).map((res:Response) => res.json() as FormalStudies)
    }

    getAllNoFormal()  {
        return this.http.get(this.NFmasterService + '', {headers: this.headers}).map((res:Response) => res.json());
    }

    addNoFormal(f: Noformalstudies) {
        return this.http.post(this.NFmasterService + '',f, {headers: this.headers}).map((res:Response) => res.json());
    };

    updateNoFormal(f: Noformalstudies) {
        return this.http.put(this.NFmasterService + '/',f, {headers: this.headers}).map((res:Response) => res.json());
    }

    getNoFormal(id: number) {
      return this.http.get(this.NFmasterService + '/'+ id, {headers: this.headers}).map((res:Response) => res.json() as Noformalstudies);
    }

    deleteNoFormal(f: Noformalstudies) {
      return this.http.delete(this.NFmasterService + '/'+ f.idEstudio).map((res:Response) => res.json());
    }

}
