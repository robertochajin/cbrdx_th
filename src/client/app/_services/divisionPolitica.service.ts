import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { DivisionPoliticaAreas } from '../_models/divisionPoliticaAreas';
import { DivisionPoliticaAgrupaciones } from '../_models/divisionPoliticaAgrupaciones';
import { DivisionPoliticaTipos } from '../_models/divisionPoliticaTipos';
import { Search } from '../_models/search';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class DivisionPoliticaService {

   private serviceURL = '<%= SVC_TH_URL %>/api/divisionPolitica/';
   private serviceAreasURL = '<%= SVC_TH_URL %>/api/divisionPoliticaAreas/';
   private serviceTiposURL = '<%= SVC_TH_URL %>/api/divisionPoliticaTipos/';
   private serviceAgrupacionesURL = '<%= SVC_TH_URL %>/api/divisionPoliticaAgrupaciones/buscarAgrupacion/';

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

   listDivisionPolitica() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as DivisionPolitica[] );
   }

   listByPadreDivisionPolitica( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarHijos/' + id ).map( ( res: Response ) => res.json() as DivisionPolitica[] );
   }

   addDivisionPolitica( c: DivisionPolitica ): Promise<DivisionPolitica> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, JSON.stringify( c ) ).toPromise().then( res => res.json() as DivisionPolitica )
      .catch( this.handleError );
   };

   updateDivisionPolitica( c: DivisionPolitica ): Promise<any> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   viewDivisionPolitica( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarId/' + id ).map( res => res.json() as DivisionPolitica );
   }

   listDivisionPoliticaAreas() {
      return this.authHttp.get( this.serviceAreasURL ).map( ( res: Response ) => res.json() as DivisionPoliticaAreas[] );
   }

   listDivisionPoliticaTipos() {
      return this.authHttp.get( this.serviceTiposURL ).map( ( res: Response ) => res.json() as DivisionPoliticaTipos[] );
   }

   listDivisionPoliticaAgrupaciones(id : number) {
      return this.authHttp.get( this.serviceAgrupacionesURL + id ).map( ( res: Response ) => res.json() as DivisionPoliticaAgrupaciones[] );
   }


   getSearch( val: string ) {
      return this.authHttp.get( this.serviceURL + 'buscarLocalizaciones/' + val + '/' ).map( res => res.json() as DivisionPolitica[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
