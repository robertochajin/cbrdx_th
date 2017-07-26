import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { SuppliesProjection } from '../_models/suppliesProjection';

@Injectable()
export class SuppliesProjectionServices {

   private masterService = '<%= SVC_TH_URL %>/api/';
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
      return this.authHttp.get( this.masterService + 'proyeccionDotacion' )
      .map( ( res: Response ) => res.json() as SuppliesProjection[] );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'proyeccionDotacion/' + id )
      .map( ( res: Response ) => res.json() as SuppliesProjection );
   }

   add( f: SuppliesProjection ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService + 'proyeccionDotacion', f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: SuppliesProjection ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService + 'proyeccionDotacion', JSON.stringify( f ) ).catch( this.handleError );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

