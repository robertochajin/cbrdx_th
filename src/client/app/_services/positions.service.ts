import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Positions } from '../_models/positions';
import { PositionsObservations } from '../_models/positionsObservations';
import { PositionsActivities } from '../_models/positionsActivities';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PositionsService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'cargos' ).map( ( res: Response ) => res.json() );
   }

   getByWildCard( query: string ) {
      return this.authHttp.get( this.serviceURL + 'cargos' + '/wildcard/' + query ).map( ( res: Response ) => res.json() );
   }

   getListPositions() {
      return this.authHttp.get( this.serviceURL + 'cargos/enabled' ).map( ( res: Response ) => res.json() );
   }

   getListStudies() {
      return this.authHttp.get( this.serviceURL + 'nivelesEstudios/enabled/' ).map( ( res: Response ) => res.json() );
   }

   add( c: Positions ) {
      return this.authHttp.post( this.serviceURL + 'cargos', c ).map( ( res: Response ) => res.json() );
   };

   addPositionsActivities( c: PositionsActivities ) {
      return this.authHttp.post( this.serviceURL + 'cargosOcupaciones', c ).map( ( res: Response ) => res.json() );
   };

   updatePositionsActivities( c: PositionsActivities ) {
      return this.authHttp.put( this.serviceURL + 'cargosOcupaciones', c ).map( ( res: Response ) => res );
   }

   update( c: Positions ) {
      return this.authHttp.put( this.serviceURL + 'cargos', c ).map( ( res: Response ) => res );
   }

   updateEstado( c: Positions ) {
      return this.authHttp.put( this.serviceURL + 'cargos/tab2', c ).map( ( res: Response ) => res );
   }

   update1( c: Positions ) {
      return this.authHttp.put( this.serviceURL + 'cargos/tab1/', c ).map( ( res: Response ) => res );
   }

   update2( c: Positions ) {
      return this.authHttp.put( this.serviceURL + 'cargos/tab3', c ).map( ( res: Response ) => res );
   }

   update3( c: Positions ) {
      return this.authHttp.put( this.serviceURL + 'cargos/tab4', c ).map( ( res: Response ) => res );
   }

   update4( c: Positions ) {
      return this.authHttp.put( this.serviceURL + 'cargos/tab5', c ).map( ( res: Response ) => res );
   }

   update5( c: Positions ) {
      return this.authHttp.put( this.serviceURL + 'cargos/tab6', c ).map( ( res: Response ) => res );
   }

   update6( c: Positions ) {
      return this.authHttp.put( this.serviceURL + 'cargos/tab7', c ).map( ( res: Response ) => res );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargos/' + id ).map( ( res: Response ) => {
         if ( res.text() !== '' ) {
            return res.json() as Positions;
         } else {
            return new Positions;
         }
      } ).catch( this.handleError );
   }

   getEnabledByEmployee( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargos/enabledByEmployee' + id ).map( ( res: Response ) => {
         if ( res.text() !== '' ) {
            return res.json() as Positions;
         } else {
            return new Positions;
         }
      } ).catch( this.handleError );
   }

   getListfaultsTypes() {
      return this.authHttp.get( this.serviceURL + 'cargos' ).map( ( res: Response ) => res.json() );
   }

   getObservationsbyPosition( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargosEstadosObservaciones/buscarCargo/' + id ).map( ( res: Response ) => res.json() );
   }

   updateObservations( obj: PositionsObservations ) {
      return this.authHttp.put( this.serviceURL + 'cargosEstadosObservaciones', obj ).map( ( res: Response ) => res );
   }

   addObservations( obj: PositionsObservations ) {
      return this.authHttp.post( this.serviceURL + 'cargosEstadosObservaciones', obj ).map( ( res: Response ) => res.json() );
   };

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

   getListActivities() {
      return this.authHttp.get( this.serviceURL + 'ocupaciones' ).map( ( res: Response ) => res.json() );
   }

   getListActivitiesByLevel(level: number) {
      return this.authHttp.get( this.serviceURL + 'ocupaciones/tipo/' + level ).map( ( res: Response ) => res.json() );
   }

   getPositionActivitiesById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargosOcupaciones/buscarCargo/' + id )
      .map( ( res: Response ) => res.json() as PositionsActivities[] );
   }

   getActivitiesById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'ocupaciones/' + id ).map( ( res: Response ) => res.json() );
   }
}
