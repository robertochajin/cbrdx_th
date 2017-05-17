import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Productivity } from '../_models/productivity';

@Injectable()
export class AssignmentProfessionalService {

   private serviceURL = '<%= SVC_TH_URL %>/api/actividadesEconomicas/';
   private serviceTiposURL = '<%= SVC_TH_URL %>/api/actividadesEconomicasTipos/';

   constructor( private authHttp: AuthHttp ) {
   }

   getlistProductivity() {
      return this.authHttp.get( this.serviceURL + 'productividades' ).map( ( res: Response ) => res.json() );
   }

   getlistProductivityByIdCargo( id: number ) {
      return this.authHttp.get( this.serviceURL + 'cargosProductividades/buscarId/' + id )
      .map( ( res: Response ) => {
         if ( res.text() !== '' ) {
            return res.json() as Productivity;
         } else {
            return undefined;
         }
      } );
   }

   add( c: Productivity ) {
      return this.authHttp.post( this.serviceURL + 'cargosProductividades', c ).map( ( res: Response ) => res.json() );
   };

   update( c: Productivity ) {
      return this.authHttp.put( this.serviceURL + 'cargosProductividades', c ).map( ( res: Response ) => res );
   }
}
