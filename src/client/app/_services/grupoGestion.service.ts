import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { GruposGestion } from "../_models/gruposGestion";
import "rxjs/add/operator/toPromise";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class GruposGestionService {
   
   private serviceURL = '<%= SVC_TH_URL %>/api/gruposGestion/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   listGruposGestion() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as GruposGestion[] );
   }
   
   listAvaliableGruposGestion( c: number ) {
      return this.authHttp.get( this.serviceURL + "usuario/" + c ).map( ( res: Response ) => res.json() as GruposGestion[] );
   }
   
   addGruposGestion( g: GruposGestion ): Promise<GruposGestion> {
      if ( g.fechaInicio != null ) {
         g.fechaInicio.setHours( 23 );
         g.fechaFin.setHours( 23 );
      }
      return this.authHttp.post( this.serviceURL, JSON.stringify( g ) ).toPromise().then( res => res.json() as GruposGestion ).catch( this.handleError );
   };
   
   updateGruposGestion( g: GruposGestion ): Promise<any> {
      if ( g.fechaInicio != null ) {
         g.fechaInicio.setHours( 23 );
         g.fechaFin.setHours( 23 );
      }
      return this.authHttp.put( this.serviceURL, JSON.stringify( g ) ).toPromise().catch( this.handleError );
   }
   
   viewGruposGestion( id: number ) {
      return this.authHttp.get( this.serviceURL + id ).map( res => res.json() as GruposGestion );
   }
   
   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
