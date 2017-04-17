import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { PhysicStructute } from "../_models/physic-structure";

@Injectable()
export class PhysicStructuteService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers( { 'Content-Type': 'application/json' } );

   constructor( private http: Http ) {
   }

   getAll() {
      return this.http.get( this.serviceURL + 'riesgos' ).map( ( res: Response ) => res.json() as PhysicStructute[] );
   }
   getTypeRisks() {
      return this.http.get( this.serviceURL + 'riesgosTipos' ).map( ( res: Response ) => res.json());
   }
   getById(id: number) {
      return this.http.get( this.serviceURL + 'riesgos/'+id ).map( ( res: Response ) => res.json() as PhysicStructute);
   }
   getTypeRiskById(id: number){
      return this.http.get( this.serviceURL + 'riesgosTipos/'+id ).map( ( res: Response ) => res.json());
   }

   add( r: PhysicStructute ) {
      return this.http.post( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res.json() );
   };

   update( r: PhysicStructute ) {
      return this.http.put( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res );
   }

}
