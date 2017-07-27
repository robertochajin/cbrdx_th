import { Injectable } from '@angular/core';
import { Response, ResponseContentType } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { DocumentoTercero } from '../_models/documentDownload';
import { DocumentoRelacionTercero } from '../_models/DocumentoRelacionTercero';

@Injectable()
export class EmployeesAttachmentService {
   private serviceURL = '<%= SVC_TH_URL %>/api/documentosTerceros/';
   private downloadFileServiceURL = '<%= SVC_TH_URL %>/api/adjuntos/';
   private relacionServiceURL = '<%= SVC_TH_URL %>/api/tercerosDocumentosTercero/';

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

   getAllDescarga() {
      return this.authHttp.get( this.serviceURL + 'documentosDescarga' )
      .map( ( res: Response ) => res.json() as DocumentoTercero[] );
   }

   getAllAdjuntos() {
      return this.authHttp.get( this.serviceURL + 'documentosAdjunto' )
      .map( ( res: Response ) => res.json() as DocumentoTercero[] );
   }

   getAllDocumentosRelacionTercero() {
      return this.authHttp.get( this.relacionServiceURL ).map( ( res: Response ) => res.json() as DocumentoRelacionTercero[] );
   }

   getDocumentoRelacionTercero( id: number ) {
      return this.authHttp.get( this.relacionServiceURL + 'adjunto/' + id )
      .map( ( res: Response ) => res.json() as DocumentoRelacionTercero );
   }

   addDocumentoRelacionTercero( d: DocumentoRelacionTercero ) {
      d.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.relacionServiceURL, d ).map( ( res: Response ) => res.json() );
   }

   update( d: DocumentoTercero ) {
      d.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, d ).map( ( res: Response ) => res );
   }

   updateDocumentoRelacionTercero( d: DocumentoRelacionTercero ) {
      d.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.relacionServiceURL, d ).map( ( res: Response ) => res );
   }

   handleError( error: any ): Promise<any> {
      return Promise.reject( error.message || error );
   }
}