import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Widgets } from '../_models/widgets';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class WidgetServices {

   private masterService = '<%= SVC_TH_URL %>/api/widgets';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll(): Observable<Widgets[]> {
      return this.authHttp.get( this.masterService ).map( ( res: Response ) => res.json() as Widgets[] );
   }

   getAllEnabled(): Observable<Widgets[]> {
      return this.authHttp.get( this.masterService + '/enabled/' ).map( ( res: Response ) => res.json() as Widgets[] );
   }

   add( f: Widgets ) {
      return this.authHttp.post( this.masterService, f ).map( ( res: Response ) => res.json() );
   };

   update( f: Widgets ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getById( id: number ) {
      return this.authHttp.get( this.masterService + '/' + id ).map( ( res: Response ) => res.json() as Widgets );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

   getByUsuario( id: number ): Observable<Widgets[]> {
      return this.authHttp.get( this.masterService + '/buscarUsuario/' + id ).map( ( res: Response ) => res.json() as Widgets[] );
   }

}

