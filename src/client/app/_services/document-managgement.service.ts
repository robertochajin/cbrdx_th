import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { DocumentManagement } from '../_models/document-management';

@Injectable()
export class DocumentManagementService {

   serviceURL = '<%= SVC_TH_URL %>/api/documentosTerceros';
   headers = new Headers( { 'Content-Type': 'application/json' } );
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
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() );
   }

   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + '/' + id ).map( ( res: Response ) => res.json() as DocumentManagement );
   }

   // getByIdDocEmpl( id: number ) {
   //    return this.authHttp.get( this.serviceURL + 'clasificacionDocumento/' + id )
   //    .map( ( res: Response ) => res.json() as DocumentManagement );
   // }

   add( c: DocumentManagement ) {
      return this.authHttp.post( this.serviceURL, c ).map( ( res: Response ) => res.json() );
   };

   update( c: DocumentManagement ) {
      return this.authHttp.put( this.serviceURL, c ).map( ( res: Response ) => res );
   }
}
