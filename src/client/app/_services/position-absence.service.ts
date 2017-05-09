import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Absence } from '../_models/position-absence';
import { AuthHttp } from 'angular2-jwt';
@Injectable()
export class AbsenceService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
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
      return this.authHttp.post( this.serviceURL + 'cargosRelacionados', c ).map( ( res: Response ) => res.json() );
   };

   update( c: Absence ) {
      return this.authHttp.put( this.serviceURL + 'cargosRelacionados', c ).map( ( res: Response ) => res );
   }

}
