import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ActividadEconomica } from '../_models/actividadEconomica';
import { ActividadEconomicaTipos } from '../_models/actividadEconomicaTipos';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Search } from '../_models/search';

@Injectable()
export class ActividadEconomicaService {

   private serviceURL = '<%= SVC_TH_URL %>/api/actividadesEconomicas/';
   private serviceTiposURL = '<%= SVC_TH_URL %>/api/actividadesEconomicasTipos/';
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

   listActividadEconomica() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as ActividadEconomica[] );
   }

   addActividadEconomica( c: ActividadEconomica ): Promise<ActividadEconomica> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, JSON.stringify( c ) )
      .toPromise().then( res => res.json() as ActividadEconomica ).catch( this.handleError );
   };

   updateActividadEconomica( c: ActividadEconomica ): Promise<any> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   viewActividadEconomica( id: number ) {
      return this.authHttp.get( this.serviceURL + id ).map( res => res.json() as ActividadEconomica );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

   listActividadEconomicaTipos() {
      return this.authHttp.get( this.serviceTiposURL ).map( ( res: Response ) => res.json() as ActividadEconomicaTipos[] );
   }

   getSearch( val: string ) {
      return this.authHttp.get( this.serviceURL + 'search/' + val + '/' ).map( res => res.json() as Search[] );
   }

   /* Refactor */
   listByPadre( id: number ) {
      return this.authHttp.get( this.serviceURL + 'padre/' + id + '/' )
      .map( ( res: Response ) => res.json() as ActividadEconomica[] );
   }

   listLastChild( id: number ) {
      return this.authHttp.get( this.serviceURL + 'lastChild/' + id + '/' )
      .map( ( res: Response ) => res.json() as ActividadEconomica[] );
   }
}
