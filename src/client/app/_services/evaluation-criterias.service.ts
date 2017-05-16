import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { EvaluationCriterias } from '../_models/evaluationCriterias';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class EvaluationCriteriasServices {

   public headers = new Headers( { 'Content-Type': 'application/json' } );
   private masterService = '<%= SVC_TH_URL %>/api/criterios/';
   private detailService = '<%= SVC_TH_URL %>/api/criterios/';
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
   getAllEnabled() {
      return this.authHttp.get( this.masterService + 'enabled/' ).map( ( res: Response ) => res.json() as EvaluationCriterias[] );
   }

}

