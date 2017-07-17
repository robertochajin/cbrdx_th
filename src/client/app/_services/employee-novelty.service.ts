import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Employee } from '../_models/employees';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class EmployeeNoveltyService {

   usuarioLogueado: any;
   idUsuario: number;
   idTercero: number;
   private serviceURL = '<%= SVC_TH_URL %>/api/';
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
      return this.authHttp.get( this.serviceURL + 'vterceros/' + id ).map( ( res: Response ) => res.json() as Employee );
   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'vterceros' ).map( ( res: Response ) => res.json() as Employee[] );
   }

   add( c: Employee ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'terceros', c ).map( ( res: Response ) => res.json() );
   };

   update( c: Employee ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'terceros', c ).map( ( res: Response ) => res );
   }

}
