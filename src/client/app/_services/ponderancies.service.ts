import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Ponderancies } from "../_models/ponderancies";
import { Observable } from "rxjs/Rx";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class PonderanciesServices {

   private masterService = '<%= SVC_TH_URL %>/api/ponderaciones/';
   private detailService = '<%= SVC_TH_URL %>/api/ponderaciones/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAllEnabled(): Observable<Ponderancies[]> {
      return this.authHttp.get( this.masterService + 'enabled/' ).map( ( res: Response ) => res.json() as Ponderancies[] );
   }

   getAllEnabledByPosition( idPosition: number ): Observable<Ponderancies[]> {
      return this.authHttp.get( this.masterService + 'noAsignadas/' + idPosition ).map( ( res: Response ) => res.json() as Ponderancies[] );
   }

}

