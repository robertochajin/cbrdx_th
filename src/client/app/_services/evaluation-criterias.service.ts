import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { EvaluationCriterias } from '../_models/evaluationCriterias';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class EvaluationCriteriasServices {

   public headers = new Headers( { 'Content-Type': 'application/json' } );
   private masterService = '<%= SVC_TH_URL %>/api/criterios/';
   private detailService = '<%= SVC_TH_URL %>/api/criterios/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAllEnabled() {
      return this.authHttp.get( this.masterService + 'enabled/' ).map( ( res: Response ) => res.json() as EvaluationCriterias[] );
   }

}

