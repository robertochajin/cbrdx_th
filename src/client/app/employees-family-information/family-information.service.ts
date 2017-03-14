import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConstructorFamilyInformation } from './family-information.construct';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { API_URL } from '../global';

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
        return this.http.post(API_URL +'/terceroFamily',f).map((res:Response) => res.json());
    };

    update(f: ConstructorFamilyInformation) {
        return this.http.put(API_URL +'/terceroFamily/',f).map((res:Response) => res.json());
    }

    get(id: number) {
      //return this.http.get('http://40.71.92.147:8445/Vfamily/'+ id)
      return this.http.get(API_URL +'/terceroFamily/'+ id)
        .map((res:Response) => res.json() as ConstructorFamilyInformation);
    }

    delete(f: ConstructorFamilyInformation) {
        return this.http.delete(API_URL +'/terceroFamily/'+ f.idFamiliar).map((res:Response) => res.json());
    }

    getDocumentType()  {
        //return this.http.get(API_URL +'/documenttype')
        return this.http.get('http://40.71.92.147:8445/documenttype')
          .map((res:Response) => res.json());
    }

    getRelationship()  {
        //return this.http.get(API_URL +'/relationship')
        return this.http.get('http://40.71.92.147:8445/relationtypes')
          .map((res:Response) => res.json());
    }

}
