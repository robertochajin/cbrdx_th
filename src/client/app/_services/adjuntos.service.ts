import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Adjunto } from '../_models/adjuntos';

@Injectable()
export class AdjuntosService {

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

   downloadFile(id:number){
      return this.authHttp.get( this.serviceURL + 'adjuntos/file/'+id ).map( ( res: Response ) => res.text() );
   }

   getFileName(id:number){
      return this.authHttp.get( this.serviceURL + 'adjuntos/'+id ).map( ( res: Response ) => res.json() as Adjunto );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
