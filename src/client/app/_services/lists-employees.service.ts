import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { TiposPersonas } from "../_models/tiposPersonas";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class ListEmployeesService {
   
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   getListPersonTypes() {
      return this.authHttp.get( this.serviceURL + "tiposPersonas/" ).map( ( res: Response ) => res.json() as TiposPersonas[] );
   }
   
   getDocumentTypes() {
      return this.authHttp.get( this.serviceURL + "tiposDocumentos/" ).map( ( res: Response ) => res.json() );
   }
   
   getGenderTypes() {
      return this.authHttp.get( this.serviceURL + "generos/" ).map( ( res: Response ) => res.json() );
   }
   
   getMaritalStatusTypes() {
      return this.authHttp.get( this.serviceURL + "estadosCiviles/" ).map( ( res: Response ) => res.json() );
   }
   
   getRhRactorTypes() {
      return this.authHttp.get( this.serviceURL + "factorRh/" ).map( ( res: Response ) => res.json() );
   }
   
   getHealthTypes() {
      return this.authHttp.get( this.serviceURL + "coberturasSalud/" ).map( ( res: Response ) => res.json() );
   }
   
   getOccupationsTypes() {
      return this.authHttp.get( this.serviceURL + "tiposOcupaciones/" ).map( ( res: Response ) => res.json() );
   }
   
   getAcademicLevelTypes() {
      return this.authHttp.get( this.serviceURL + "nivelesEstudios/" ).map( ( res: Response ) => res.json() );
   }
   
   getAffiliationTypes() {
      return this.authHttp.get( this.serviceURL + "tiposAfiliacion/" ).map( ( res: Response ) => res.json() );
   }
   
   getTerType( val: string ) {
      return this.authHttp.get( this.serviceURL + "listasTiposTerceros/buscarCodigo/" + val + "/" ).map( ( res: Response ) => res.json() );
   }
   
   getlistStratum() {
      return this.authHttp.get( this.serviceURL + "listasEstratos" ).map( ( res: Response ) => res.json() );
   }
   
   getlistLocation( c: number ) {
      return this.authHttp.get( this.serviceURL + "/localizaciones/buscarTercero/" + c ).map( ( res: Response ) => res.json() );
   }
   
   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
   
}

