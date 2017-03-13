import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Employee } from './employees';
import { API_URL } from '../global';

@Injectable()
export class EmployeesService {


    //au = API_URL;
    //au = 'http://localhost:8445/';  para cambios rápidos locales
    au = 'http://40.71.92.147:8445/'; //dominio se debe cambiar a negocio.
    headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get(this.au+'employees').map((res:Response) => res.json());
    }

    add(c: Employee) {
        return this.http.post(this.au+'employees',c).map((res:Response) => res.json());
    };

    update(c: Employee) {
        return this.http.put(this.au+'employees/'+ c.idTercero,c).map((res:Response) => res.json());
    }

    get(id: number) {
        return this.http.get(this.au+'employees/'+ id).map((res:Response) => res.json() as Employee);
    }

    delete(c: Employee) {
        const respuesta =  this.http.delete(this.au+'employees/'+ c.idTercero);
        return respuesta.map((res:Response) => res.json());
    }

}
