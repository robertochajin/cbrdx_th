import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Vacancies } from '../_models/vacancies';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class VacanciesService {

   private serviceURL = '<%= SVC_TH_URL %>/api/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'requerimientos' ).map( ( res: Response ) => res.json() as Vacancies[] );
   }
   /*getAll() {
      return this.authHttp.get( this.serviceURL + 'vterceros' ).map( ( res: Response ) => res.json() as Vacancies[] );
   }

   getByTipo( type: string ) {
      return this.authHttp.get( this.serviceURL + 'vterceros/buscarTerceros/' + type + '/' ).map( ( res: Response ) => res.json() );
   }

   getTerColWithoutPosition( query: string ) {
      return this.authHttp.get( this.serviceURL + 'vterceros/asignarColaborador/' + query.trim() + '/' )
      .map( ( res: Response ) => res.json() );
   }

   add( c: Vacancies ) {
      return this.authHttp.post( this.serviceURL + 'terceros', c ).map( ( res: Response ) => res.json() );
   };

   update( c: Vacancies ) {
      return this.authHttp.put( this.serviceURL + 'terceros', c ).map( ( res: Response ) => res );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'vterceros/' + id ).map( ( res: Response ) => res.json() as Vacancies );
   }

   getNacionalidad( id: number ) {
      return this.authHttp.get( this.serviceURL + '/vista/' + id ).map( ( res: Response ) => res.json() );
   }

   getCargoActual( id: number ) {
      return this.authHttp.get( this.serviceURLTerceros + '/tercerosCargos/' + id ).map( ( res: Response ) => res.json() );
   }

   delete( c: Vacancies ) {
      const respuesta = this.authHttp.delete( this.serviceURL + '/' + c.idTercero );
      return respuesta.map( ( res: Response ) => res.json() );
   }

   validateDocument( numeroDocumento: string, idTipoDocumento: number ) {
      return this.authHttp.get( this.serviceURL + 'terceros/' + numeroDocumento + '/' + idTipoDocumento + '/' )
      .map( ( res: Response ) => {
         if ( res.text() !== '' ) {
            return res.json() as Vacancies;
         } else {
            return undefined;
         }
      } );
   }*/

}
