import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ListPositionsService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
   }

   getCategoryTypes() {
      return this.authHttp.get( this.serviceURL + 'categorias/enabled' ).map( ( res: Response ) => res.json() );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

