import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { SelectionStep } from '../_models/selectionStep';

@Injectable()
export class SelectionStepService {

   private masterService = '<%= SVC_TH_URL %>/api/procesospasos/';

   constructor( private authHttp: AuthHttp ) {

   }

   add( f: SelectionStep ) {
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: SelectionStep ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getAll() {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as SelectionStep[] );
   }

   getCurrentSteps() {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as SelectionStep[] );
   }

   get(idSelectionStep: number) {
      return this.authHttp.get( this.masterService + idSelectionStep )
      .map( ( res: Response ) => res.json() as SelectionStep );
   }

   handleError( error: any ): Promise<any> {
      return Promise.reject( error.message || error );
   }

}

