import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class CompanyAssetsTypesServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/listasTiposElementos/';

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

   getAllEnabled() {
      return this.authHttp.get( this.serviceURL + 'enabled' ).map( ( res: Response ) => res.json() );
   }

}
