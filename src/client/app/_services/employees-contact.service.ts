import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {EmployeesContact} from '../_models/employeesContactList';

@Injectable()
export class EmployeesContactService {
  
    private serviceURL = '<%= SVC_TH_URL %>/api/';
    headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get(this.serviceURL+'vterceros').map((res:Response) => res.json());
    }
    getByEmployee(id:number)  {
        return this.http.get(this.serviceURL+'vterceros/buscarTerceros/'+id+"/").map((res:Response) => res.json() as EmployeesContact[]);
    }

    add(c: EmployeesContact) {
        return this.http.post(this.serviceURL+'terceros',c).map((res:Response) => res.json());
    };

    update(c: EmployeesContact) {
        return this.http.put(this.serviceURL+'terceros',c).map((res:Response) => res);
    }

    get(id: number) {
        return this.http.get(this.serviceURL+'vterceros/'+ id).map((res:Response) => res.json() as EmployeesContact);
    }

    delete(c: EmployeesContact) {
        const respuesta =  this.http.delete(this.serviceURL+'/'+ c.idTercero);
        return respuesta.map((res:Response) => res.json());
    }

}
