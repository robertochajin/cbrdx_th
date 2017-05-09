import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Workexperience } from '../_models/work-experience';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class WorkExperienceService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'tercerosExperienciasLaborales' ).map( ( res: Response ) => res.json() );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosExperienciasLaborales/buscarId/' + id ).map( ( res: Response ) => res.json() );
   }

   getByEmployee( idTercero: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosExperienciasLaborales/buscarTercero/' + idTercero )
      .map( ( res: Response ) => res.json() );
   }

   add( c: Workexperience ) {
      return this.authHttp.post( this.serviceURL + 'tercerosExperienciasLaborales', c ).map( ( res: Response ) => res.json() );
   };

   update( c: Workexperience ) {
      return this.authHttp.put( this.serviceURL + 'tercerosExperienciasLaborales', c ).map( ( res: Response ) => res );
   }

   delete( f: Workexperience ) {
      const respuesta = this.authHttp.delete( '/api/workexperience/' + f.idTerceroExperienciaLaboral );
      return respuesta.map( ( res: Response ) => res.json() );
   }

}
