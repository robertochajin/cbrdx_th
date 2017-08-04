import { Injectable } from '@angular/core';
import { Response, ResponseContentType } from '@angular/http';
import { Positions } from '../_models/positions';
import { PositionsObservations } from '../_models/positionsObservations';
import { PositionsActivities } from '../_models/positionsActivities';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class PositionsService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;
   private idUsuario: number;

   constructor( private authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
      }
   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'cargos' ).map( ( res: Response ) => res.json() );
   }

   getByWildCard( query: string ) {
      return this.authHttp.get( this.serviceURL + 'cargos' + '/wildcard/' + query ).map( ( res: Response ) => res.json() );
   }

   getByWildCardFiltered( query: string ) {
      return this.authHttp.get( this.serviceURL + 'cargos' + '/wildcardFiltered/' + query ).map( ( res: Response ) => res.json() );
   }

   getByWildCardAndArea( query: string, idArea: number ) {
      return this.authHttp.get( this.serviceURL + 'cargos' + '/search/' + query + '/' + idArea).map( ( res: Response ) => res.json() );
   }

   getListPositions() {
      return this.authHttp.get( this.serviceURL + 'cargos/enabled' ).map( ( res: Response ) => res.json() );
   }

   /**
    * Retorna un archivo xls con la malla del mapa de riesgos por cargos
    * @returns {Observable<Response Blob>}
    */
   getMapa() {
      return this.authHttp.get( this.serviceURL + 'mapa', { responseType: ResponseContentType.Blob }).map(
         ( res: Response ) => {
            return new Blob( [ res.blob() ], { type: res.headers.get( 'content-type' ) } );
         } );
   }

   getListStudies() {
      return this.authHttp.get( this.serviceURL + 'nivelesEstudios/enabled/' ).map( ( res: Response ) => res.json() );
   }

   add( c: Positions ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'cargos', c ).map( ( res: Response ) => res.json() as Positions );
   };

   addPositionsActivities( c: PositionsActivities ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'cargosOcupaciones', c ).map( ( res: Response ) => res.json() );
   };

   updatePositionsActivities( c: PositionsActivities ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargosOcupaciones', c ).map( ( res: Response ) => res );
   }

   update( c: Positions ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargos', c ).map( ( res: Response ) => res );
   }

   updateEstado( c: Positions ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargos/tab2', c ).map( ( res: Response ) => res );
   }

   update1( c: Positions ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargos/tab1/', c ).map( ( res: Response ) => res );
   }

   update2( c: Positions ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargos/tab3', c ).map( ( res: Response ) => res );
   }

   update3( c: Positions ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargos/tab4', c ).map( ( res: Response ) => res );
   }

   update4( c: Positions ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargos/tab5', c ).map( ( res: Response ) => res );
   }

   update5( c: Positions ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargos/tab6', c ).map( ( res: Response ) => res );
   }

   update6( c: Positions ) {
      c.auditoriaUsuario = this.idUsuario;
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

   updateObservations( c: PositionsObservations ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargosEstadosObservaciones', c ).map( ( res: Response ) => res );
   }

   addObservations( c: PositionsObservations ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'cargosEstadosObservaciones', c ).map( ( res: Response ) => res.json() );
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

   disableById( idCargo: number) {
      return this.authHttp.put( this.serviceURL + 'cargos/disabled/' + idCargo, idCargo ).map( ( res: Response ) => res );
   }

}
