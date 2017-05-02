import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { AuthenticationService } from "./authentication.service";
import { MenuManager } from "../_models/menuManager";

@Injectable()
export class MenuManagerService {
   
   headers = new Headers( { 'Content-Type': 'application/json' } );
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   
   constructor( private http: Http,
                private authenticationService: AuthenticationService ) {
      this.headers = new Headers( {
         'Content-Type': 'application/json', 'Authorization': this.authenticationService.token
      } );
   }
   
   getAll() {
      return this.http.get( this.serviceURL+'menus', { headers: this.headers } ).map( ( res: Response ) => res.json() as MenuManager[] );
   }
   
   getAllEnabled() {
      return this.http.get( this.serviceURL+'menus/enabled', { headers: this.headers } ).map( ( res: Response ) => res.json() as MenuManager[] );
   }
   
   add( c: MenuManager ): Promise<MenuManager> {
      return this.http.post( this.serviceURL+'menus', JSON.stringify( c ), { headers: this.headers } ).toPromise().then( res => res.json() as MenuManager ).catch( this.handleError );
   };
   
   update( c: MenuManager ): Promise<any> {
      return this.http.put( this.serviceURL+'menus', JSON.stringify( c ), { headers: this.headers } ).toPromise().catch( this.handleError );
   }
   
   view( id: number ) {
      return this.http.get( this.serviceURL+'menus/' + id, { headers: this.headers } ).map( res => res.json() as MenuManager );
   }
   
   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
   
   getByPadre( id: number) {
      return this.http.get( this.serviceURL+'menus/buscarPadre/'+id, { headers: this.headers } ).map( ( res: Response ) => res.json() as MenuManager[] );
   }
   
   getMenusSession( ) {
      console.log('MenuService: ',this.headers.get('Authorization'));
       let headers = new Headers( {
         'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')
      } );
      return this.http.get( this.serviceURL+'menus/rol', { headers: headers } ).map( ( res: Response ) => res.json() as MenuManager[] );
   }
   
   
}
