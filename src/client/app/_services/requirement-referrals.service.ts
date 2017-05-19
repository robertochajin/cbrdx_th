import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { RequirementReferral } from '../_models/requirementReferral';

@Injectable()
export class RequirementReferralsServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/requerimientosReferidos/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as RequirementReferral[] );
   }

   add( f: RequirementReferral ) {
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: RequirementReferral ) {
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as RequirementReferral );
   }
   getByIdRequirement( id: number ) {
      return this.authHttp.get( this.serviceURL + 'requerimiento/' + id )
      .map( ( res: Response ) => res.json() as RequirementReferral[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
