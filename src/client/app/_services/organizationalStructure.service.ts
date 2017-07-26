import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { OrganizationalStructure } from '../_models/organizationalStructure';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class OrganizationalStructureService {

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

   listOrganizationalStructure() {
      return this.authHttp.get( this.serviceURL + 'estructuraOrganizacional' )
      .map( ( res: Response ) => res.json() as OrganizationalStructure[] );
   }

   getAllEnabled() {
      return this.authHttp.get( this.serviceURL + 'estructuraOrganizacional/enabled' )
      .map( ( res: Response ) => res.json() as OrganizationalStructure[] );
   }

   addOrganizationalStructure( c: OrganizationalStructure ): Promise<OrganizationalStructure> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'estructuraOrganizacional', JSON.stringify( c ) ).toPromise()
      .then( res => res.json() as OrganizationalStructure ).catch( this.handleError );
   };

   updateOrganizationalStructure( c: OrganizationalStructure ): Promise<any> {
      c.auditoriaUsuario = this.idUsuario;
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

   getAreaBySuppliesGroup( id: number ) {
      return this.authHttp.get( this.serviceURL + '/estructuraOrganizacional/grupoDotacion/' + id )
      .map( res => res.json() as OrganizationalStructure[] );
   }

}
