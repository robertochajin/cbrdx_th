import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { RolFuncionalities } from '../_models/rolFuncionalities';
import { RolFunctionalityControl } from '../_models/rolFunctionalityControl';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
@Injectable()
export class RolFuncionalitiesServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/rolesFuncionalidades/';
   private serviceControlURL = '<%= SVC_TH_URL %>/api/rolesFuncionalidadesControles/';
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
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as RolFuncionalities[] );
   }

   getAllByRol( id: number ): Observable<RolFuncionalities[]> {
      return this.authHttp.get( this.serviceURL + 'buscarRol/' + id ).map( ( res: Response ) => res.json() as RolFuncionalities[] );
   }

   getControlByFuncionality( idRol: number, idFun: number ): Observable<RolFunctionalityControl[]> {
      return this.authHttp.get( this.serviceControlURL + 'buscarFuncionalidad/' + idRol + '/' + idFun )
      .map( ( res: Response ) => res.json() as RolFunctionalityControl[] );
   }

   add( f: RolFuncionalities ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: RolFuncionalities ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + '/' + id )
      .map( ( res: Response ) => res.json() as RolFuncionalities );
   }

   addControl( f: RolFunctionalityControl ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceControlURL, f )
      .map( ( res: Response ) => res.json() );
   };

   updateControl( f: RolFunctionalityControl ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceControlURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
