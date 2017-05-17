import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Functionality } from '../_models/functionality';
import { FunctionalityControl } from '../_models/functionalityContorl';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class FormManagerService {

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

   add( r: Functionality ) {
      r.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'funcionalidades', r ).map( ( res: Response ) => res.json() );
   };

   update( r: Functionality ) {
      r.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'funcionalidades', r ).catch( this.handleError );
   };

   addSection( r: FunctionalityControl ) {
      r.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'funcionalidadesControles', r ).map( ( res: Response ) => res.json() );
   };

   addField( r: FunctionalityControl ) {
      r.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'funcionalidadesControles', r ).map( ( res: Response ) => res.json() );
   };

   updateField( r: FunctionalityControl ) {
      r.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'funcionalidadesControles', r ).catch( this.handleError );
   };

   updateSection( r: FunctionalityControl ) {
      r.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'funcionalidadesControles', r ).catch( this.handleError );
   };

   getAllFunctionalityControl() {
      return this.authHttp.get( this.serviceURL + 'funcionalidadesControles' )
      .map( ( res: Response ) => res.json() as FunctionalityControl[] );
   }

   getAllFunctionality() {
      return this.authHttp.get( this.serviceURL + 'funcionalidades' ).map( ( res: Response ) => res.json() as Functionality[] );
   }

   getFunctionalityById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'funcionalidades/id/' + id ).map( ( res: Response ) => res.json() as Functionality );
   }

   getFunctionality() {
      return this.authHttp.get( this.serviceURL + 'menus/idPadreDifCero' ).map( ( res: Response ) => res.json() );
   }

   getSectionByIdFuncionalidad( id: number ) {
      return this.authHttp.get( this.serviceURL + 'funcionalidadesControles/secycam/' + id + '/true' )
      .map( ( res: Response ) => res.json() );
   }

   getFieldByIdFuncionalidad( id: number ) {
      return this.authHttp.get( this.serviceURL + 'funcionalidadesControles/secycam/' + id + '/false' )
      .map( ( res: Response ) => res.json() );
   }

   getFieldByIdFather( id: number ) {
      return this.authHttp.get( this.serviceURL + 'funcionalidadesControles/buscarPadre/' + id ).map( ( res: Response ) => res.json() );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

   getAllEnabled() {
      return this.authHttp.get( this.serviceURL + 'funcionalidades/enabled' ).map( ( res: Response ) => res.json() as Functionality[] );
   }

   getFuncionalidadesControlesEnabled() {
      return this.authHttp.get( this.serviceURL + 'funcionalidadesControles/enabled' )
      .map( ( res: Response ) => res.json() as FunctionalityControl[] );
   }

}
