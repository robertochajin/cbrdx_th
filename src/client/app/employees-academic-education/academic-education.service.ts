/**
 * Created by Angel on 15/02/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Noformalstudies} from './no-formal-studies';
import {Formalstudies} from './formal-studies';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AcademicEducationService {

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get('/api/formalstudies').map((res:Response) => res.json().data);
    }

    add(f: Formalstudies) {
        return this.http.post('/api/formalstudies',f).map((res:Response) => res.json());
    };

    update(f: Formalstudies) {
        return this.http.put('/api/formalstudies/'+ f.idEstudio,f).map((res:Response) => res.json());
    }

    get(id: number) {
        const respuesta =  this.http.get('/api/formalstudies/'+ id);
        return respuesta.map((res:Response) => res.json().data as Formalstudies)
    }

    delete(f: Formalstudies) {
        const respuesta =  this.http.delete('/api/formalstudies/'+ f.idEstudio);
        return respuesta.map((res:Response) => res.json());
    }

}
