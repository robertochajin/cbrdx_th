import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {EmployeesContact} from '../_models/employeesContactList';

@Injectable()
export class EmployeesContactService {
  
    private serviceURL = '<%= SVC_TH_URL %>/api/';
    headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get(this.serviceURL+'tercerosContactos').map((res:Response) => res.json());
    }
    getByEmployee(id:number)  {
        return this.http.get(this.serviceURL+'tercerosContactos/buscarTercero/'+id).map((res:Response) => res.json() as EmployeesContact[]);
    }

    add(c: EmployeesContact) {
        return this.http.post(this.serviceURL+'tercerosContactos',c).map((res:Response) => res.json());
    };

    update(c: EmployeesContact) {
        return this.http.put(this.serviceURL+'tercerosContactos',c).map((res:Response) => res);
    }

    get(id: number) {
        return this.http.get(this.serviceURL+'tercerosContactos/'+ id).map((res:Response) => res.json() as EmployeesContact);
    }

}
