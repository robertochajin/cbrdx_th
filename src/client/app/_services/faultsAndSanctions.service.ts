import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { FaultsAndSanctions } from '../_models/faultsAndSanctions';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class FaultsAndSanctionsService {

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

   getAll() {
      return this.authHttp.get( this.serviceURL + 'faltas' ).map( ( res: Response ) => res.json() );
   }

   add( c: FaultsAndSanctions ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'faltas', c ).map( ( res: Response ) => res.json() );
   };

   update( c: FaultsAndSanctions ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'faltas', c ).map( ( res: Response ) => res );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'faltas/' + id ).map( ( res: Response ) => res.json() as FaultsAndSanctions );
   }

}
