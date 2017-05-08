import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MenuManager } from '../_models/menuManager';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class MenuManagerService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'menus' ).map( ( res: Response ) => res.json() as MenuManager[] );
   }

   getAllEnabled() {
      return this.authHttp.get( this.serviceURL + 'menus/enabled' ).map( ( res: Response ) => res.json() as MenuManager[] );
   }

   add( c: MenuManager ): Promise<MenuManager> {
      return this.authHttp.post( this.serviceURL + 'menus', JSON.stringify( c ) ).toPromise().then( res => res.json() as MenuManager )
      .catch( this.handleError );
   };

   update( c: MenuManager ): Promise<any> {
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
