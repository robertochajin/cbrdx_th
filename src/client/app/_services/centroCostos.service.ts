import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { CentroCostos } from "../_models/centroCostos";
import "rxjs/add/operator/toPromise";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class CentroCostosService {
   
   private serviceURL = '<%= SVC_TH_URL %>/api/centrosCostos/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   listCentroCostos() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as CentroCostos[] );
   }
   
   addCentroCostos( c: CentroCostos ): Promise<CentroCostos> {
      return this.authHttp.post( this.serviceURL, JSON.stringify( c ) ).toPromise().then( res => res.json() as CentroCostos ).catch( this.handleError );
   };
   
   updateCentroCostos( c: CentroCostos ): Promise<any> {
      return this.authHttp.put( this.serviceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }
   
   viewCentroCostos( id: number ) {
      return this.authHttp.get( this.serviceURL + id ).map( res => res.json() as CentroCostos );
   }
   
   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
