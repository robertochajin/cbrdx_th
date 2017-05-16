import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { TerceroResidencias } from '../_models/terceroResidencias';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class TercerosResidenciasServices {

   private masterService = '<%= SVC_TH_URL %>/api/tercerosResidencias/';
   private detailService = '<%= SVC_TH_URL %>/api/tercerosResidencias/';
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

   add( f: TerceroResidencias ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: TerceroResidencias ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as TerceroResidencias );
   }

   getByTerceroLocalizacion( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id )
      .map( ( res: Response ) => {
               if ( res.text() !== '' ) {
                  return res.json();
               } else {
                  return undefined;
               }
            }
      );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}

