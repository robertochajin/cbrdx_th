import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { AuthenticationService } from "./authentication.service";
import { OrganizationalStructure } from "../_models/organizationalStructure";

@Injectable()
export class OrganizationalStructureService {
   
   headers = new Headers( { 'Content-Type': 'application/json' } );
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   
   constructor( private http: Http,
                private authenticationService: AuthenticationService ) {
      this.headers = new Headers( {
         'Content-Type': 'application/json', 'Authorization': this.authenticationService.token
      } );
   }
   
   listOrganizationalStructure() {
      return this.http.get( this.serviceURL+'estructuraOrganizacional', { headers: this.headers } ).map( ( res: Response ) => res.json() as OrganizationalStructure[] );
   }
   
   getAllEnabled() {
      return this.http.get( this.serviceURL+'estructuraOrganizacional/enabled', { headers: this.headers } ).map( ( res: Response ) => res.json() as OrganizationalStructure[] );
   }
   
   addOrganizationalStructure( c: OrganizationalStructure ): Promise<OrganizationalStructure> {
      return this.http.post( this.serviceURL+'estructuraOrganizacional', JSON.stringify( c ), { headers: this.headers } ).toPromise().then( res => res.json() as OrganizationalStructure ).catch( this.handleError );
   };
   
   updateOrganizationalStructure( c: OrganizationalStructure ): Promise<any> {
      return this.http.put( this.serviceURL+'estructuraOrganizacional', JSON.stringify( c ), { headers: this.headers } ).toPromise().catch( this.handleError );
   }
   
   viewOrganizationalStructure( id: number ) {
      return this.http.get( this.serviceURL+'estructuraOrganizacional/' + id, { headers: this.headers } ).map( res => res.json() as OrganizationalStructure );
   }
   
   viewPadreOrganizationalStructure( id: number ) {
      return this.http.get( this.serviceURL+'estructuraOrganizacional/' + "buscarPadre/" + id, { headers: this.headers } ).map( res => res.json() as OrganizationalStructure );
   }
   
   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
   
   getStrctureTypes() {
      return this.http.get( this.serviceURL+'listasTiposEstructuras/enabled', { headers: this.headers } ).map( ( res: Response ) => res.json()  );
   }
   
   getCostTypes() {
      return this.http.get( this.serviceURL+'centrosCostos/enabled', { headers: this.headers } ).map( ( res: Response ) => res.json()  );
   }
   
   getAreaTypes() {
      return this.http.get( this.serviceURL+'estructuraAreas/enabled', { headers: this.headers } ).map( ( res: Response ) => res.json()  );
   }
   
   getPhysicalTypes() {
      return this.http.get( this.serviceURL+'estructuraFisica/enabled', { headers: this.headers } ).map( ( res: Response ) => res.json()  );
   }
   
}
