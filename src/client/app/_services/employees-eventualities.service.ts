import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { EmployeeEventuality } from '../_models/employeeEventuality';

@Injectable()
export class EmployeeEventualitiesService {

   usuarioLogueado: any;
   idUsuario: number;
   idTercero: number;
   private serviceURL = '<%= SVC_TH_URL %>/api/tercerosNovedades';
   private serviceURLEventuality = '<%= SVC_TH_URL %>/api/novedades/';
   private serviceURLEventualityField = '<%= SVC_TH_URL %>/api/novedadesCampos/novedad/';
   private jwtHelper: JwtHelper = new JwtHelper();

   constructor( private authHttp: AuthHttp ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
         this.idTercero = this.usuarioLogueado.usuario.idTercero;
      }

   }

   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + '/' + id ).map( ( res: Response ) => res.json() as EmployeeEventuality );
   }

   getAllByIdEmployee( id: number ) {
      return this.authHttp.get( this.serviceURL + '/tercero/' + id ).map( ( res: Response ) => res.json() as EmployeeEventuality[] );
   }

   getAllByIdType( id: number ) {
      return this.authHttp.get( this.serviceURLEventuality + 'tipoNovedad/' + id ).map( ( res: Response ) => res.json() as any[] );
   }

   getEventualityById( id: number ) {
      return this.authHttp.get( this.serviceURLEventuality + id ).map( ( res: Response ) => res.json() as any[] );
   }

   getFieldByIdEventuality( id: number ) {
      return this.authHttp.get( this.serviceURLEventualityField + id ).map( ( res: Response ) => res.json() as any[] );
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as EmployeeEventuality[] );
   }

   getByDate( fInicio: string, fFin: string ) {
      return this.authHttp.get( this.serviceURL + '/filtroFechas/' + fInicio + '/' + fFin + '/' )
      .map( ( res: Response ) => res.json() as EmployeeEventuality[] );
   }

   add( c: EmployeeEventuality ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, c ).map( ( res: Response ) => res.json() );
   };

   update( c: EmployeeEventuality ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, c ).map( ( res: Response ) => res );
   }

   getAllAccidents( ) {
      return this.authHttp.get( this.serviceURL + '/incidentesAccidentes').map( ( res: Response ) => res.json() as EmployeeEventuality[] );
   }

}
