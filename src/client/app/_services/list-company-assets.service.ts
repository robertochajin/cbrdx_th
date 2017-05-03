import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class CompanyAssetsTypesServices {
   
   private serviceURL = '<%= SVC_TH_URL %>/api/listasTiposElementos/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   getAllEnabled() {
      return this.authHttp.get( this.serviceURL + "enabled" ).map( ( res: Response ) => res.json() );
   }
   
}
