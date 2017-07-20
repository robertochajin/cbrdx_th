import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { EmployeeEventuality } from '../_models/employeeEventuality';
import { EmployeeEventualityAttachment } from '../_models/employeeEventualityAttachment';

@Injectable()
export class EmployeeEventualitiesAttachmentService {

   usuarioLogueado: any;
   idUsuario: number;
   idTercero: number;
   private serviceURL = '<%= SVC_TH_URL %>/api/tercerosNovedadesAdjuntos';
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
      return this.authHttp.get( this.serviceURL + '/' + id ).map( ( res: Response ) => res.json() as EmployeeEventualityAttachment );
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as EmployeeEventualityAttachment[] );
   }

   getAllByIdEventuality( id: number ) {
      return this.authHttp.get( this.serviceURL + '/terceroNovedad/' + id )
      .map( ( res: Response ) => res.json() as EmployeeEventualityAttachment[] );
   }

   add( c: EmployeeEventualityAttachment ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, c ).map( ( res: Response ) => res.json() );
   };

   update( c: EmployeeEventualityAttachment ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, c ).map( ( res: Response ) => res );
   }

}
