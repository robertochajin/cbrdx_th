/**
 * Created by Angel on 10/02/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {FamilyInformation} from './family-information';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
//import any = jasmine.any;

@Injectable()
export class FamilyInformationService {

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get('/api/employees-family-information').map((res:Response) => res.json().data);
    }

    add(f: FamilyInformation) {
        return this.http.post('/api/employees-family-information',f).map((res:Response) => res.json());
    };

    update(f: FamilyInformation) {
        return this.http.put('/api/employees-family-information/'+ f.idFamiliar,f).map((res:Response) => res.json());
    }

    get(id: number) {
        const respuesta =  this.http.get('/api/employees-family-information/'+ id);
        return respuesta.map((res:Response) => res.json().data as FamilyInformation)
    }

    delete(f: FamilyInformation) {
        const respuesta =  this.http.delete('/api/colaboradores/'+ f.idFamiliar);
        return respuesta.map((res:Response) => res.json());
    }

}
