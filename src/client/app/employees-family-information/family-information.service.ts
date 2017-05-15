import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ConstructorFamilyInformation } from './family-information.construct';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class FamilyInformationService {

   private serviceURL = '<%= SVC_TH_URL %>/api/tercerosFamiliares/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as ConstructorFamilyInformation[] );
   }

   getAllByEmployee( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarTercero/' + id ).map( ( res: Response ) => res.json() );
   }

   add( f: ConstructorFamilyInformation ) {
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: ConstructorFamilyInformation ) {
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as ConstructorFamilyInformation );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
