import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { References } from '../_models/references';
import { AuthenticationService } from './authentication.service';
import { ReferencesCall } from '../_models/referencesCall';
import { JwtHelper, AuthHttp } from 'angular2-jwt';

@Injectable()
export class ReferencesService {

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
      return this.authHttp.get( this.serviceURL )
      .map( ( res: Response ) => res.json() );
   }

   getAllgetAllByEmployee( idTercero: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosReferencias/buscarTercero/' + idTercero )
      .map( ( res: Response ) => res.json() );
   }

   getById( idTerceroReferencia: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosReferencias/buscarId/' + idTerceroReferencia )
      .map( ( res: Response ) => res.json() );
   }

   add( f: References ) {
      return this.authHttp.post( this.serviceURL + 'tercerosReferencias/', f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: References ) {
      return this.authHttp.put( this.serviceURL + 'tercerosReferencias/', JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosReferencias/buscarId/' + id )
      .map( ( res: Response ) => res.json() as References );
   }

   addCall( f: ReferencesCall ) {
      return this.authHttp.post( this.serviceURL + 'tercerosReferenciasLlamada', f )
      .map( ( res: Response ) => res.json() as ReferencesCall );
   };

   getCallbyReference( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosReferenciasLlamada/terceroReferencia/' + id )
      .map( ( res: Response ) => res.json() as ReferencesCall[] );
   }

   getCall( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosReferenciasLlamada/' + id )
      .map( ( res: Response ) => res.json() as ReferencesCall );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
