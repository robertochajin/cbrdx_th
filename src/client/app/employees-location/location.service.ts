/**
 * Created by Angel on 10/02/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {EmployeesLocation} from './employees-location';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationService {

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get('/api/employees-location').map((res:Response) => res.json().data);
    }

    getAllCities(qr)  {
        return this.http.get('/api/cities/s/'+ qr).map((res:Response) => res.json().data);
    }

    add(f: EmployeesLocation) {
        return this.http.post('/api/employees-location',f).map((res:Response) => res.json());
    };

    update(f: EmployeesLocation) {
        return this.http.put('/api/employees-location/'+ f.idFamiliar,f).map((res:Response) => res.json());
    }

    get(id: number) {
        const respuesta =  this.http.get('/api/employees-location/'+ id);
        return respuesta.map((res:Response) => res.json().data as Location)
    }

    delete(f: EmployeesLocation) {
        const respuesta =  this.http.delete('/api/colaboradores/'+ f.idFamiliar);
        return respuesta.map((res:Response) => res.json());
    }

}
