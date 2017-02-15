/**
 * Created by Angel on 14/02/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {References} from './references';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ReferencesService {

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get('/api/references').map((res:Response) => res.json().data);
    }

    add(f: References) {
        return this.http.post('/api/references',f).map((res:Response) => res.json());
    };

    update(f: References) {
        return this.http.put('/api/references/'+ f.idReferencia,f).map((res:Response) => res.json());
    }

    get(id: number) {
        const respuesta =  this.http.get('/api/references/'+ id);
        return respuesta.map((res:Response) => res.json().data as References)
    }

    delete(f: References) {
        const respuesta =  this.http.delete('/api/references/'+ f.idReferencia);
        return respuesta.map((res:Response) => res.json());
    }

}
