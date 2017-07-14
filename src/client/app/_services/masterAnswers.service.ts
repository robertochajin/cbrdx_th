import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Answers } from '../_models/answers';
import { MasterAnswers } from '../_models/masterAnswers';

@Injectable()
export class MasterAnswersService {

   private masterService = '<%= SVC_TH_URL %>/api/';
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;
   private idUsuario: number;

   constructor( private authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
      }
   }

   getAll() {
      return this.authHttp.get( this.masterService + 'maestrosRespuestas' )
      .map( ( res: Response ) => res.json() as MasterAnswers[] );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'maestrosRespuestas/' + id )
      .map( ( res: Response ) => res.json() as MasterAnswers );
   }

   getByTerceroPublicacion( id: number ) {
      return this.authHttp.get( this.masterService + 'maestrosRespuestas/terceroPublicacion/' + id )
      .map( ( res: Response ) => res.json() as MasterAnswers[] );
   }

   add( f: MasterAnswers ) {
      f.idUsuario = this.idUsuario;
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService + 'maestrosRespuestas', f )
      .map( ( res: Response ) => res.json() as MasterAnswers );
   };

   update( f: MasterAnswers ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService + 'maestrosRespuestas', JSON.stringify( f ) ).catch( this.handleError );
   }

   getSolutions( id: number ) {
      return this.authHttp.get( this.masterService + 'respuestas' )
      .map( ( res: Response ) => res.json() as Answers[] );
   }

   getSolutionsByMaster( id: number ) {
      return this.authHttp.get( this.masterService + 'respuestas/maestroRespuesta/' + id )
      .map( ( res: Response ) => res.json() as Answers[] );
   }

   getSolution( id: number ) {
      return this.authHttp.get( this.masterService + 'respuestas/' + id )
      .map( ( res: Response ) => res.json() as Answers );
   }

   addSolution( f: Answers ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService + 'respuestas', f )
      .map( ( res: Response ) => res.json() ).catch( this.handleError );
   };

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

