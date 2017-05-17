import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { EmployeesClinicalData } from '../_models/employeesClinicalData';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class ClinicalInformationService {

   private masterService = '<%= SVC_TH_URL %>/api/tercerosDatosClinicos/';
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

   getAllByEmployee( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarTercero/' + id )
      .map( ( res: Response ) => res.json() as EmployeesClinicalData[] );
   }

   getById( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id ).map( ( res: Response ) => res.json() );
   }

   add( c: EmployeesClinicalData ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, c ).map( ( res: Response ) => res.json() as EmployeesClinicalData );
   }

   update( f: EmployeesClinicalData ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

