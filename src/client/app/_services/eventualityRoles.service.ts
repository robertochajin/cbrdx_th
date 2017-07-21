import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { EventualityRoles } from '../_models/eventualityRoles';

@Injectable()
export class EventualityRolesServices {

   private masterService = '<%= SVC_TH_URL %>/api/novedadesRoles/';
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

   getAll(): Observable<EventualityRoles[]> {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as EventualityRoles[] );
   }

   getAllByEventuality( idEventuality: number ): Observable<EventualityRoles[]> {
      return this.authHttp.get( this.masterService + 'novedad/' + idEventuality )
      .map( ( res: Response ) => res.json() as EventualityRoles[] );
   }

   getAllEnabled(): Observable<EventualityRoles[]> {
      return this.authHttp.get( this.masterService + 'enabled/' )
      .map( ( res: Response ) => res.json() as EventualityRoles[] );
   }

   add( f: EventualityRoles ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: EventualityRoles ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + id )
      .map( ( res: Response ) => res.json() as EventualityRoles );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

