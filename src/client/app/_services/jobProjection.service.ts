import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { JobProjection } from "../_models/jobProjection";

@Injectable()
export class JobProjectionService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers( { 'Content-Type': 'application/json' } );

   constructor( private http: Http ) {
   }

   getAll() {
      return this.http.get( this.serviceURL + 'riesgos' ).map( ( res: Response ) => res.json() as JobProjection[] );
   }

   getLisTypeStructure() {
      return this.http.get( this.serviceURL + 'listasTiposEstructuras/enabled' ).map( ( res: Response ) => res.json());
   }

   getById(id: number) {
      return this.http.get( this.serviceURL + 'riesgos/'+id ).map( ( res: Response ) => res.json() as JobProjection);
   }
   
   add( r: JobProjection ) {
      return this.http.post( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res.json() );
   };

   update( r: JobProjection ) {
      return this.http.put( this.serviceURL + 'riesgos', r ).map( ( res: Response ) => res );
   }

}
