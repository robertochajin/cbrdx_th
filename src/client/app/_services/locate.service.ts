import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Localizaciones } from '../_models/localizaciones';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class LocateService {

   public headers = new Headers( { 'Content-Type': 'application/json' } );

   private masterService = '<%= SVC_TH_URL %>/api/localizaciones/';
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
      return this.authHttp.get( this.masterService ).map( ( res: Response ) => res.json() );
   }

   getById( id: number ) {
      return this.authHttp.get( this.masterService + '/buscarId/' + id ).map( ( res: Response ) => res.json() as Localizaciones );
   }

   add( f: Localizaciones ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: Localizaciones ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}

