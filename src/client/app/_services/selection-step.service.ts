import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { SelectionStep } from '../_models/selectionStep';
import { SelectionProcess } from '../_models/selection-process';

@Injectable()
export class SelectionStepService {

   private masterService = '<%= SVC_TH_URL %>/api/procesosPasos/';

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

   getCurrentProcess() {
      return this.authHttp.get( '<%= SVC_TH_URL %>/api/procesos/current/' )
      .map( ( res: Response ) => res.json() as SelectionProcess );
   }

   getAllByProcess(idProcess: number) {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as SelectionStep[] );
   }

   get(idSelectionStep: number) {
      return this.authHttp.get( this.masterService + idSelectionStep )
      .map( ( res: Response ) => res.json() as SelectionStep );
   }

   getLastStep( idProceso: number ) {
      return this.authHttp.get( this.masterService + 'ultimoPaso/' + idProceso )
      .map( ( res: Response ) => {
         if(res.text() !== ''){
            return res.json() as SelectionStep;
         } else {
            return undefined;
         }
      });
   }

   handleError( error: any ): Promise<any> {
      return Promise.reject( error.message || error );
   }

}

