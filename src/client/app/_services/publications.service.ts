/**
 * Created by Andres on 31/05/2017.
 */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Publications } from '../_models/publications';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class PublicationsService {

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

   getlistPublications() {
      return this.authHttp.get( this.serviceURL + 'publicaciones' ).map( ( res: Response ) => res.json() );
   }
   getById(id: number) {
      return this.authHttp.get( this.serviceURL + 'publicaciones/'+id ).map( ( res: Response ) => res.json() );
   }
   //
   // getlistPublicationsByIdCargo( id: number ) {
   //    return this.authHttp.get( this.serviceURL + 'cargosProductividades/buscarId/' + id )
   //    .map( ( res: Response ) => {
   //       if ( res.text() !== '' ) {
   //          return res.json() as Publications;
   //       } else {
   //          return undefined;
   //       }
   //    } );
   // }
   //
   // add( c: Publications ) {
   //    c.auditoriaUsuario = this.idUsuario;
   //    return this.authHttp.post( this.serviceURL + 'cargosProductividades', c ).map( ( res: Response ) => res.json() );
   // };
   //
   // update( c: Publications ) {
   //    c.auditoriaUsuario = this.idUsuario;
   //    return this.authHttp.put( this.serviceURL + 'cargosProductividades', c ).map( ( res: Response ) => res );
   // }
}
