import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Questionnaires } from '../_models/questionnaires';

@Injectable()
export class QuestionnairesService {

   private masterService = '<%= SVC_TH_URL %>/api/requerimientosCuestionarios/';

   constructor( private authHttp: AuthHttp ) {

   }

   add( f: Questionnaires ) {
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: Questionnaires ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getResoursesByIdRequirement( id: number ) {
      return this.authHttp.get( this.masterService + 'requerimiento/' + id )
      .map( ( res: Response ) => res.json() as Questionnaires[] );
   }
   getAll() {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as Questionnaires[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

