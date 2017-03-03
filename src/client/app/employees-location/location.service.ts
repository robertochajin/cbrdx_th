import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EmployeesLocation } from './employees-location';

@Injectable()
export class LocationService {

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get('/api/employees-location')
            .map((res:Response) => res.json().data);
    }

    getPrincipalNomenclatureList() {
        return this.http.get('/api/principal-nomenclature')
            .map((res:Response) => res.json().data);
    }

    getComplementaryNomenclatureList() {
        return this.http.get('/api/complementary-nomenclature')
            .map((res:Response) => res.json().data);
    }

    getAddressTypeList() {
        return this.http.get('/api/address-types')
            .map((res:Response) => res.json().data);
    }

    getAllCities(qr: any)  {
        return this.http.get('/api/cities/s/'+ qr).map((res:Response) => res.json().data);
    }

    add(f: EmployeesLocation) {
        return this.http.post('/api/employees-location',f).map((res:Response) => res.json());
    };

    update(f: EmployeesLocation) {
        return this.http.put('/api/employees-location/'+ f.idUbicacion,f).map((res:Response) => res.json());
    }

    get(id: number) {
        return this.http.get('/api/employees-location/'+ id)
               .map((res:Response) => res.json().data as EmployeesLocation);
    }

    delete(f: EmployeesLocation) {
        const respuesta =  this.http.delete('/api/employees-location/'+ f.idUbicacion);
        return respuesta.map((res:Response) => res.json());
    }

}
