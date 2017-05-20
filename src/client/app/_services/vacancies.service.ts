import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Vacancies } from '../_models/vacancies';
import { AuthHttp } from 'angular2-jwt';
import { RequirementsAction } from '../_models/requirementsAction';

@Injectable()
export class VacanciesService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'requerimientos' ).map( ( res: Response ) => res.json() as Vacancies[] );
   }

   getByDate( fInicio: string, fFin: string ) {
      return this.authHttp.get( this.serviceURL + 'requerimientos/fecha/' + fInicio + '/'  + fFin)
      .map( ( res: Response ) => res.json() as Vacancies[] );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'requerimientos/' + id ).map( ( res: Response ) => res.json() as Vacancies );
   }

   update( c: Vacancies ) {
      return this.authHttp.put( this.serviceURL + 'requerimientos', c ).map( ( res: Response ) => res.json() );
   }

   setAction( c: RequirementsAction ) {
      return this.authHttp.post( this.serviceURL + 'requerimientosAcciones', c ).map( ( res: Response ) => res.json() );
   }

   getActions( id: number ) {
      return this.authHttp.get( this.serviceURL + 'requerimientosAcciones/requerimiento/' + id ).map( ( res: Response ) => res.json() as RequirementsAction[] );
   }

}
