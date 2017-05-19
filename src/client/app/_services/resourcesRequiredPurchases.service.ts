import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import { ResourcesRequiredPurchases } from '../_models/resourcesRequiredPurchases';

@Injectable()
export class ResoursesRequiredServices {

   private masterService = '<%= SVC_TH_URL %>/api/requerimientosCompras/';

   constructor( private authHttp: AuthHttp ) {

   }

   add( f: ResourcesRequiredPurchases ) {
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: ResourcesRequiredPurchases ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getResoursesByIdRequirement( id: number ) {
      return this.authHttp.get( this.masterService + 'requerimiento/' + id )
      .map( ( res: Response ) => res.json() as ResourcesRequiredPurchases[] );
   }
   getAll() {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as ResourcesRequiredPurchases[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

