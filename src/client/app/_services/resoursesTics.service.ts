import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import { TicsResourses } from '../_models/ticsResourses';

@Injectable()
export class ResoursesTicsService {

   private masterService = '<%= SVC_TH_URL %>/api/requerimientosTics/';

   constructor( private authHttp: AuthHttp ) {

   }

   add( f: TicsResourses ) {
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: TicsResourses ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getResoursesByIdRequirement( id: number ) {
      return this.authHttp.get( this.masterService + 'requerimiento/' + id )
      .map( ( res: Response ) => res.json() as TicsResourses[] );
   }
   getAll() {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as TicsResourses[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

