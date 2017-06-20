import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { CandidateProcess } from '../_models/candidateProcess';
import { CandidateProgress } from '../_models/candidateProgress';

@Injectable()
export class CandidateProcessService {

   private masterService = '<%= SVC_TH_URL %>/api/procesoSeleccion/';
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

   add( f: CandidateProcess ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: CandidateProcess ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getAll() {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as CandidateProcess[] );
   }

   getCandidatesByPublication(idPublication: number) {
      return this.authHttp.get( this.masterService + 'terceroPublicacion/' + idPublication)
      .map( ( res: Response ) => res.json() as CandidateProgress[] );
   }

   get(idCandidateProcess: number) {
      return this.authHttp.get( this.masterService + idCandidateProcess )
      .map( ( res: Response ) => res.json() as CandidateProcess );
   }

   handleError( error: any ): Promise<any> {
      return Promise.reject( error.message || error );
   }

}

