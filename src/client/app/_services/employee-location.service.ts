import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class LocationService {

   private serviceURL = '<%= SVC_TH_URL %>';

   constructor( private authHttp: AuthHttp ) {
   }

   get( id: Number ) {
      return this.authHttp.get( this.serviceURL + '/api/tercerosLocalizaciones/loc/' + id )
      .map( ( res: Response ) => res.json() );
   }

   getAllByEmployee( id: number ) {
      return this.authHttp.get( this.serviceURL + '/api/tercerosLocalizaciones/' + id )
      .map( ( res: Response ) => res.json() );
   }
   getAllResiden( id: number ) {
      return this.authHttp.get( this.serviceURL + '/api/localizaciones/localizacionTercero/' + id )
      .map( ( res: Response ) => res.json() );
   }

   getPrincipalNomenclatureList() {
      return this.authHttp.get( this.serviceURL + '/nomenclatures/principal' )
      .map( ( res: Response ) => res.json() );
   }

   getComplementaryNomenclatureList() {
      return this.authHttp.get( this.serviceURL + '/nomenclatures/complementary' )
      .map( ( res: Response ) => res.json() );
   }

   getAddressTypeList() {
      return this.authHttp.get( this.serviceURL + '/nomenclatures/addressType' )
      .map( ( res: Response ) => res.json() );
   }

   add( f: any ) {
      return this.authHttp.post( this.serviceURL + '/api/tercerosLocalizaciones', f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: any ) {
      return this.authHttp.put( this.serviceURL + '/api/tercerosLocalizaciones', f )
      .map( ( res: Response ) => res );
   }

   delete( f: any ) {
      return this.authHttp.put( this.serviceURL + '/api/tercerosLocalizaciones', f )
      .map( ( res: Response ) => res );
   }
}
