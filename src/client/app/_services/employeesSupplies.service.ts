import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { EmployessSuppliesAdditional } from '../_models/employessSuppliesAdditional';
import { EmployessSuppliesProjection } from '../_models/employessSuppliesProjection';
import { EmployessSuppliesProjectionSupply } from '../_models/employessSuppliesProjectionSupply';

@Injectable()
export class EmployessSuppliesServices {

   private masterServiceAdditional = '<%= SVC_TH_URL %>/api/tercerosDotacionesAdicionales/';
   private masterServiceProjection = '<%= SVC_TH_URL %>/api/proyeccionesDotacionesTerceros/';
   private masterServiceProjectionSupply = '<%= SVC_TH_URL %>/api/proyeccionesDotacionesTercerosDotaciones/';
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

   getAllAdditionalByIdEmployee(id: number) {
      return this.authHttp.get( this.masterServiceAdditional + 'buscarTercero/' + id)
      .map( ( res: Response ) => res.json() as EmployessSuppliesAdditional[] );
   }

   getAdditional( id: number ) {
      return this.authHttp.get( this.masterServiceAdditional + id )
      .map( ( res: Response ) => res.json() as EmployessSuppliesAdditional );
   }

   addAdditional( f: EmployessSuppliesAdditional ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterServiceAdditional, f )
      .map( ( res: Response ) => res.json() );
   };

   updateAdditional( f: EmployessSuppliesAdditional ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterServiceAdditional, JSON.stringify( f ) ).catch( this.handleError );
   }

   getAllProjection() {
      return this.authHttp.get( this.masterServiceProjection )
      .map( ( res: Response ) => res.json() as EmployessSuppliesProjection[] );
   }

   getProjection( id: number ) {
      return this.authHttp.get( this.masterServiceProjection + id )
      .map( ( res: Response ) => res.json() as EmployessSuppliesProjection );
   }

   addProjection( f: EmployessSuppliesProjection ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterServiceProjection, f )
      .map( ( res: Response ) => res.json() );
   };

   updateProjection( f: EmployessSuppliesProjection ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterServiceProjection, JSON.stringify( f ) ).catch( this.handleError );
   }

   getAllProjectionSupply() {
      return this.authHttp.get( this.masterServiceProjectionSupply )
      .map( ( res: Response ) => res.json() as EmployessSuppliesProjectionSupply[] );
   }

   getProjectionSupply( id: number ) {
      return this.authHttp.get( this.masterServiceProjectionSupply + id )
      .map( ( res: Response ) => res.json() as EmployessSuppliesProjectionSupply );
   }

   addProjectionSupply( f: EmployessSuppliesProjectionSupply ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterServiceProjectionSupply, f )
      .map( ( res: Response ) => res.json() );
   };

   updateProjectionSupply( f: EmployessSuppliesProjectionSupply ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterServiceProjectionSupply, JSON.stringify( f ) ).catch( this.handleError );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

