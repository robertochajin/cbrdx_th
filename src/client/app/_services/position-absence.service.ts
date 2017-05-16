import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Absence } from '../_models/position-absence';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
@Injectable()
export class AbsenceService {

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

   getReemplazaA( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargosRelacionados/buscarRelacion/REE/' + id )
      .map( ( res: Response ) => res.json() as Absence[] );
   }

   getSupervisa( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargosRelacionados/buscarRelacion/SUP/' + id )
      .map( ( res: Response ) => res.json() as Absence[] );
   }

   getReemplazado( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargosRelacionados/buscarRelacion/REP/' + id )
      .map( ( res: Response ) => res.json() as Absence[] );
   }

   getPositionAll() {
      return this.authHttp.get( this.serviceURL + 'cargos/enabled' ).map( ( res: Response ) => res.json() );
   }

   getPositionById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargos/' + id ).map( ( res: Response ) => res.json() );
   }

   add( c: Absence ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'cargosRelacionados', c ).map( ( res: Response ) => res.json() );
   };

   update( c: Absence ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargosRelacionados', c ).map( ( res: Response ) => res );
   }

}
