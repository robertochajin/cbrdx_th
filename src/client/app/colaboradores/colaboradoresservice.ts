/**
 * Created by TracesMaker on 06/02/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Colaborador } from './colaboradores';


@Injectable()
export class ColaboradoresService {

    constructor(private http: Http) {}

    getColaboradoresMedium() {
        return this.http.get('/assets/colaboradores.json')
            .toPromise()
            .then(res => <Colaborador[]> res.json().data)
            .then(data => { return data; });
    }
}
