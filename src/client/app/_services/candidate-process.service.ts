import { Injectable } from '@angular/core';
import { Response, URLSearchParams, Jsonp, Http } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { CandidateProcess } from '../_models/candidateProcess';
import { CandidateProgress } from '../_models/candidateProgress';

@Injectable()
export class CandidateProcessService {

   private masterService = '<%= SVC_TH_URL %>/api/procesoSeleccion/';
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;
   private idUsuario: number;

   constructor( private authHttp: AuthHttp, private http: Http ) {
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

   getCandidatesByPublication( idPublication: number ) {
      return this.authHttp.get( this.masterService + 'terceroPublicacion/' + idPublication )
      .map( ( res: Response ) => res.json() as CandidateProgress[] );
   }

   get( idCandidateProcess: number ) {
      return this.authHttp.get( this.masterService + idCandidateProcess )
      .map( ( res: Response ) => res.json() as CandidateProcess );
   }

   handleError( error: any ): Promise<any> {
      return Promise.reject( error.message || error );
   }

   generateVerificationCode( obj: any ) {
      let data = new URLSearchParams();
      data.append( 'user', 'CrezcamosAPI' );
      data.append( 'password', 'CrezcamosAPI' );
      data.append( 'destination', obj.destination );
      data.append( 'message', 'Su código de verificación es: ' + obj.codigo );

      return this.http.post( 'https://contactalos.com/services/rs/sendsms.php', data )
      .map( response => <string[]> response.json()[ 1 ] );
   }

}

