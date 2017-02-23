import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConstructorEmployeesLocation } from './employees-location.constructor';

@Injectable()
export class LocationService {

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get('/api/employees-employeeLocation')
            .map((res:Response) => res.json().data);
    }

    getAllCities(qr: any)  {
        return this.http.get('/api/cities/s/'+ qr).map((res:Response) => res.json().data);
    }

    add(f: ConstructorEmployeesLocation) {
        return this.http.post('/api/employees-employeeLocation',f).map((res:Response) => res.json());
    };

    update(f: ConstructorEmployeesLocation) {
        return this.http.put('/api/employees-employeeLocation/'+ 'AGREGARELID',f).map((res:Response) => res.json());
    }

    get(id: number) {
        return this.http.get('/api/employees-employeeLocation/'+ id)
               .map((res:Response) => res.json().data as ConstructorEmployeesLocation);
    }

    delete(f: ConstructorEmployeesLocation) {
        const respuesta =  this.http.delete('/api/employees-location/'+ 'AGREGARELID');
        return respuesta.map((res:Response) => res.json());
    }

}
