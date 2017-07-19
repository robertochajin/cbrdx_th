import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Supplies } from '../_models/supplies';
import { SuppliesGroups } from '../_models/suppliesGroups';
import { SuppliesPosition } from '../_models/suppliesPosition';

@Injectable()
export class SuppliesService {

   private masterService = '<%= SVC_TH_URL %>/api/';
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
      return this.authHttp.get( this.masterService + 'gruposDotaciones' )
      .map( ( res: Response ) => res.json() as SuppliesGroups[] );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'gruposDotaciones/' + id )
      .map( ( res: Response ) => res.json() as SuppliesGroups );
   }

   getByCode( code: string ) {
      return this.authHttp.get( this.masterService + 'gruposDotaciones/code/' + code )
      .map( ( res: Response ) => res.json() as SuppliesGroups );
   }

   add( f: SuppliesGroups ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService + 'gruposDotaciones', f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: SuppliesGroups ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService + 'gruposDotaciones', JSON.stringify( f ) ).catch( this.handleError );
   }

   getAllEnabled() {
      return this.authHttp.get( this.masterService + 'gruposCuestionarios/enabled/' )
      .map( ( res: Response ) => res.json() as Supplies[] );
   }

   getSupplies( id: number ) {
      return this.authHttp.get( this.masterService + 'dotaciones/grupoDotacion/' + id )
      .map( ( res: Response ) => res.json() as Supplies[] );
   }

   getSuppliesEnable() {
      return this.authHttp.get( this.masterService + 'dotaciones/enabled/' )
      .map( ( res: Response ) => res.json() as Supplies[] );
   }

   getSupply( id: number ) {
      return this.authHttp.get( this.masterService + 'dotaciones/' + id )
      .map( ( res: Response ) => res.json() as Supplies );
   }

   getAllSupply() {
      return this.authHttp.get( this.masterService + 'dotaciones' )
      .map( ( res: Response ) => res.json() as Supplies[] );
   }

   addSupply( f: Supplies ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService + 'dotaciones', f )
      .map( ( res: Response ) => res.json() );
   };

   updateSupply( f: Supplies ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService + 'dotaciones', JSON.stringify( f ) ).catch( this.handleError );
   }

   getPosition( id: number ) {
      return this.authHttp.get( this.masterService + 'cargosDotaciones/grupoDotacion/' + id )
      .map( ( res: Response ) => res.json() as SuppliesPosition[] );
   }

   addPosition( f: SuppliesPosition ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService + 'cargosDotaciones', f )
      .map( ( res: Response ) => res.json() );
   };

   updatePosition( f: SuppliesPosition ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService + 'cargosDotaciones', JSON.stringify( f ) ).catch( this.handleError );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

