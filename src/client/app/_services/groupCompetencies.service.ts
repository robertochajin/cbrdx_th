import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { GroupCompetencies } from '../_models/groupCompetencies';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class GroupCompetenciesServices {

   private masterService = '<%= SVC_TH_URL %>/api/gruposCompetencias/';
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

   getAllEnabled(): Observable<GroupCompetencies[]> {
      return this.authHttp.get( this.masterService + 'enabled/' ).map( ( res: Response ) => res.json() as GroupCompetencies[] );
   }

   getAllEnabledByPosition( idPosition: number ): Observable<GroupCompetencies[]> {
      return this.authHttp.get( this.masterService + 'noAsignadas/' + idPosition )
      .map( ( res: Response ) => res.json() as GroupCompetencies[] );
   }

   add( f: GroupCompetencies ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: GroupCompetencies ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as GroupCompetencies );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

