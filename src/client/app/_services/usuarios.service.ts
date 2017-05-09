/**
 * Created by jenni on 13/02/2017.
 */
import { Injectable } from '@angular/core';
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
import any = jasmine.any;

@Injectable()
export class UsuariosService extends TercerosService {

   private usuariosServiceURL = '<%= SVC_TH_URL %>/api/usuarios/';
   private usuariosGruposServiceURL = '<%= SVC_TH_URL %>/api/usuariosGruposGestion/';
   private usuariosRolesServiceURL = '<%= SVC_TH_URL %>/api/usuariosRoles/';

   listUsers() {
      return this.authHttp.get( this.usuariosServiceURL ).map( ( res: Response ) => res.json() as Usuario[] );
   }

   listHistory( id: number ) {
      return this.authHttp.get( this.usuariosServiceURL + "auditoria/Usuarios/" + id )
      .map( ( res: Response ) => res.json() as VHistoricoUsuario[] );
   }

   listVUsers() {
      return this.authHttp.get( this.usuariosServiceURL + "vista/" ).map( ( res: Response ) => res.json() as VUsuario[] );
   }

   createUser( p: Usuario ): Promise<Usuario> {
      return this.authHttp.post( this.usuariosServiceURL, JSON.stringify( p ) ).toPromise().then( res => res.json() as Usuario )
      .catch( this.handleError );
   }

   viewUser( id: number ) {
      return this.authHttp.get( this.usuariosServiceURL + "query/" + id ).map( res => res.json() as Usuario );
   }

   updateUser( c: Usuario ) {
      return this.authHttp.put( this.usuariosServiceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   updatePass( c: Usuario ) {
      return this.authHttp.put( this.usuariosServiceURL + "cambiarPass/" + c.contrasenaAntigua + '/', JSON.stringify( c ) ).toPromise()
      .then( res => {
         if ( res.json() == true ) {
            return true;
         } else {
            return false;
         }
      } ).catch( this.handleError );
   }

   createUserGroup( p: UsuarioGrupoGestion ): Promise<UsuarioGrupoGestion> {
      if ( p.fechaInicio !== null ) {
         p.fechaInicio.setHours( 23 );
         p.fechaFin.setHours( 23 );
      }
      return this.authHttp.post( this.usuariosGruposServiceURL, JSON.stringify( p ) ).toPromise()
      .then( res => res.json() as UsuarioGrupoGestion ).catch( this.handleError );
   }

   createUserRole( p: UsuarioRol ): Promise<UsuarioRol> {
      if ( p.fechaInicio !== null ) {
         p.fechaInicio.setHours( 23 );
         p.fechaFin.setHours( 23 );
      }
      return this.authHttp.post( this.usuariosRolesServiceURL, JSON.stringify( p ) ).toPromise().then( res => res.json() as UsuarioRol )
      .catch( this.handleError );
   }

   readUserGroups( p: number ) {
      return this.authHttp.get( this.usuariosGruposServiceURL + "vista/" + p )
      .map( ( res: Response ) => res.json() as VUsuarioGrupoGestion[] );
   }

   readUserRoles( p: number ) {
      return this.authHttp.get( this.usuariosRolesServiceURL + "vista/" + p ).map( ( res: Response ) => res.json() as VUsuarioRol[] );
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
      return this.authHttp.get( this.usuariosRolesServiceURL + "query/" + p ).map( ( res: Response ) => res.json() as UsuarioRol );
   }

   updateUserGroup( c: UsuarioGrupoGestion ) {
      if ( c.fechaInicio !== null && c.indicadorHabilitado ) {
         c.fechaInicio.setHours( 23 );
         c.fechaFin.setHours( 23 );
      }
      return this.authHttp.put( this.usuariosGruposServiceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   updateUserRole( c: UsuarioRol ) {
      if ( c.fechaInicio !== null && c.indicadorHabilitado ) {
         c.fechaInicio.setHours( 23 );
         c.fechaFin.setHours( 23 );
      }
      return this.authHttp.put( this.usuariosRolesServiceURL, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }
}
