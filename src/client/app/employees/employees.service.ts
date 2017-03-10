import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Employee } from './employees';

@Injectable()
export class EmployeesService {


    public headers = new Headers({'Content-Type': 'application/json'});
    private ep = 'http://localhost:8080/'; //employeesServiceEndPoint

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get(this.ep+'employees').map((res:Response) => res.json());
    }

    add(c: Employee) {
        return this.http.post(this.ep+'employees',c).map((res:Response) => res.json());
    };

    update(c: Employee) {
        return this.http.put(this.ep+'employees/'+ c.idTercero,c).map((res:Response) => res.json());
    }

    get(id: number) {
        const respuesta =  this.http.get(this.ep+'employees/'+ id);
        let r = respuesta.map((res:Response) => res.json() as Employee);
        return r;
    }

    delete(c: Employee) {
        const respuesta =  this.http.delete(this.ep+'employees/'+ c.idTercero);
        return respuesta.map((res:Response) => res.json());
    }

}
