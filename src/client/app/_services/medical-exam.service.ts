import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { MedicalExam } from '../_models/medicalExam';

@Injectable()
export class MedicalExamService {

   serviceURL = '<%= SVC_TH_URL %>/api/examenesMedicos';
   serviceURLRisk = '<%= SVC_TH_URL %>/api/procesoSeleccion/compareCargo/';
   headers = new Headers( { 'Content-Type': 'application/json' } );
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
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as MedicalExam[] );
   }

   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + '/' + id ).map( ( res: Response ) => res.json() as MedicalExam );
   }

   commpareRisk( id: number ) {
      return this.authHttp.get( this.serviceURLRisk + id ).map( ( res: Response ) => res.json() );
   }

   getByIdProceso( id: number ) {
      return this.authHttp.get( this.serviceURL + '/procesoSeleccion/' + id ).map( ( res: Response ) => res.json() as MedicalExam );
   }

   add( c: MedicalExam ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, c ).map( ( res: Response ) => res.json()  as MedicalExam );
   };

   update( c: MedicalExam ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, c ).map( ( res: Response ) => res );
   }

}
