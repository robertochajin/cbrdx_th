import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Employee } from './employees';
import {API_URL, API_URL_D} from '../global';

@Injectable()
export class EmployeesService {


    // au = API_URL+'/teceros';
    au = API_URL_D+'/employees'; //dominio se debe cambiar a negocio.

  //au = 'http://192.168.1.54:8445/employees'; //dominio se debe cambiar a negocio.
    headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get(this.au).map((res:Response) => res.json());
    }

    add(c: Employee) {
        return this.http.post(this.au,c).map((res:Response) => res.json());
    };

    update(c: Employee) {
        return this.http.put(this.au+'/'+ c.idTercero,c).map((res:Response) => res.json());
    }

    get(id: number) {
        return this.http.get(this.au+'/'+ id).map((res:Response) => res.json() as Employee);
    }

    getNacionalidad(id: number) {
        return this.http.get(API_URL_D+'/vista/'+ id).map((res:Response) => res.json());
    }

    getCargoActual(id: number) {
        return this.http.get(API_URL+'/tercerosCargos/'+ id).map((res:Response) => res.json());
    }

    delete(c: Employee) {
        const respuesta =  this.http.delete(this.au+'/'+ c.idTercero);
        return respuesta.map((res:Response) => res.json());
    }

}
