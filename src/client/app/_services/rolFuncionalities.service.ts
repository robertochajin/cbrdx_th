import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from "rxjs";
import { RolFuncionalities } from "../_models/rolFuncionalities";
import { RolFunctionalityControl } from "../_models/rolFunctionalityControl";
import { AuthHttp } from 'angular2-jwt';
@Injectable()
export class RolFuncionalitiesServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/rolesFuncionalidades/';
   private serviceControlURL = '<%= SVC_TH_URL %>/api/rolesFuncionalidadesControles/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL).map( ( res: Response ) => res.json() as RolFuncionalities[] );
   }

   getAllByRol( id: number ): Observable<RolFuncionalities[]> {
      return this.authHttp.get( this.serviceURL + 'buscarRol/' + id ).map( ( res: Response ) => res.json() as RolFuncionalities[] );
   }

   getControlByFuncionality( idRol: number, idFun: number ): Observable<RolFunctionalityControl[]> {
      return this.authHttp.get( this.serviceControlURL + 'buscarFuncionalidad/' + idRol + '/' + idFun ).map( ( res: Response ) => res.json() as RolFunctionalityControl[] );
   }

   add( f: RolFuncionalities ) {
      return this.authHttp.post( this.serviceURL, f)
         .map( ( res: Response ) => res.json() );
   };

   update( f: RolFuncionalities ) {
      return this.authHttp.put( this.serviceURL, JSON.stringify( f )).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + '/' + id )
         .map( ( res: Response ) => res.json() as RolFuncionalities );
   }

   addControl( f: RolFunctionalityControl ) {
      return this.authHttp.post( this.serviceControlURL, f)
         .map( ( res: Response ) => res.json() );
   };

   updateControl( f: RolFunctionalityControl ) {
      return this.authHttp.put( this.serviceControlURL, JSON.stringify( f )).catch( this.handleError );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
