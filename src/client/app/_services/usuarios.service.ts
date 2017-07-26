/**
 * Created by jenni on 13/02/2017.
 */
import { Injectable, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { TercerosService } from './terceros.service';
import { Usuario } from '../_models/usuario';
import { VUsuario } from '../_models/vUsuario';
import { UsuarioGrupoGestion } from '../_models/usuarioGrupoGestion';
import { UsuarioRol } from '../_models/usuarioRol';
import { VUsuarioRol } from '../_models/vUsuarioRol';
import { VUsuarioGrupoGestion } from '../_models/vUsuarioGrupoGestion';
import { VHistoricoUsuario } from '../_models/vHistoricoUsuario';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import any = jasmine.any;

@Injectable()
export class UsuariosService {

   private refreshServiceURL = '<%= SVC_TH_URL %>/auth/refresh';
   private usuariosServiceURL = '<%= SVC_TH_URL %>/api/usuarios/';
   private usuariosGruposServiceURL = '<%= SVC_TH_URL %>/api/usuariosGruposGestion/';
   private usuariosRolesServiceURL = '<%= SVC_TH_URL %>/api/usuariosRoles/';
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;
   private idUsuario: number;

   constructor( public authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
      }
   }

   listUsers() {
      return this.authHttp.get( this.usuariosServiceURL ).map( ( res: Response ) => res.json() as Usuario[] );
   }

   listHistory( id: number ) {
      return this.authHttp.get( this.usuariosServiceURL + 'auditoria/Usuarios/' + id )
      .map( ( res: Response ) => res.json() as VHistoricoUsuario[] );
   }

   listVUsers() {
      return this.authHttp.get( this.usuariosServiceURL + 'vista/' ).map( ( res: Response ) => res.json() as VUsuario[] );
   }

   createUser( p: Usuario ): Promise<Usuario> {
      p.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.usuariosServiceURL, JSON.stringify( p ) ).toPromise().then( res => res.json() as Usuario )
      .catch( this.handleError );
   }

   viewUser( id: number ) {
      return this.authHttp.get( this.usuariosServiceURL + 'query/' + id ).map( res => res.json() as Usuario );
   }

   updateUser( c: Usuario ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.usuariosServiceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   updatePass( c: Usuario ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.usuariosServiceURL + 'cambiarPass/' + c.contrasenaAntigua + '/', JSON.stringify( c ) ).toPromise()
      .then( res => {
         if ( res.json() === true ) {
            return true;
         } else {
            return false;
         }
      } ).catch( this.handleError );
   }

   createUserGroup( p: UsuarioGrupoGestion ): Promise<UsuarioGrupoGestion> {
      p.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.usuariosGruposServiceURL, JSON.stringify( p ) ).toPromise()
      .then( res => res.json() as UsuarioGrupoGestion ).catch( this.handleError );
   }

   createUserRole( p: UsuarioRol ): Promise<UsuarioRol> {
      p.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.usuariosRolesServiceURL, JSON.stringify( p ) ).toPromise().then( res => res.json() as UsuarioRol )
      .catch( this.handleError );
   }

   readUserGroups( p: number ) {
      return this.authHttp.get( this.usuariosGruposServiceURL + 'vista/' + p )
      .map( ( res: Response ) => res.json() as VUsuarioGrupoGestion[] );
   }

   readUserRoles( p: number ) {
      return this.authHttp.get( this.usuariosRolesServiceURL + 'secure/' + p ).map( ( res: Response ) => res.json() as VUsuarioRol[] );
   }

   readAllUserRoles() {
      return this.authHttp.get( this.usuariosRolesServiceURL ).map( ( res: Response ) => res.json() as UsuarioRol[] );
   }

   readAllUserGroups() {
      return this.authHttp.get( this.usuariosGruposServiceURL ).map( ( res: Response ) => res.json() as UsuarioGrupoGestion[] );
   }

   readUserGroup( p: number ) {
      return this.authHttp.get( this.usuariosGruposServiceURL + p ).map( ( res: Response ) => res.json() as UsuarioGrupoGestion );
   }

   readUserRol( p: number ) {
      return this.authHttp.get( this.usuariosRolesServiceURL + 'query/' + p ).map( ( res: Response ) => res.json() as UsuarioRol );
   }

   updateUserGroup( c: UsuarioGrupoGestion ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.usuariosGruposServiceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   updateUserRole( c: UsuarioRol ) {
      return this.authHttp.put( this.usuariosRolesServiceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   refreshToken() {
      return this.authHttp.get( this.refreshServiceURL ).toPromise().then( res => {
         let token = res.json().token;
         if ( token ) {
            localStorage.setItem( 'token', token );
         }
      } );
   }

   getByRol( rol: string ) {
      return this.authHttp.get( this.usuariosServiceURL + 'usuarioRol/' + rol ).map( ( res: Response ) => res.json() as VUsuario[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

   getUserDOTROL() {
      return this.authHttp.get( this.usuariosServiceURL + 'DOTROL' ).map( res => res.json() as Usuario[] );
   }
}
