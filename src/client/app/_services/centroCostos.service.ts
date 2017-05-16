import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { CentroCostos } from '../_models/centroCostos';
import 'rxjs/add/operator/toPromise';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class CentroCostosService {

   private serviceURL = '<%= SVC_TH_URL %>/api/centrosCostos/';
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

   listCentroCostos() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as CentroCostos[] );
   }

   addCentroCostos( c: CentroCostos ): Promise<CentroCostos> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, JSON.stringify( c ) ).toPromise().then( res => res.json() as CentroCostos )
      .catch( this.handleError );
   };

   updateCentroCostos( c: CentroCostos ): Promise<any> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   viewCentroCostos( id: number ) {
      return this.authHttp.get( this.serviceURL + id ).map( res => res.json() as CentroCostos );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
