import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Rol } from '../_models/rol';
import { VRolMenuElemento } from '../_models/vRolMenuElemento';
import { RolCantidad } from '../_models/RolCantidad';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class RolesService {
   private masterService = '<%= SVC_TH_URL %>/api/roles/';
   private detailService = '<%= SVC_TH_URL %>/api/rolesMenuElementos/';
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

   listRoles() {
      return this.authHttp.get( this.masterService ).map( ( res: Response ) => res.json() as Rol[] );
   }

   listRolesByUser(userId: number) {
      return this.authHttp.get( this.masterService + 'usuario/' + userId ).map( ( res: Response ) => res.json() as Rol[] );
   }

   getDashboardData() {
      return this.authHttp.get( this.masterService + 'dashboard/' ).map( ( res: Response ) => res.json() as RolCantidad[] );
   }

   getAvaliableFunctions( c: number ) {
      return this.authHttp.get( this.masterService + 'usuario/' + c ).map( ( res: Response ) => res.json() as Rol[] );
   }

   getAssignedFunctions( c: number ) {
      return this.authHttp.get( this.detailService + 'vista/' + c ).map( ( res: Response ) => res.json() as VRolMenuElemento[] );
   }

   addRole( c: Rol ): Promise<Rol> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, JSON.stringify( c ) ).toPromise().then( res => res.json() as Rol )
      .catch( this.handleError );
   };

   updateRole( c: Rol ): Promise<any> {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( c ) ).toPromise().catch( this.handleError );
   }

   viewRole( id: number ) {
      return this.authHttp.get( this.masterService + id ).map( res => res.json() as Rol );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
