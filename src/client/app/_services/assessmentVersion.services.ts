import { Injectable } from '@angular/core';
import { Response, ResponseContentType } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { AssessmentVersion } from '../_models/assessmentVersion';

@Injectable()
export class AssessmentVersionServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/';
   private masterService = '<%= SVC_TH_URL %>/api/valoracionesRiesgos/';
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
      return this.authHttp.get( this.masterService ).map( ( res: Response ) => res.json() as AssessmentVersion[]);
   }

   add( f: AssessmentVersion ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: AssessmentVersion ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as AssessmentVersion );
   }

   /**
    * Genera una nueva versión del mapa de riesgos
    * @returns {Observable<Response Blob>}
    */
   generateNewRiskMap(idUsuario: number) {
      return this.authHttp.get( this.serviceURL + 'mapa/alfresco/' + idUsuario, { responseType: ResponseContentType.Blob }).map(
         ( res ) => {
            return new Blob( [ res.blob() ], { type: res.headers.get( 'content-type' ) } );
         } );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

