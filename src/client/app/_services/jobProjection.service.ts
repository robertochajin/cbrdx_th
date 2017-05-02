import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { JobProjection } from "../_models/jobProjection";
import { OrganizationalStructure } from "../_models/organizationalStructure";
import { OrganizationalStructurePositions } from "../_models/organizationalStructurePositions";
import { Constante } from "../_models/constante";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class JobProjectionService {
   
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   getAll() {
      return this.authHttp.get( this.serviceURL + 'riesgos' ).map( ( res: Response ) => res.json() as JobProjection[] );
   }
   
   getLisTypeStructure() {
      return this.authHttp.get( this.serviceURL + 'estructuraAreas' ).map( ( res: Response ) => res.json() );
   }
   
   getLisStructure( id: number ) {
      return this.authHttp.get( this.serviceURL + 'estructuraOrganizacional/buscarTipo/' + id ).map( ( res: Response ) => res.json() as OrganizationalStructure[] );
   }
   
   getLisStructurePositions( id: number ) {
      return this.authHttp.get( this.serviceURL + 'estructuraOrganizacionalCargos/buscarCargo/' + id ).map( ( res: Response ) => res.json() as OrganizationalStructurePositions[] );
   }
   
   getListJobProjctionByArea( id: number ) {
      return this.authHttp.get( this.serviceURL + 'proyeccionesLaborales/buscarArea/' + id ).map( ( res: Response ) => res.json() as JobProjection[] );
   }
   
   getPositionsById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargos/' + id ).map( ( res: Response ) => res.json() );
   }
   
   getPositions() {
      return this.authHttp.get( this.serviceURL + 'cargos/enabled' ).map( ( res: Response ) => res.json() );
   }
   
   getPending() {
      return this.authHttp.get( this.serviceURL + 'proyeccionesLaborales/consultarPendientes' ).map( ( res: Response ) => res.json() );
   }
   
   getConfirmProjection() {
      return this.authHttp.get( this.serviceURL + 'proyeccionesLaborales/confirmarProyeccion' ).map( ( res: Response ) => res );
   }
   
   getConstantes() {
      return this.authHttp.get( this.serviceURL + 'constantes' ).map( ( res: Response ) => res.json() as Constante[] );
   }
   
   getById( id: number ) {
      return this.authHttp.get( this.serviceURL + 'proyeccionesLaborales/' + id ).map( ( res: Response ) => res.json() as JobProjection );
   }
   
   genPro() {
      return this.authHttp.get( this.serviceURL + 'proyeccionesLaborales/generarProyeccion/1' ).map( ( res: Response ) => res.json() );
   };
   
   update( jp: JobProjection ) {
      return this.authHttp.put( this.serviceURL + 'proyeccionesLaborales', jp ).map( ( res: Response ) => res );
   }
   
   add( jp: JobProjection ) {
      return this.authHttp.post( this.serviceURL + 'proyeccionesLaborales', jp ).map( ( res: Response ) => res.json() as JobProjection );
   }
   
}
