import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Productivity } from '../_models/productivity';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class ProductivityService {

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

   getlistProductivity() {
      return this.authHttp.get( this.serviceURL + 'productividades' ).map( ( res: Response ) => res.json() );
   }

   getlistProductivityByIdCargo( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargosProductividades/buscarId/' + id )
      .map( ( res: Response ) => {
         if ( res.text() !== '' ) {
            return res.json() as Productivity;
         } else {
            return undefined;
         }
      } );
   }

   add( c: Productivity ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'cargosProductividades', c ).map( ( res: Response ) => res.json() );
   };

   update( c: Productivity ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'cargosProductividades', c ).map( ( res: Response ) => res );
   }
}
