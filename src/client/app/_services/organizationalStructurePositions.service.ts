import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { OrganizationalStructurePositions } from "../_models/organizationalStructurePositions";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class OrganizationalStructurePositionsServices {
   
   private masterService = '<%= SVC_TH_URL %>/api/estructuraOrganizacionalCargos/';
   private detailService = '<%= SVC_TH_URL %>/api/estructuraOrganizacionalCargos/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   getAllEnabled(): Observable<OrganizationalStructurePositions[]> {
      return this.authHttp.get( this.masterService + 'enabled/' ).map( ( res: Response ) => res.json() as OrganizationalStructurePositions[] );
   }
   
   getAllByOrganizacionalStructure( idOrganizacionalStructure: number ): Observable<OrganizationalStructurePositions[]> {
      return this.authHttp.get( this.masterService + 'buscarCargo/' + idOrganizacionalStructure ).map( ( res: Response ) => res.json() as OrganizationalStructurePositions[] );
   }
   
   add( f: OrganizationalStructurePositions ) {
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };
   
   update( f: OrganizationalStructurePositions ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }
   
   get( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as OrganizationalStructurePositions );
   }
   
   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
   
}

