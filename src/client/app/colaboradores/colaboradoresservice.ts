/**
 * Created by TracesMaker on 06/02/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Colaborador } from './colaboradores';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


import 'rxjs/add/operator/toPromise';
import any = jasmine.any;

@Injectable()
export class ColaboradoresService {

    constructor(private http: Http) {}
     private  subject = new Subject<any>;


    getAllColaboradores()  {
       //return this.http.get('/api/colaboradores').map((response: Response) => response.json());
        return this.http.get('/api/colaboradores').map((res:Response) => res.json().data);
    }


    addColaborador(c: Colaborador) {
        return this.http.post('/api/colaboradores',c).map((res:Response) => res.json().data);
    };


    getColaborador(id: number): Promise<Colaborador> {
        return this.http.get('/assets/colaboradores.json')
            .toPromise()
            .then(response => response.json().data[id] as Colaborador});
    }

}
