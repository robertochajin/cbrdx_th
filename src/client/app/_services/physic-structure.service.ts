import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { PhysicStructure } from "../_models/physic-structure";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class PhysicStructureService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'estructuraFisica').map( ( res: Response ) => res.json() as PhysicStructure[] );
   }

   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'estructuraFisica/' + id).map( ( res: Response ) => res.json() as PhysicStructure );
   }

   add( r: PhysicStructure ) {
      return this.authHttp.post( this.serviceURL + 'estructuraFisica', r).map( ( res: Response ) => res.json() );
   };

   update( r: PhysicStructure ) {
      return this.authHttp.put( this.serviceURL + 'estructuraFisica', r).map( ( res: Response ) => res );
   }

}
