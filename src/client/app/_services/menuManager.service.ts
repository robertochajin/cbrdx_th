import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MenuManager } from '../_models/menuManager';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class MenuManagerService {

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

   getAll() {
      return this.authHttp.get( this.serviceURL + 'menus' ).map( ( res: Response ) => res.json() as MenuManager[] );
   }

   getAllEnabled() {
      return this.authHttp.get( this.serviceURL + 'menus/enabled' ).map( ( res: Response ) => res.json() as MenuManager[] );
   }

   add( c: MenuManager ): Promise<MenuManager> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'menus', JSON.stringify( c ) ).toPromise().then( res => res.json() as MenuManager )
      .catch( this.handleError );
   };

   update( c: MenuManager ): Promise<any> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'menus', JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   view( id: number ) {
      return this.authHttp.get( this.serviceURL + 'menus/' + id ).map( res => res.json() as MenuManager );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

   getByPadre( id: number ) {
      return this.authHttp.get( this.serviceURL + 'menus/buscarPadre/' + id ).map( ( res: Response ) => res.json() as MenuManager[] );
   }

   getMenusSession() {
      return this.authHttp.get( this.serviceURL + 'menus/rol' ).map( ( res: Response ) => res.json() as MenuManager[] );
   }

}
