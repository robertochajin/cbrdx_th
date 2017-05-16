import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { RolWidgets } from '../_models/rolWidgets';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class RolWidgetsServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/rolesWidgets/';
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
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as RolWidgets[] );
   }

   getAllByRol( id: number ): Observable<RolWidgets[]> {
      return this.authHttp.get( this.serviceURL + 'buscarRol/' + id ).map( ( res: Response ) => res.json() as RolWidgets[] );
   }

   add( f: RolWidgets ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: RolWidgets ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as RolWidgets );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
