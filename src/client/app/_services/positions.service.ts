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
   
   add( c: Positions ) {
      return this.http.post( this.serviceURL + 'faltasysanciones', c ).map( ( res: Response ) => res.json() );
   };
   
   update( c: Positions ) {
      return this.http.put( this.serviceURL + 'faltasysanciones', c ).map( ( res: Response ) => res );
   }
   
   get( id: number ) {
      return this.http.get( this.serviceURL + 'faltasysanciones/' + id ).map( ( res: Response ) => res.json() as Positions );
   }
   
   getListfaultsTypes() {
      return this.http.get( this.serviceURL + 'faltasysanciones' ).map( ( res: Response ) => res.json() );
   }
   
   getObservations( id: number ) {
      return this.http.get( this.serviceURL + 'observaciones' ).map( ( res: Response ) => res.json() );
   }
   
   updateObservations( obj: PositionsObservations ) {
      return this.http.put( this.serviceURL + 'observaciones', obj ).map( ( res: Response ) => res );
   }
   
   addObservations( obj: PositionsObservations ) {
      return this.http.post( this.serviceURL + 'observaciones', obj ).map( ( res: Response ) => res.json() );
   };
}
