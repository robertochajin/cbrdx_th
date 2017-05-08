import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Observable } from "rxjs";
import { RolWidgets } from "../_models/rolWidgets";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class RolWidgetsServices {
   
   private serviceURL = '<%= SVC_TH_URL %>/api/rolesWidgets/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as RolWidgets[] );
   }
   
   getAllByRol( id: number ): Observable<RolWidgets[]> {
      return this.authHttp.get( this.serviceURL + 'buscarRol/' + id ).map( ( res: Response ) => res.json() as RolWidgets[] );
   }
   
   add( f: RolWidgets ) {
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };
   
   update( f: RolWidgets ) {
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }
   
   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as RolWidgets );
   }
   
   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
   
}
