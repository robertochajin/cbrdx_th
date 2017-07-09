import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Questionnaries } from '../_models/questionnaries';
import { QuestionnariesQuestions } from '../_models/questionnariesQuestions';
import { QuestionnariesAnswers } from '../_models/questionnariesAnswers';

@Injectable()
export class QuestionnairesService {

   private masterService = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {

   }

   getAll() {
      return this.authHttp.get( this.masterService + 'cuestionarios' )
      .map( ( res: Response ) => res.json() as Questionnaries[] );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'cuestionarios/' + id )
      .map( ( res: Response ) => res.json() as Questionnaries );
   }

   add( f: Questionnaries ) {
      return this.authHttp.post( this.masterService + 'cuestionarios', f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: Questionnaries ) {
      return this.authHttp.put( this.masterService + 'cuestionarios', JSON.stringify( f ) ).catch( this.handleError );
   }

   getAllEnabled() {
      return this.authHttp.get( this.masterService + 'cuestionarios/enabled/' )
      .map( ( res: Response ) => res.json() as Questionnaries[] );
   }

   getQuestions( id: number ) {
      return this.authHttp.get( this.masterService + 'cuestionariosPreguntas/buscarCuestionario/' + id )
      .map( ( res: Response ) => res.json() as QuestionnariesQuestions[] );
   }

   getQuestion( id: number ) {
      return this.authHttp.get( this.masterService + 'cuestionariosPreguntas/' + id )
      .map( ( res: Response ) => res.json() as QuestionnariesQuestions );
   }

   addQuestion( f: QuestionnariesQuestions ) {
      return this.authHttp.post( this.masterService + 'cuestionariosPreguntas', f )
      .map( ( res: Response ) => res.json() );
   };

   updateQuestion( f: QuestionnariesQuestions ) {
      return this.authHttp.put( this.masterService + 'cuestionariosPreguntas', JSON.stringify( f ) ).catch( this.handleError );
   }

   getAnswers( id: number ) {
      return this.authHttp.get( this.masterService + 'preguntasOpciones/buscarPregunta/' + id )
      .map( ( res: Response ) => res.json() as QuestionnariesAnswers[] );
   }

   getAnswer( id: number ) {
      return this.authHttp.get( this.masterService + 'preguntasOpciones/' + id )
      .map( ( res: Response ) => res.json() as QuestionnariesAnswers[] );
   }

   addAnswer( f: QuestionnariesAnswers ) {
      return this.authHttp.post( this.masterService + 'preguntasOpciones', f )
      .map( ( res: Response ) => res.json() );
   };

   updateAnswer( f: QuestionnariesAnswers ) {
      return this.authHttp.put( this.masterService + 'preguntasOpciones', JSON.stringify( f ) ).catch( this.handleError );
   }

   addSolution( f: QuestionnariesAnswers ) {
      return this.authHttp.post( this.masterService + 'respuestas', f )
      .map( ( res: Response ) => res.json() );
   };

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

