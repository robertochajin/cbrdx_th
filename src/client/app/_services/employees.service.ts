import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Employee } from '../_models/employees';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { EmployeesPublications } from '../_models/employeesPublications';
import { EmployeesAnswersMaster } from '../_models/employeesAnswersMaster';
import { OrganizationalStructurePositions } from '../_models/organizationalStructurePositions';
import { VTercero } from '../_models/vTercero';

@Injectable()
export class EmployeesService {

   usuarioLogueado: any;
   idUsuario: number;
   idTercero: number;
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   private serviceURLTerceros = '<%= SVC_TH_URL %>/tercerosCargos/';
   private serviceTercerosCargosURL = '<%= SVC_TH_URL %>/api/tercerosCargos/tercero/';
   private jwtHelper: JwtHelper = new JwtHelper();

   constructor( private authHttp: AuthHttp ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
         this.idTercero = this.usuarioLogueado.usuario.idTercero;
      }

   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'vterceros' ).map( ( res: Response ) => res.json() as Employee[] );
   }

   getEmployees() {
      return this.authHttp.get( this.serviceURL + 'terceros/area' ).map( ( res: Response ) => res.json() as Employee[] );
   }

   getEmployeesUsers() {
      return this.authHttp.get( this.serviceURL + 'vterceros/tercerosUsuarios' ).map( ( res: Response ) => res.json() as Employee[] );
   }

   getByTipo( type: string ) {
      return this.authHttp.get( this.serviceURL + 'vterceros/buscarTerceros/' + type + '/' ).map( ( res: Response ) => res.json() );
   }

   getByTypeAndWildCard( type: string, wildcard: string ) {
      return this.authHttp.get( this.serviceURL + 'vterceros/buscarTercerosTipo/' + wildcard + '/' + type ).map( ( res: Response ) => res.json() );
   }

   getTerColWithoutPosition( query: string ) {
      return this.authHttp.get( this.serviceURL + 'vterceros/asignarColaborador/' + query.trim() + '/' )
      .map( ( res: Response ) => res.json() );
   }

   add( c: Employee ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'terceros', c ).map( ( res: Response ) => res.json() );
   };

   update( c: Employee ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'terceros', c ).map( ( res: Response ) => res );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'vterceros/' + id ).map( ( res: Response ) => res.json() as Employee );
   }
   getAllByOrganiztionalStructurePosition( c: OrganizationalStructurePositions[] ) {
      return this.authHttp.put( this.serviceURL + 'vterceros/estructuraOrganizacionalCargos', c ).map( ( res: Response ) => res.json() );
   }

   getInfoPositionEmployee(id: number) {
      return this.authHttp.get( this.serviceURL + 'terceros/tercerosCargosAreasFisica/' + id ).map( ( res: Response ) => {
         if(res.text() !== ''){
            return res.json();
         } else {
            return undefined;
         }
      });
   }

   getByNameAndArea( idArea: number, query: string ) {
      return this.authHttp.get( this.serviceURL + 'terceros/buscarJefes/'+idArea+'/' + query )
      .map( ( res: Response ) => res.json());
   }

   getByNameAndAreaAndCargo( idArea: number, query: string , idCargo: number) {
      return this.authHttp.get( this.serviceURL + 'terceros/buscarJefes/'+idArea+'/' + query + '/' +idCargo)
      .map( ( res: Response ) => res.json());
   }

   getNacionalidad( id: number ) {
      return this.authHttp.get( this.serviceURL + '/vista/' + id ).map( ( res: Response ) => res.json() );
   }

   getCargoActual( id: number ) {
      return this.authHttp.get( this.serviceURLTerceros + '/tercerosCargos/' + id ).map( ( res: Response ) => res.json() );
   }
   getEmployeePositionByIdEmployee(id: number){
      return this.authHttp.get( this.serviceTercerosCargosURL + id ).map( ( res: Response ) => res.json() );
   }
   delete( c: Employee ) {
      c.auditoriaUsuario = this.idUsuario;
      const respuesta = this.authHttp.delete( this.serviceURL + '/' + c.idTercero );
      return respuesta.map( ( res: Response ) => res.json() );
   }

   validateDocument( numeroDocumento: string, idTipoDocumento: number ) {
      return this.authHttp.get( this.serviceURL + 'terceros/' + numeroDocumento + '/' + idTipoDocumento + '/' )
      .map( ( res: Response ) => {
         if ( res.text() !== '' ) {
            return res.json() as Employee;
         } else {
            return undefined;
         }
      } );
   }

   addPublication( c: EmployeesPublications ) {
      c.auditoriaUsuario = this.idUsuario;
      c.idTercero = this.idTercero;
      return this.authHttp.post( this.serviceURL + 'tercerosPublicaciones', c )
      .map( ( res: Response ) => res.json() as EmployeesPublications );
   };

   getPublication( idPublicacion: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosPublicaciones/terceroPublicacion/' + this.idTercero + '/' + idPublicacion )
      .map( ( res: Response ) => res.json() as EmployeesPublications[] );
   }

   getPublicationById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosPublicaciones/' + id )
      .map( ( res: Response ) => res.json() as EmployeesPublications );
   }

   updatetPublication( c: EmployeesPublications ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'tercerosPublicaciones', c ).map( ( res: Response ) => res );
   }

   getPublicationAnswerMaster( idTercerosPublicaciones: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosPublicacionesMaestrosRespuestas/terceroPublicacion/' + idTercerosPublicaciones )
      .map( ( res: Response ) => res.json() as EmployeesAnswersMaster[] );
   }

   addPublicationAnswerMaster( c: EmployeesAnswersMaster ) {
      return this.authHttp.post( this.serviceURL + 'tercerosPublicacionesMaestrosRespuestas', c )
      .map( ( res: Response ) => res.json() as EmployeesAnswersMaster );
   }

}
