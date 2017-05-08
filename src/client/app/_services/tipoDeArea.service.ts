import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { TipoDeArea } from '../_models/tipoDeArea';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class TipoDeAreaService {

   private serviceURL = '<%= SVC_TH_URL %>/api/estructuraAreas/';

   constructor( private authHttp: AuthHttp ) {
   }

   listAreas() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as TipoDeArea[] );
   }

   addArea( c: TipoDeArea ): Promise<TipoDeArea> {
      return this.authHttp.post( this.serviceURL, JSON.stringify( c ) ).toPromise().then( res => res.json() as TipoDeArea )
      .catch( this.handleError );
   };

   updateArea( c: TipoDeArea ): Promise<any> {
      return this.authHttp.put( this.serviceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   viewArea( id: number ) {
      return this.authHttp.get( this.serviceURL + id ).map( res => res.json() as TipoDeArea );
   }

   getlistAreas() {
      return this.authHttp.get( this.serviceURL + 'enabled' ).map( ( res: Response ) => res.json() as TipoDeArea[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
