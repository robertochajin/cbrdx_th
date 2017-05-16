import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { PositionCriterias } from '../_models/positionCriterias';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class PositionCriteriasService {

   private serviceURL = '<%= SVC_TH_URL %>/api/cargosCriterios/';
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
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as PositionCriterias[] );
   }

   getAllByPosition( id: number ) {
      return this.authHttp.get( this.serviceURL + 'enabled/' + id ).map( ( res: Response ) => res.json() );
   }

   add( f: PositionCriterias ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   addInBulk( pcs: PositionCriterias[] ) {
      return this.authHttp.post( this.serviceURL, JSON.stringify( pcs ) ).map( ( res: Response ) => res.json() );
   };

   update( f: PositionCriterias ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as PositionCriterias );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
