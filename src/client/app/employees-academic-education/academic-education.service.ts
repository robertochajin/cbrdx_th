
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Noformalstudies} from './no-formal-studies';
import {Formalstudies} from './formal-studies';
import {Noformalstudies} from './no-formal-studies';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AcademicEducationService {

    constructor(private http: Http) {}

    getAllFormal()  {
        return this.http.get('/api/formalstudies').map((res:Response) => res.json().data);
    }

    addFormal(f: Formalstudies) {
        return this.http.post('/api/formalstudies',f).map((res:Response) => res.json());
    };

    updateFormal(f: Formalstudies) {
        return this.http.put('/api/formalstudies/'+ f.idEstudio,f).map((res:Response) => res.json());
    }

    getFormal(id: number) {
        const respuesta =  this.http.get('/api/formalstudies/'+ id);
        return respuesta.map((res:Response) => res.json().data as Formalstudies)
    }

    deleteFormal(f: Formalstudies) {
        const respuesta =  this.http.delete('/api/formalstudies/'+ f.idEstudio);
        return respuesta.map((res:Response) => res.json());
    }

    getAllNoFormal()  {
        return this.http.get('/api/noformalstudies').map((res:Response) => res.json().data);
    }

    addNoFormal(f: Noformalstudies) {
        return this.http.post('/api/noformalstudies',f).map((res:Response) => res.json());
    };

    updateNoFormal(f: Noformalstudies) {
        return this.http.put('/api/noformalstudies/'+ f.idEstudio,f).map((res:Response) => res.json());
    }

    getNoFormal(id: number) {
        const respuesta =  this.http.get('/api/noformalstudies/'+ id);
        return respuesta.map((res:Response) => res.json().data as Noformalstudies)
    }

    deleteNoFormal(f: Noformalstudies) {
        const respuesta =  this.http.delete('/api/noformalstudies/'+ f.idEstudio);
        return respuesta.map((res:Response) => res.json());
    }

}
