import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Employee } from './employees';
import { API_URL } from '../global';

@Injectable()
export class EmployeesService {


    public headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get(API_URL+'employees').map((res:Response) => res.json());
    }

    add(c: Employee) {
        return this.http.post(API_URL+'employees',c).map((res:Response) => res.json());
    };

    update(c: Employee) {
        return this.http.put(API_URL+'employees/'+ c.idTercero,c).map((res:Response) => res.json());
    }

    get(id: number) {
        return this.http.get(API_URL+'employees/'+ id).map((res:Response) => res.json() as Employee);
    }

    delete(c: Employee) {
        const respuesta =  this.http.delete(API_URL+'employees/'+ c.idTercero);
        return respuesta.map((res:Response) => res.json());
    }

}
