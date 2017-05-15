import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Competencies } from '../_models/competencies';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CompetenciesServices {

   private masterService = '<%= SVC_TH_URL %>/api/competencias/';

   constructor( private authHttp: AuthHttp ) {

   }

   getAllEnabledByGroup( idGrupo: number ): Observable<Competencies[]> {
      return this.authHttp.get( this.masterService + 'enabled/' + idGrupo ).map( ( res: Response ) => res.json() as Competencies[] );
   }

   getAllByGroup( idGrupo: number ): Observable<Competencies[]> {
      return this.authHttp.get( this.masterService + 'buscarGrupo/' + idGrupo ).map( ( res: Response ) => res.json() as Competencies[] );
   }

   add( f: Competencies ) {
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: Competencies ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as Competencies );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}

