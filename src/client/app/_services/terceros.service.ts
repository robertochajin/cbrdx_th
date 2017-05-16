import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Tercero } from '../_models/tercero';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import any = jasmine.any;

@Injectable()
export class TercerosService {

   private serviceURL = '<%= SVC_TH_URL %>/api/terceros/';
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

   listarTerceros() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as Tercero[] );
   }

   consultarTercero( tipoDocumento: number, numeroDocumento: string ) {
      return this.authHttp.get( this.serviceURL + tipoDocumento + '/' + numeroDocumento )
      .map( res => res.json() as Tercero ).catch( this.handleError );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
