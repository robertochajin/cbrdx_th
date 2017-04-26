import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Rx";
import {CompanyAssets} from "../_models/companyAssets";

@Injectable()
export class CompanyAssetsServices {

   headers = new Headers({'Content-Type': 'application/json'});
   private serviceURL = '<%= SVC_TH_URL %>/api/cargosElementos/';

   constructor(private http: Http,
               private authenticationService: AuthenticationService) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }

   getAll() {
      return this.http.get(this.serviceURL, {headers: this.headers}).map((res: Response) => res.json() as CompanyAssets[]);
   }

   getAllByPosition(id: number): Observable<CompanyAssets[]> {
      return this.http.get(this.serviceURL + 'buscarCargo/'+ id, {headers: this.headers}).map((res: Response) => res.json() as CompanyAssets[]);
   }

   add(f: CompanyAssets) {
      return this.http.post(this.serviceURL, f, {headers: this.headers})
         .map((res: Response) => res.json());
   };

   update(f: CompanyAssets) {
      return this.http.put(this.serviceURL, JSON.stringify(f), {headers: this.headers}).catch(this.handleError);
   }

   get(id: number) {
      return this.http.get(this.serviceURL + 'buscarId/' + id, {headers: this.headers})
         .map((res: Response) => res.json() as CompanyAssets);
   }

   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }

}
