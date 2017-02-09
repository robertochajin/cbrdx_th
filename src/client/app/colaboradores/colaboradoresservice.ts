/**
 * Created by TracesMaker on 06/02/2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Colaborador } from './colaboradores';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import any = jasmine.any;

@Injectable()
export class ColaboradoresService {

    constructor(private http: Http) {}

    getAllColaboradores()  {
        return this.http.get('/api/colaboradores').map((res:Response) => res.json().data);
    }


    addColaborador(c: Colaborador): Promise<Colaborador> {
        return this.http.post('/assets/colaboradores.json')
            .toPromise()
            .then(response => console.log(response.json()));
    }


    getColaborador(id: number) {
        const respuesta =  this.http.get('/api/colaboradores/'+ id);
        const mapeada = respuesta.map((res:Response) => res.json().data as Colaborador)
        return mapeada;
    }


// getColaborador(id: number): Promise<Colaborador> {
//         return this.http.get('/assets/colaboradores.json')
//             .toPromise()
//             .then(response => response.json().data[id] as Colaborador});
//     }

}
