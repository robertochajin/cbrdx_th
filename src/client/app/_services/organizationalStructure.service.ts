import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { OrganizationalStructure } from '../_models/organizationalStructure';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class OrganizationalStructureService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
   }

   listOrganizationalStructure() {
      return this.authHttp.get( this.serviceURL + 'estructuraOrganizacional' )
      .map( ( res: Response ) => res.json() as OrganizationalStructure[] );
   }

   getAllEnabled() {
      return this.authHttp.get( this.serviceURL + 'estructuraOrganizacional/enabled' )
      .map( ( res: Response ) => res.json() as OrganizationalStructure[] );
   }

   addOrganizationalStructure( c: OrganizationalStructure ): Promise<OrganizationalStructure> {
      return this.authHttp.post( this.serviceURL + 'estructuraOrganizacional', JSON.stringify( c ) ).toPromise()
      .then( res => res.json() as OrganizationalStructure ).catch( this.handleError );
   };

   updateOrganizationalStructure( c: OrganizationalStructure ): Promise<any> {
      return this.authHttp.put( this.serviceURL + 'estructuraOrganizacional', JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   viewOrganizationalStructure( id: number ) {
      return this.authHttp.get( this.serviceURL + 'estructuraOrganizacional/' + id ).map( res => res.json() as OrganizationalStructure );
   }

   viewPadreOrganizationalStructure( id: number ) {
      return this.authHttp.get( this.serviceURL + 'estructuraOrganizacional/' + 'buscarPadre/' + id )
      .map( res => res.json() as OrganizationalStructure );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

   getCostTypes() {
      return this.authHttp.get( this.serviceURL + 'centrosCostos/enabled' ).map( ( res: Response ) => res.json() );
   }

   getAreaTypes() {
      return this.authHttp.get( this.serviceURL + 'estructuraAreas/enabled' ).map( ( res: Response ) => res.json() );
   }

   getPhysicalTypes() {
      return this.authHttp.get( this.serviceURL + 'estructuraFisica/enabled' ).map( ( res: Response ) => res.json() );
   }

}
