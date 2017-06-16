import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Attachments } from '../_models/attachments-step';

@Injectable()
export class AttachmentsService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
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

   listAdjuntos() {
      return this.authHttp.get( this.serviceURL + 'constantes/' ).map( ( res: Response ) => res.json() as Attachments[] );
   }


   addAdjunto( r: Attachments ) {
      r.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res.json() );
   };

   // updateConstant( c: Adjunto ): Promise<any> {
   //    c.auditoriaUsuario = this.idUsuario;
   //    return this.authHttp.put( this.serviceURL + 'constantes/', JSON.stringify( c ) ).toPromise().catch( this.handleError );
   // }
   //
   // viewConstant( id: number ) {
   //    return this.authHttp.get( this.serviceURL + 'constantes/' + id ).map( res => res.json() as Adjunto );
   // }
   //
   // getByCode( code: string ) {
   //    return this.authHttp.get( this.serviceURL + 'constantes/codigo/' + code ).map( res => res.json() as Adjunto );
   // }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
