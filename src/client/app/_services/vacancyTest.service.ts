import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { VacancyTest } from '../_models/vacancyTest';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class VacancyTestServices {

   private masterService = '<%= SVC_TH_URL %>/api/procesoSeleccionPruebasTecnicas/';
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

   getAllEnabledBySelectionProcess( idProcess: number ): Observable<VacancyTest[]> {
      return this.authHttp.get( this.masterService + 'procesoSeleccion/' + idProcess )
      .map( ( res: Response ) => res.json() as VacancyTest[] );
   }

   /**
    * Este método es utilizado para agregar  por primera vez, las pruebas técnicas preconfiguradas en
    * el requerimiento de personal
    * @param idProcess : proceso de seleccion
    * @param idThirdPublication : Tercero publicacion
    * @returns {Observable<VacancyTest[]>}
    */
   initializeTestList( idProcess: number, idThirdPublication: number ): Observable<VacancyTest[]> {
      return this.authHttp.get( this.masterService + 'procesoSeleccion/' + idProcess + '/inicializar/' + idThirdPublication )
      .map( ( res: Response ) => res.json() as VacancyTest[] );
   }

   add( f: VacancyTest ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: VacancyTest ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as VacancyTest );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

