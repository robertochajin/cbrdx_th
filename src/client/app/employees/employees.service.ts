/**
 * Created by TracesMaker on 06/02/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Employee } from './employees';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


import 'rxjs/add/operator/toPromise';
import any = jasmine.any;

@Injectable()
export class EmployeesService {

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get('/api/employees').map((res:Response) => res.json().data);
    }

    add(c: Employee) {
        return this.http.post('/api/employees',c).map((res:Response) => res.json());
    };

    update(c: Employee) {
        return this.http.put('/api/employees/'+ c.idColaborador,c).map((res:Response) => res.json());
    }

    get(id: number) {
        const respuesta =  this.http.get('/api/employees/'+ id);
        return respuesta.map((res:Response) => res.json().data as Employee)
    }

    delete(c: Employee) {
        const respuesta =  this.http.delete('/api/employees/'+ c.idColaborador);
        return respuesta.map((res:Response) => res.json());
    }

}
