import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { SuppliesProjectionOrganizationalStructure } from '../_models/suppliesProjectionOrganizationalStructure';

@Injectable()
export class SuppliesProjectionOrganizationalStructureServices {

   private masterService = '<%= SVC_TH_URL %>/api/';
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

   getAll() {
      return this.authHttp.get( this.masterService + 'proyeccionDotacionEstructuraOrganizacional' )
      .map( ( res: Response ) => res.json() as SuppliesProjectionOrganizationalStructure[] );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'proyeccionDotacionEstructuraOrganizacional/' + id )
      .map( ( res: Response ) => res.json() as SuppliesProjectionOrganizationalStructure );
   }

   getByProjection( idDotacion: number, idProyeccionDotacion: number ) {
      return this.authHttp.get(
         this.masterService + 'proyeccionDotacionEstructuraOrganizacional/proyeccionDotacion/' + idProyeccionDotacion )
      .map( ( res: Response ) => res.json() as SuppliesProjectionOrganizationalStructure[] );
   }

   add( f: SuppliesProjectionOrganizationalStructure ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService + 'proyeccionDotacionEstructuraOrganizacional', f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: SuppliesProjectionOrganizationalStructure ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService + 'proyeccionDotacionEstructuraOrganizacional', JSON.stringify( f ) )
      .catch( this.handleError );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

