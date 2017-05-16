import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { TipoDeArea } from '../_models/tipoDeArea';
import 'rxjs/add/operator/toPromise';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class TipoDeAreaService {

   private serviceURL = '<%= SVC_TH_URL %>/api/estructuraAreas/';
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

   listAreas() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as TipoDeArea[] );
   }

   addArea( c: TipoDeArea ): Promise<TipoDeArea> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, JSON.stringify( c ) ).toPromise().then( res => res.json() as TipoDeArea )
      .catch( this.handleError );
   };

   updateArea( c: TipoDeArea ): Promise<any> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   viewArea( id: number ) {
      return this.authHttp.get( this.serviceURL + id ).map( res => res.json() as TipoDeArea );
   }

   getlistAreas() {
      return this.authHttp.get( this.serviceURL + 'enabled' ).map( ( res: Response ) => res.json() as TipoDeArea[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
