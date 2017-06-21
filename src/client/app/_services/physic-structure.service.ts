import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { PhysicStructure } from '../_models/physic-structure';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class PhysicStructureService {

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
      return this.authHttp.get( this.serviceURL + 'estructuraFisica' ).map( ( res: Response ) => res.json() as PhysicStructure[] );
   }
   getAllEnabled() {
      return this.authHttp.get( this.serviceURL + 'estructuraFisica/enabled' ).map( ( res: Response ) => res.json() as PhysicStructure[] );
   }

   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'estructuraFisica/' + id ).map( ( res: Response ) => res.json() as PhysicStructure );
   }

   add( c: PhysicStructure ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'estructuraFisica', c ).map( ( res: Response ) => res.json() );
   };

   update( c: PhysicStructure ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'estructuraFisica', c ).map( ( res: Response ) => res );
   }

}
