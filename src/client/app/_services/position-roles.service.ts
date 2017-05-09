import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { PositionRoles } from '../_models/positionRoles';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PositionRolesServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/cargosRolesProcesos/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as PositionRoles[] );
   }

   getAllByPosition( id: number ): Observable<PositionRoles[]> {
      return this.authHttp.get( this.serviceURL + 'buscarCargo/' + id ).map( ( res: Response ) => res.json() as PositionRoles[] );
   }

   add( f: PositionRoles ) {
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: PositionRoles ) {
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as PositionRoles );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
