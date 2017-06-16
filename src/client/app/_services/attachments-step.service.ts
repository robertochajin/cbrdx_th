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
   listAttachments(idProcesoPaso: number, idTerceroPublicacion: number) {
      return this.authHttp.get( this.serviceURL + 'procesoSeleccionAdjuntos/terPublicPaso/'+idTerceroPublicacion+'/'+idProcesoPaso )
      .map( ( res: Response ) => res.json() as Attachments[] );
   }


   addAdjunto( r: Attachments ) {
      r.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res.json() );
   };

   downloadFile(id:number){
      return this.authHttp.get( this.serviceURL + 'adjuntos/file/'+id ).map( ( res: Response ) => res.text() );
   }


   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
