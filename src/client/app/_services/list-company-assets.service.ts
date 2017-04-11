import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class CompanyAssetsTypesServices {

   public headers = new Headers({'Content-Type': 'application/json'});

   private serviceURL = '<%= SVC_TH_URL %>/api/listasTiposElementos/';

   constructor(private http: Http,
               private authenticationService: AuthenticationService
   ) {
      this.headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.authenticationService.token});
   }

   getAllEnabled()  {
      return this.http.get(this.serviceURL + "enabled",{headers: this.headers}).map((res:Response) => res.json());
   }

}
