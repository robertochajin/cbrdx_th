import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { FaultsAndSanctions } from '../_models/faultsAndSanctions';

@Injectable()
export class FaultsAndSanctionsService {

    private serviceURL = '<%= SVC_TH_URL %>/api/';
    headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getAll()  {
        return this.http.get(this.serviceURL+'faltas').map((res:Response) => res.json());
    }

    add(c: FaultsAndSanctions) {
        return this.http.post(this.serviceURL+'faltas',c).map((res:Response) => res.json());
    };

    update(c: FaultsAndSanctions) {
        return this.http.put(this.serviceURL+'faltas',c).map((res:Response) => res);
    }

    get(id: number) {
        return this.http.get(this.serviceURL+'faltas/'+ id).map((res:Response) => res.json() as FaultsAndSanctions);
    }
  

}
