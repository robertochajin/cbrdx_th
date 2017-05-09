import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Risks } from '../_models/risks';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class RisksService {
   
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   
   constructor( private authHttp: AuthHttp ) {
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
      return this.authHttp.post( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res.json() );
   };
   
   update( r: Risks ) {
      return this.authHttp.put( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res );
   }
   
}
