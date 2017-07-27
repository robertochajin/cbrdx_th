import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { ContactInformation } from './contact-information';

@Injectable()
export class ContactInformationService {

   private serviceURL = '<%= SVC_TH_URL %>/api/constantes';
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
      return this.authHttp.get( this.serviceURL + '/' ).map( ( res: Response ) => res.json() as ContactInformation[] );
   }

   add( f: ContactInformation ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: ContactInformation ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + '/' + id ).map( res => res.json() as ContactInformation );
   }

   getByCode( code: string ) {
      return this.authHttp.get( this.serviceURL + '/codigo/' + code ).map( res => res.json() as ContactInformation );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
