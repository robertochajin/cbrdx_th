import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Workexperience } from '../_models/work-experience';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class WorkExperienceService {

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

   getAll() {
      return this.authHttp.get( this.serviceURL + 'tercerosExperienciasLaborales' ).map( ( res: Response ) => res.json() );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosExperienciasLaborales/buscarId/' + id ).map( ( res: Response ) => res.json() );
   }

   getByEmployee( idTercero: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosExperienciasLaborales/buscarTercero/' + idTercero )
      .map( ( res: Response ) => res.json() );
   }

   add( c: Workexperience ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'tercerosExperienciasLaborales', c ).map( ( res: Response ) => res.json() );
   };

   update( c: Workexperience ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'tercerosExperienciasLaborales', c ).map( ( res: Response ) => res );
   }

   delete( f: Workexperience ) {
      const respuesta = this.authHttp.delete( '/api/workexperience/' + f.idTerceroExperienciaLaboral );
      return respuesta.map( ( res: Response ) => res.json() );
   }

}
