import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConstructorFamilyInformation } from './family-information.construct';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {API_URL, API_URL_D} from '../global';

@Injectable()
export class FamilyInformationService {

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get(API_URL +'/terceroFamily').map((res:Response) => res.json() as ConstructorFamilyInformation[]);
    }

    getAllByEmployee(id: number) {
      return this.http.get(API_URL + '/terceroFamily/employee/habilitated/' + id)
        .map((res:Response) => res.json());
    }

    add(f: ConstructorFamilyInformation) {
      console.info(f);
        return this.http.post(API_URL +'/terceroFamily',f).map((res:Response) => res.json());
    };

    update(f: ConstructorFamilyInformation) {
      console.info(f);
        return this.http.put(API_URL +'/terceroFamily/',f).map((res:Response) => res);
    }

    get(id: number) {
      return this.http.get(API_URL +'/terceroFamily/'+ id)
        .map((res:Response) => res.json() as ConstructorFamilyInformation);
    }

    delete(f: ConstructorFamilyInformation) {
        return this.http.delete(API_URL +'/terceroFamily/'+ f.idFamiliar).map((res:Response) => res.json());
    }

    getDocumentType()  {
        return this.http.get(API_URL_D+'/documenttype')
          .map((res:Response) => res.json());
    }

    getRelationship()  {
        return this.http.get(API_URL_D+'/relationtypes')
          .map((res:Response) => res.json());
    }

}
