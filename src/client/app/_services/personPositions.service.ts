import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { PersonPositions } from "../_models/personPositions";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class PersonPositionsServices {

   private masterService = '<%= SVC_TH_URL %>/api/tercerosCargos/';
   private detailService = '<%= SVC_TH_URL %>/api/tercerosCargos/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAllEnabled() {
      return this.authHttp.get( this.masterService + 'enabled/').map( ( res: Response ) => res.json() as PersonPositions[] );
   }

   getAllByOrganizationalStructure( idOrganizationalStructure: number ) {
      return this.authHttp.get( this.masterService + 'buscarEstructura/' + idOrganizationalStructure).map( ( res: Response ) => res.json() as PersonPositions[] );
   }

   add( f: PersonPositions ) {
      return this.authHttp.post( this.masterService, f)
         .map( ( res: Response ) => res.json() );
   };

   update( f: PersonPositions ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f )).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id)
         .map( ( res: Response ) => res.json() as PersonPositions );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }


}

