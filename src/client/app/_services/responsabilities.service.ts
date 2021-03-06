import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Responsabilities } from '../_models/responsabilities';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class ResponsabilitiesServices {

   private masterService = '<%= SVC_TH_URL %>/api/responsabilidades/';
   private detailService = '<%= SVC_TH_URL %>/api/responsabilidades/';
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

   getAllEnabled(): Observable<Responsabilities[]> {
      return this.authHttp.get( this.masterService + 'enabled/' ).map( ( res: Response ) => res.json() as Responsabilities[] );
   }

   getAllEnabledByPosition( idPosition: number ): Observable<Responsabilities[]> {
      return this.authHttp.get( this.masterService + 'noAsignadas/' + idPosition )
      .map( ( res: Response ) => res.json() as Responsabilities[] );
   }

}

