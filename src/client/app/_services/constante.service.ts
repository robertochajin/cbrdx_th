import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { VConstante } from "../_models/vConstante";
import { Constante } from "../_models/constante";
import "rxjs/add/operator/toPromise";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class ConstanteService {
   
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   listConstants() {
      return this.authHttp.get( this.serviceURL + "constantes/" ).map( ( res: Response ) => res.json() as VConstante[] );
   }
   
   addConstant( c: Constante ): Promise<Constante> {
      return this.authHttp.post( this.serviceURL + "constantes/", JSON.stringify( c ) ).toPromise().then( res => res.json() as Constante ).catch( this.handleError );
   };
   
   updateConstant( c: Constante ): Promise<any> {
      return this.authHttp.put( this.serviceURL + "constantes/", JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }
   
   viewConstant( id: number ) {
      return this.authHttp.get( this.serviceURL + "constantes/" + id ).map( res => res.json() as Constante );
   }
   
   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
