import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { FaultsAndSanctions } from '../_models/faultsAndSanctions';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class FaultsAndSanctionsService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'faltas' ).map( ( res: Response ) => res.json() );
   }

   add( c: FaultsAndSanctions ) {
      return this.authHttp.post( this.serviceURL + 'faltas', c ).map( ( res: Response ) => res.json() );
   };

   update( c: FaultsAndSanctions ) {
      return this.authHttp.put( this.serviceURL + 'faltas', c ).map( ( res: Response ) => res );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'faltas/' + id ).map( ( res: Response ) => res.json() as FaultsAndSanctions );
   }

}
