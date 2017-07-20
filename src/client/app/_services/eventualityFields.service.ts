import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { EventualityField } from '../_models/eventualityField';


@Injectable()
export class EventualityFieldsServices {

   private masterService = '<%= SVC_TH_URL %>/api/novedadesCampos/';
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

   getAll(): Observable<EventualityField[]> {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as EventualityField[] );
   }

   getAllByEventuality( idEventuality: number ): Observable<EventualityField[]> {
      return this.authHttp.get( this.masterService + 'novedad/' + idEventuality )
      .map( ( res: Response ) => res.json() as EventualityField[] );
   }

   getAllEnabled(): Observable<EventualityField[]> {
      return this.authHttp.get( this.masterService + 'enabled/' )
      .map( ( res: Response ) => res.json() as EventualityField[] );
   }

   add( f: EventualityField ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: EventualityField ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + id )
      .map( ( res: Response ) => res.json() as EventualityField );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

