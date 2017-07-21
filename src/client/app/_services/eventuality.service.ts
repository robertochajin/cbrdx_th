import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Eventuality } from '../_models/eventuality';

@Injectable()
export class EventualityServices {

   private masterService = '<%= SVC_TH_URL %>/api/novedades/';
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

   getAll(): Observable<Eventuality[]> {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as Eventuality[] );
   }

   getAllEnabled(): Observable<Eventuality[]> {
      return this.authHttp.get( this.masterService + 'enabled/' )
      .map( ( res: Response ) => res.json() as Eventuality[] );
   }

   add( f: Eventuality ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: Eventuality ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + id )
      .map( ( res: Response ) => res.json() as Eventuality );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

