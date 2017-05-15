import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PoliticalDivisionService {

   private masterService = '<%= SVC_TH_URL %>/api/divisionPolitica/';
   private detailService = '<%= SVC_TH_URL %>/api/divisionPolitica/';

   constructor( private authHttp: AuthHttp ) {
   }

   getHoodsByWildCard( qr: any ) {
      return this.authHttp.get( this.masterService + 'buscarLocalizaciones/' + qr + '/' )
      .map( ( res: Response ) => res.json() );
   }

   getAllCities( qr: any ) {
      return this.authHttp.get( this.masterService + 'buscarCiudad/' + qr + '/' )
      .map( ( res: Response ) => res.json() );
   }

   getById( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as DivisionPolitica );
   }

   getLocation( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarLocalizacion/' + id )
      .map( ( res: Response ) => res.json() );
   }
}

