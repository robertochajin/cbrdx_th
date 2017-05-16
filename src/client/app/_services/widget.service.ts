import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Widgets } from '../_models/widgets';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class WidgetServices {

   private masterService = '<%= SVC_TH_URL %>/api/widgets';
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

   getAll(): Observable<Widgets[]> {
      return this.authHttp.get( this.masterService ).map( ( res: Response ) => res.json() as Widgets[] );
   }

   getAllEnabled(): Observable<Widgets[]> {
      return this.authHttp.get( this.masterService + '/enabled/' ).map( ( res: Response ) => res.json() as Widgets[] );
   }

   add( f: Widgets ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f ).map( ( res: Response ) => res.json() );
   };

   update( f: Widgets ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getById( id: number ) {
      return this.authHttp.get( this.masterService + '/' + id ).map( ( res: Response ) => res.json() as Widgets );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

   getByUsuario( id: number ): Observable<Widgets[]> {
      return this.authHttp.get( this.masterService + '/buscarUsuario/' + id ).map( ( res: Response ) => res.json() as Widgets[] );
   }

}

