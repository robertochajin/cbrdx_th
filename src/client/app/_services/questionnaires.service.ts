import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Questionnaries } from '../_models/questionnaries';
import { QuestionnariesQuestions } from '../_models/questionnariesQuestions';

@Injectable()
export class QuestionnairesService {

   private masterService = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {

   }

   add( f: Questionnaries ) {
      return this.authHttp.post( this.masterService + 'cuestionarios', f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: Questionnaries ) {
      return this.authHttp.put( this.masterService + 'cuestionarios', JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'cuestionarios/' + id )
      .map( ( res: Response ) => res.json() as Questionnaries );
   }

   getAll() {
      return this.authHttp.get( this.masterService + 'cuestionarios' )
      .map( ( res: Response ) => res.json() as Questionnaries[] );
   }

   getAllEnabled() {
      return this.authHttp.get( this.masterService + 'cuestionarios/enabled/' )
      .map( ( res: Response ) => res.json() as Questionnaries[] );
   }

   getQuestion( id: number ) {
      return this.authHttp.get( this.masterService + 'preguntas/cuestionario/' + id )
      .map( ( res: Response ) => res.json() as QuestionnariesQuestions );
   }

   getQuestions( id: number ) {
      return this.authHttp.get( this.masterService + 'preguntas/cuestionario/' + id )
      .map( ( res: Response ) => res.json() as QuestionnariesQuestions[] );
   }

   addQuestions( f: QuestionnariesQuestions ) {
      return this.authHttp.post( this.masterService + 'cuestionarios', f )
      .map( ( res: Response ) => res.json() );
   };

   updateQuestions( f: QuestionnariesQuestions ) {
      return this.authHttp.put( this.masterService + 'cuestionarios', JSON.stringify( f ) ).catch( this.handleError );
   }

   getAnswers( id: number ) {
      return this.authHttp.get( this.masterService + 'respuestas/pregunta/' + id )
      .map( ( res: Response ) => res.json() as QuestionnariesQuestions[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

