import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { VConstante } from '../_models/vconstante';
import { Constante } from '../_models/constante';
import 'rxjs/add/operator/toPromise';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class ConstanteService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
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

   listConstants() {
      return this.authHttp.get( this.serviceURL + 'constantes/' ).map( ( res: Response ) => res.json() as VConstante[] );
   }

   addConstant( c: Constante ): Promise<Constante> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'constantes/', JSON.stringify( c ) ).toPromise().then( res => res.json() as Constante )
      .catch( this.handleError );
   };

   updateConstant( c: Constante ): Promise<any> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'constantes/', JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   viewConstant( id: number ) {
      return this.authHttp.get( this.serviceURL + 'constantes/' + id ).map( res => res.json() as Constante );
   }

   getByCode( code: string ) {
      return this.authHttp.get( this.serviceURL + 'constantes/codigo/' + code ).map( res => res.json() as Constante );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
