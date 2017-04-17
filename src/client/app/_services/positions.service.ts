import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Positions } from "../_models/positions";
import { PositionsObservations } from "../_models/positionsObservations";

@Injectable()
export class PositionsService {
   
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers( { 'Content-Type': 'application/json' } );
   
   constructor( private http: Http ) {
   }
   
   getAll() {
      return this.http.get( this.serviceURL + 'cargos' ).map( ( res: Response ) => res.json() );
   }
   
   getListPositions() {
      return this.http.get( this.serviceURL + 'cargos/enabled' ).map( ( res: Response ) => res.json() );
   }
   
   add( c: Positions ) {
      return this.http.post( this.serviceURL + 'cargos', c ).map( ( res: Response ) => res.json() );
   };
   
   update( c: Positions ) {
      return this.http.put( this.serviceURL + 'cargos', c ).map( ( res: Response ) => res );
   }
   updateEstado( c: Positions ) {
      return this.http.put( this.serviceURL + 'cargos/tab2', c ).map( ( res: Response ) => res );
   }
   update1( c: Positions ) {
      return this.http.put( this.serviceURL + 'cargos/tab1/', c ).map( ( res: Response ) => res );
   }
   update2( c: Positions ) {
      return this.http.put( this.serviceURL + 'cargos/tab3', c ).map( ( res: Response ) => res );
   }
   update3( c: Positions ) {
      return this.http.put( this.serviceURL + 'cargos/tab4', c ).map( ( res: Response ) => res );
   }
   update4( c: Positions ) {
      return this.http.put( this.serviceURL + 'cargos/tab5', c ).map( ( res: Response ) => res );
   }
   update5( c: Positions ) {
      return this.http.put( this.serviceURL + 'cargos/tab6', c ).map( ( res: Response ) => res );
   }
   update6( c: Positions ) {
      return this.http.put( this.serviceURL + 'cargos/tab7', c ).map( ( res: Response ) => res );
   }
   
   get( id: number ) {
      return this.http.get( this.serviceURL + 'cargos/' + id ).map(( res: Response ) => {
         if(res.text() != ""){
            return res.json() as Positions
         }else{
            return new Positions;
         }
      }).catch(this.handleError);
   }
   
   getListfaultsTypes() {
      return this.http.get( this.serviceURL + 'cargos' ).map( ( res: Response ) => res.json() );
   }
   
   getObservationsbyPosition( id: number ) {
      return this.http.get( this.serviceURL + 'cargosEstadosObservaciones/buscarCargo/'+ id ).map( ( res: Response ) => res.json() );
   }
   
   updateObservations( obj: PositionsObservations ) {
      return this.http.put( this.serviceURL + 'cargosEstadosObservaciones', obj ).map( ( res: Response ) => res );
   }
   
   addObservations( obj: PositionsObservations ) {
      return this.http.post( this.serviceURL + 'cargosEstadosObservaciones', obj ).map( ( res: Response ) => res.json() );
   };
   
   handleError(error: any): Promise<any> {
      console.error('Error:', error);
      return Promise.reject(error.message || error);
   }
}
