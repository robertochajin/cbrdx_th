import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Risks } from '../_models/risks';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class RisksService {

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
      return this.authHttp.get( this.serviceURL + 'riesgos' ).map( ( res: Response ) => res.json() as Risks[] );
   }

   getTypeRisks() {
      return this.authHttp.get( this.serviceURL + 'riesgosTipos' ).map( ( res: Response ) => res.json() );
   }

   getSubTypeRisks() {
      return this.authHttp.get( this.serviceURL + 'riesgosSubTipos' ).map( ( res: Response ) => res.json() );
   }

   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'riesgos/' + id ).map( ( res: Response ) => res.json() as Risks );
   }

   getTypeRiskById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'riesgosTipos/' + id ).map( ( res: Response ) => res.json() );
   }

   getSubTypeRiskById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'riesgosSubTipos/' + id ).map( ( res: Response ) => res.json() );
   }

   add( r: Risks ) {
      r.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res.json() );
   };

   update( r: Risks ) {
      r.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res );
   }

}
