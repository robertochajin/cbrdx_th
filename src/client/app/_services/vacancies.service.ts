import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { RequirementsAction } from '../_models/requirementsAction';
import { PersonnelRequirement } from '../_models/personnelRequirement';

@Injectable()
export class VacanciesService {

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
      return this.authHttp.get( this.serviceURL + 'requerimientos' ).map( ( res: Response ) => res.json() as PersonnelRequirement[] );
   }

   getByRespSelecAndIdEstad( idR: number, idE: number ) {
      return this.authHttp.get( this.serviceURL + 'requerimientos/filtroReq/' + idE + '/' + idR ).map( ( res: Response ) =>
                                                                                                          res.json() as PersonnelRequirement[] );
   }

   getNuevoCargo( idEstado: number, idTipo: number ) {
      let idUsuario = this.idUsuario;
      return this.authHttp.get( this.serviceURL + 'requerimientos/filtroReq2/' + idEstado + '/' + idTipo )
      .map( ( res: Response ) => res.json() as PersonnelRequirement[] );
   }

   getByDate( fInicio: string, fFin: string ) {
      return this.authHttp.get( this.serviceURL + 'requerimientos/fecha/' + fInicio + '/' + fFin )
      .map( ( res: Response ) => res.json() as PersonnelRequirement[] );
   }

   getNActive( quantity: number ) {
      return this.authHttp.get( this.serviceURL + 'requerimientos/publicacionFechas/cantidadN/' + quantity )
      .map( ( res: Response ) => res.json() as PersonnelRequirement[] );
   }

   getAllActive() {
      return this.authHttp.get( this.serviceURL + 'requerimientos/publicacionFechas/todasActivas/' )
      .map( ( res: Response ) => res.json() as PersonnelRequirement[] );
   }

   getPublication( idPublicacion: number ) {
      return this.authHttp.get( this.serviceURL + 'requerimientos/publicacion/' + idPublicacion ).map(
         ( res: Response ) => res.json() as PersonnelRequirement );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'requerimientos/' + id ).map( ( res: Response ) => res.json() as PersonnelRequirement );
   }

   update( f: PersonnelRequirement ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   setAction( c: RequirementsAction ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'requerimientosAcciones', c ).map( ( res: Response ) => res.json() );
   }

   getActions( id: number ) {
      return this.authHttp.get( this.serviceURL + 'requerimientosAcciones/requerimiento/' + id )
      .map( ( res: Response ) => res.json() as RequirementsAction[] );
   }

   asignarProceso( id: number ) {
      return this.authHttp.get( this.serviceURL + 'publicaciones/agregarIdProceso/' + id )
      .map( ( res: Response ) => res.json() as RequirementsAction[] );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
