import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { DocumentDownload } from '../_models/documentDownload';

@Injectable()
export class DocumentsDownloadService {
   private serviceURL = '<%= SVC_TH_URL %>/api/documentosTerceros/';
   private downloadFileServiceURL = '<%= SVC_TH_URL %>/api/adjuntos/file/';

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
      return this.authHttp.get( this.serviceURL + 'documentosDescarga/' + id ).map( ( res: Response ) => res.json() as DocumentDownload[] );
   }

   getAllCargaByTercero( id: number ) {
      return this.authHttp.get( this.serviceURL + 'documentosAdjunto/' + id ).map( ( res: Response ) => res.json() as DocumentDownload[] );
   }

   getFile( id: number ) {
      return this.authHttp.get( this.downloadFileServiceURL + id ).map( ( res: Response ) => res.text() );
   }
}