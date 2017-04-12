import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Risks } from "../_models/risks";

@Injectable()
export class RisksService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers( { 'Content-Type': 'application/json' } );

   constructor( private http: Http ) {
   }

   getAll() {
      return this.http.get( this.serviceURL + 'riesgos' ).map( ( res: Response ) => res.json() as Risks[] );
   }
   getTypeRisks() {
      return this.http.get( this.serviceURL + 'riesgosTipos' ).map( ( res: Response ) => res.json());
   }
   getSubTypeRisks() {
      return this.http.get( this.serviceURL + 'riesgosSubTipos' ).map( ( res: Response ) => res.json());
   }

   getById(id: number) {
      return this.http.get( this.serviceURL + 'riesgos/'+id ).map( ( res: Response ) => res.json() as Risks);
   }
   getTypeRiskById(id: number){
      return this.http.get( this.serviceURL + 'riesgosTipos/'+id ).map( ( res: Response ) => res.json());
   }
   getSubTypeRiskById(id: number){
      return this.http.get( this.serviceURL + 'riesgosSubTipos/'+id ).map( ( res: Response ) => res.json());
   }
   add( r: Risks ) {
      return this.http.post( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res.json() );
   };

   update( r: Risks ) {
      return this.http.put( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res );
   }

}
