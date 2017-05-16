import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { EmployeeEstate } from '../_models/employee-estate';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class EmployeeEstateService {

   serviceURL = '<%= SVC_TH_URL %>/api/';
   headers = new Headers( { 'Content-Type': 'application/json' } );
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
      return this.authHttp.get( this.serviceURL + 'tercerosInmuebles' ).map( ( res: Response ) => res.json() );
   }

   getByEmployee( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosInmuebles/buscarTercero/' + id )
      .map( ( res: Response ) => res.json() as EmployeeEstate[] );
   }

   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosInmuebles/' + id ).map( ( res: Response ) => res.json() as EmployeeEstate );
   }

   getByIdTercero( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosInmuebles/buscarTercero/' + id )
      .map( ( res: Response ) => res.json() as EmployeeEstate );
   }

   add( c: EmployeeEstate ) {
      return this.authHttp.post( this.serviceURL + 'tercerosInmuebles', c ).map( ( res: Response ) => res.json() );
   };

   update( c: EmployeeEstate ) {
      return this.authHttp.put( this.serviceURL + 'tercerosInmuebles', c ).map( ( res: Response ) => res );
   }

   delete( c: EmployeeEstate ) {
      const respuesta = this.authHttp.delete( this.serviceURL + '/' + c.idTerceroInmueble );
      return respuesta.map( ( res: Response ) => res.json() );
   }
}
