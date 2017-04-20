import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {ContractTypes} from "../_models/contractTypes";
import {Observable} from "rxjs";

@Injectable()
export class ContractTypesServices {

   public headers = new Headers({'Content-Type': 'application/json'});
   private masterService = '<%= SVC_TH_URL %>/api/listasTiposContratos/';
   private detailService = '<%= SVC_TH_URL %>/api/listasTiposContratos/';

   constructor(private http: Http, private authenticationService: AuthenticationService) {
      this.headers = new Headers({
         'Content-Type': 'application/json',
         'Authorization': this.authenticationService.token
      });
   }

   getAllEnabled() : Observable<ContractTypes[]> {
      return this.http.get(this.masterService + 'enabled/').map((res: Response) => res.json() as ContractTypes[]);
   }

   add(f: ContractTypes) {
      return this.http.post(this.masterService, f, {headers: this.headers})
         .map((res: Response) => res.json());
   };

   update(f: ContractTypes) {
      return this.http.put(this.masterService, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
   }

   get(id: number) {
      return this.http.get(this.masterService + 'buscarId/' + id)
         .map((res: Response) => res.json() as ContractTypes);
   }

   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }


}

