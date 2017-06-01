import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { RequirementQuestionnaires } from '../_models/requirementQuestionnaires';

@Injectable()
export class RequirementQuestionnairesService {

   private masterService = '<%= SVC_TH_URL %>/api/requerimientosCuestionarios/';

   constructor( private authHttp: AuthHttp ) {

   }

   add( f: RequirementQuestionnaires ) {
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: RequirementQuestionnaires ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getResoursesByIdRequirement( id: number ) {
      return this.authHttp.get( this.masterService + 'requerimiento/' + id )
      .map( ( res: Response ) => res.json() as RequirementQuestionnaires[] );
   }
   getAll() {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as RequirementQuestionnaires[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

