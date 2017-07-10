import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { DocumentoTercero } from '../_models/documentDownload';
import { DocumentoRelacionTercero } from '../_models/DocumentoRelacionTercero';

@Injectable()
export class DocumentsDownloadService {
   private serviceURL = '<%= SVC_TH_URL %>/api/documentosTerceros/';
   private downloadFileServiceURL = '<%= SVC_TH_URL %>/api/adjuntos/file/';
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

   getAllDescargaByTercero( id: number ) {
      return this.authHttp.get( this.relacionServiceURL + 'tercero/' + id )
      .map( ( res: Response ) => res.json() as DocumentoRelacionTercero[] );
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as DocumentoTercero[] );
   }

   getFile( id: number ) {
      return this.authHttp.get( this.downloadFileServiceURL + id ).map( ( res: Response ) => res.text() );
   }

   add( d: DocumentoRelacionTercero ) {
      return this.authHttp.post( this.relacionServiceURL, d ).map( ( res: Response ) => res.json() );
   }
}