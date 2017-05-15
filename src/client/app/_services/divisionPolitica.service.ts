import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { DivisionPoliticaAreas } from '../_models/divisionPoliticaAreas';
import { DivisionPoliticaLocalidades } from '../_models/divisionPoliticaLocalidades';
import { DivisionPoliticaResguardos } from '../_models/divisionPoliticaResguardos';
import { DivisionPoliticaComunas } from '../_models/divisionPoliticaComunas';
import { DivisionPoliticaTipos } from '../_models/divisionPoliticaTipos';
import { Search } from '../_models/search';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DivisionPoliticaService {

   private serviceURL = '<%= SVC_TH_URL %>/api/divisionPolitica/';
   private serviceAreasURL = '<%= SVC_TH_URL %>/api/divisionPoliticaAreas/';
   private serviceTiposURL = '<%= SVC_TH_URL %>/api/divisionPoliticaTipos/';
   private serviceComunasURL = '<%= SVC_TH_URL %>/api/divisionPoliticaComunas/';
   private serviceLocalidadesURL = '<%= SVC_TH_URL %>/api/divisionPoliticaLocalidades/';
   private serviceResguardosURL = '<%= SVC_TH_URL %>/api/divisionPoliticaResguardos/';

   constructor( private authHttp: AuthHttp ) {
   }

   listDivisionPolitica() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as DivisionPolitica[] );
   }

   listByPadreDivisionPolitica( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarHijos/' + id ).map( ( res: Response ) => res.json() as DivisionPolitica[] );
   }

   addDivisionPolitica( c: DivisionPolitica ): Promise<DivisionPolitica> {
      return this.authHttp.post( this.serviceURL, JSON.stringify( c ) ).toPromise().then( res => res.json() as DivisionPolitica )
      .catch( this.handleError );
   };

   updateDivisionPolitica( c: DivisionPolitica ): Promise<any> {
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

   listDivisionPoliticaComunas() {
      return this.authHttp.get( this.serviceComunasURL ).map( ( res: Response ) => res.json() as DivisionPoliticaComunas[] );
   }

   listDivisionPoliticaLocalidades() {
      return this.authHttp.get( this.serviceLocalidadesURL ).map( ( res: Response ) => res.json() as DivisionPoliticaLocalidades[] );
   }

   listDivisionPoliticaResguardos() {
      return this.authHttp.get( this.serviceResguardosURL ).map( ( res: Response ) => res.json() as DivisionPoliticaResguardos[] );
   }

   getSearch( val: string ) {
      return this.authHttp.get( this.serviceURL + 'search/' + val + '/' ).map( res => res.json() as Search[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
