import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { EmployeesRecruitment } from '../_models/employeesRecruitment';

@Injectable()
export class EmployeesRecruitmentService {

   private masterService = '<%= SVC_TH_URL %>/api/tercerosPublicaciones/historic/';
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

   getEmployeesStep(id:number){
      return this.authHttp.get( this.masterService + id )
      .map( ( res: Response ) => res.json() as EmployeesRecruitment[] );
   }

   getEmployeesStepDetail(id:number){
      return this.authHttp.get( this.serviceURL + 'procesoSeleccion/publicacion/' + id )
      .map( ( res: Response ) => res.json()  );
   }

}