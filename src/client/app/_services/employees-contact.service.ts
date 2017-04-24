import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {EmployeesContact} from '../_models/employeesContactList';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class EmployeesContactService {
  
    private serviceURL = '<%= SVC_TH_URL %>/api/';
    headers = new Headers({'Content-Type': 'application/json'});
   
   constructor(private http: Http,
               private authenticationService: AuthenticationService
   ) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }

    getAll()  {
        return this.http.get(this.serviceURL+'tercerosContactos' ,{headers: this.headers}).map((res:Response) => res.json());
    }
    getByEmployee(id:number)  {
        return this.http.get(this.serviceURL+'tercerosContactos/buscarTercero/'+id ,{headers: this.headers}).map((res:Response) => res.json() as EmployeesContact[]);
    }

    add(c: EmployeesContact) {
        return this.http.post(this.serviceURL+'tercerosContactos',c ,{headers: this.headers}).map((res:Response) => res.json());
    };

    update(c: EmployeesContact) {
        return this.http.put(this.serviceURL+'tercerosContactos',c ,{headers: this.headers}).map((res:Response) => res);
    }

    get(id: number) {
        return this.http.get(this.serviceURL+'tercerosContactos/'+ id ,{headers: this.headers}).map((res:Response) => res.json() as EmployeesContact);
    }

}
