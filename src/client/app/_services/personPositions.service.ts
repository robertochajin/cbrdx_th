import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {PersonPositions} from "../_models/personPositions";

@Injectable()
export class PersonPositionsServices {

   public headers = new Headers({'Content-Type': 'application/json'});
   private masterService = '<%= SVC_TH_URL %>/api/tercerosCargos/';
   private detailService = '<%= SVC_TH_URL %>/api/tercerosCargos/';

   constructor(private http: Http, private authenticationService: AuthenticationService) {
      this.headers = new Headers({
         'Content-Type': 'application/json',
         'Authorization': this.authenticationService.token
      });
   }

   getAllEnabled() {
      return this.http.get(this.masterService + 'enabled/').map((res: Response) => res.json() as PersonPositions[]);
   }

   getAllByOrganizationalStructure(idOrganizationalStructure: number) {
      return this.http.get(this.masterService + 'buscarEstructura/' + idOrganizationalStructure).map((res: Response) => res.json() as PersonPositions[]);
   }

   add(f: PersonPositions) {
      return this.http.post(this.masterService, f, {headers: this.headers})
         .map((res: Response) => res.json());
   };

   update(f: PersonPositions) {
      return this.http.put(this.masterService, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
   }

   get(id: number) {
      return this.http.get(this.masterService + 'buscarId/' + id)
         .map((res: Response) => res.json() as PersonPositions);
   }

   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }


}

