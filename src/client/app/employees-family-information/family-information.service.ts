import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ConstructorFamilyInformation } from './family-information.construct';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
//import {API_URL, API_URL_D} from '../global';

@Injectable()
export class FamilyInformationService {

    private serviceURL = '<%= SVC_TH_URL %>/terceroFamily/';
    private serviceURLEmployee = '<%= SVC_TH_URL %>/terceroFamily/';
    private serviceURLDocumenttype = '<%= SVC_TH_URL %>/documenttype/';
    private serviceURLRelationtypes = '<%= SVC_TH_URL %>/relationtypes/';

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get(this.serviceURL).map((res:Response) => res.json() as ConstructorFamilyInformation[]);
    }

    getAllByEmployee(id: number) {
      return this.http.get(this.serviceURLEmployee + '/habilitated/' + id)
        .map((res:Response) => res.json());
    }

    add(f: ConstructorFamilyInformation) {
      console.info(f);
        return this.http.post(this.serviceURL,f).map((res:Response) => res.json());
    };

    update(f: ConstructorFamilyInformation) {
      console.info(f);
        return this.http.put(this.serviceURL,f).map((res:Response) => res);
    }

    get(id: number) {
      return this.http.get(this.serviceURL+ id)
        .map((res:Response) => res.json() as ConstructorFamilyInformation);
    }

    delete(f: ConstructorFamilyInformation) {
        return this.http.put(this.serviceURL +'/delete', {idTerceroFamiliar: f.idTerceroFamiliar}).map((res:Response) => res);
    }

    getDocumentType()  {
        return this.http.get(this.serviceURLDocumenttype)
          .map((res:Response) => res.json());
    }

    getRelationship()  {
        return this.http.get(this.serviceURLRelationtypes)
          .map((res:Response) => res.json());
    }

}
