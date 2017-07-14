import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { VPersonnelRequirement } from '../_models/vPersonnelRequirement';

@Injectable()
export class PersonnelRequirementServices {

   private masterService = '<%= SVC_TH_URL %>/api/requerimientos/';

   constructor( private authHttp: AuthHttp ) {

   }

   getAllEnabledByUser( idUsuario: number ): Observable<PersonnelRequirement[]> {
      return this.authHttp.get( this.masterService + 'byUser/' + idUsuario ).map( ( res: Response ) => res.json() as PersonnelRequirement[] );
   }

   add( f: PersonnelRequirement ) {
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: PersonnelRequirement ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + id )
      .map( ( res: Response ) => res.json() as PersonnelRequirement );
   }
   closeRequirement( id: number ) {
      return this.authHttp.get( this.masterService + 'cerrarRequerimiento/'+ id )
      .map( ( res: Response ) => res.json() as PersonnelRequirement );
   }
   getByIdRequirement( id: number ) {
      return this.authHttp.get( this.masterService + id )
      .map( ( res: Response ) => res.json() as VPersonnelRequirement );
   }
   getHistorical( id: number ) {
      return this.authHttp.get( this.masterService +'requerimientosHistoricos/'+ id )
      .map( ( res: Response ) => res.json() as VPersonnelRequirement );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

