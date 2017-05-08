import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Noformalstudies } from '../employees-academic-education/no-formal-studies';
import { FormalStudies } from '../employees-academic-education/formal-studies';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AcademicEducationService {

   private masterService = '<%= SVC_TH_URL %>/api/tercerosEstudiosFormales/';
   private NFmasterService = '<%= SVC_TH_URL %>/api/tercerosEstudiosNoFormales/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAllFormal() {
      return this.authHttp.get( this.masterService + 'buscarTercero/' ).map( ( res: Response ) => res.json() );
   }

   getAllFormalByEmployee( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarTercero/' + id ).map( ( res: Response ) => res.json() );
   }

   addFormal( f: FormalStudies ) {
      return this.authHttp.post( this.masterService, f ).map( ( res: Response ) => res.json() );
   };

   updateFormal( f: FormalStudies ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getFormal( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id ).map( ( res: Response ) => res.json() as FormalStudies )
   }

   getAllNoFormalByEmployee( id: number ) {
      return this.authHttp.get( this.NFmasterService + 'buscarTercero/' + id ).map( ( res: Response ) => res.json() );
   }

   addNoFormal( f: Noformalstudies ) {
      return this.authHttp.post( this.NFmasterService + '', f ).map( ( res: Response ) => res.json() );
   };

   updateNoFormal( f: Noformalstudies ) {
      return this.authHttp.put( this.NFmasterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getNoFormal( id: number ) {
      return this.authHttp.get( this.NFmasterService + 'buscarId/' + id ).map( ( res: Response ) => res.json() as Noformalstudies );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
