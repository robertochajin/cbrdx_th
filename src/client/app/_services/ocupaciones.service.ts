import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Ocupaciones } from '../_models/ocupaciones';
import { OcupacionesTipos } from '../_models/ocupacionesTipos';
import { Search } from '../_models/search';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class OcupacionesService {

   private serviceUrlOcu = '<%= SVC_TH_URL %>/api/ocupaciones/';
   private serviceTiposURL = '<%= SVC_TH_URL %>/api/ocupacionesTipos/';
   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {

   }

   listOcupaciones() {
      return this.authHttp.get( this.serviceUrlOcu ).map( ( res: Response ) => res.json() as Ocupaciones[] );
   }

   addOcupaciones( c: Ocupaciones ): Promise<Ocupaciones> {
      return this.authHttp.post( this.serviceUrlOcu, JSON.stringify( c ) ).toPromise().then( res => res.json() as Ocupaciones )
      .catch( this.handleError );
   };

   updateOcupaciones( c: Ocupaciones ): Promise<any> {
      return this.authHttp.put( this.serviceUrlOcu, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   viewOcupaciones( id: number ) {
      return this.authHttp.get( this.serviceUrlOcu + id ).map( res => res.json() as Ocupaciones );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

   listOcupacionesTipos() {
      return this.authHttp.get( this.serviceTiposURL ).map( ( res: Response ) => res.json() as OcupacionesTipos[] );
   }

   getSearch( val: string ) {
      return this.authHttp.get( this.serviceUrlOcu + 'search/' + val + '/' ).map( res => res.json() as Search[] );
   }

   /* Refactor */
   listByNivel( val: number ) {
      return this.authHttp.get( this.serviceUrlOcu + 'tipo/' + val + '/' ).map( ( res: Response ) => res.json() as Ocupaciones[] );
   }
}
