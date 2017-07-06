import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Questionnaries } from '../_models/questionnaries';

@Injectable()
export class QuestionnairesService {

   private masterService = '<%= SVC_TH_URL %>/api/cuestionarios/';

   constructor( private authHttp: AuthHttp ) {

   }

   add( f: Questionnaries ) {
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: Questionnaries ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + '/' + id )
      .map( ( res: Response ) => res.json() as Questionnaries );
   }

   getAll() {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as Questionnaries[] );
   }

   getAllEnabled() {
      return this.authHttp.get( this.masterService + 'enabled/' )
      .map( ( res: Response ) => res.json() as Questionnaries[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

