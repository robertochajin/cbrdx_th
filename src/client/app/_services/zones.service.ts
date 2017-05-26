import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Zones } from '../_models/zones';

@Injectable()
export class ZonesServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/zonas/';
   private jwtHelper: JwtHelper = new JwtHelper();
   private idUsuario: number;

   constructor( private authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         let decodedToken = this.jwtHelper.decodeToken( token );
         this.idUsuario = decodedToken.usuario.idUsuario;
      }
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as Zones[] );
   }

   getAllByOrganizationalStructure(idOrganizationalStructure: number) {
      return this.authHttp.get( this.serviceURL + 'byEstrucOrganizacional/' + idOrganizationalStructure ).map( ( res: Response ) => res.json() as Zones[] );
   }

   add( f: Zones ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: Zones ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as Zones );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
