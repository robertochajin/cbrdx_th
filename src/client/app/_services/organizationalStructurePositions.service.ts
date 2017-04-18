import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Rx";
import {OrganizationalStructurePositions} from "../_models/organizationalStructurePositions";

@Injectable()
export class OrganizationalStructurePositionsServices {

   public headers = new Headers({'Content-Type': 'application/json'});
   private masterService = '<%= SVC_TH_URL %>/api/sedesAreasCargos/';
   private detailService = '<%= SVC_TH_URL %>/api/sedesAreasCargos/';

   constructor(private http: Http, private authenticationService: AuthenticationService) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }

   getAllEnabled(): Observable<OrganizationalStructurePositions[]> {
      return this.http.get(this.masterService + 'enabled/').map((res: Response) => res.json() as OrganizationalStructurePositions[]);
   }

   add(f: OrganizationalStructurePositions) {
      return this.http.post(this.masterService, f, {headers: this.headers})
         .map((res: Response) => res.json());
   };

   update(f: OrganizationalStructurePositions) {
      return this.http.put(this.masterService, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
   }

   get(id: number) {
      return this.http.get(this.masterService + 'buscarId/' + id)
         .map((res: Response) => res.json() as OrganizationalStructurePositions);
   }

   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }

}

