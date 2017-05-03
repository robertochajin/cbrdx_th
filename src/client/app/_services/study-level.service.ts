import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { StudyLevels } from "../_models/studyLevels";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class StudyLevelServices {

   private masterService = '<%= SVC_TH_URL %>/api/nivelesEstudios/';
   private detailService = '<%= SVC_TH_URL %>/api/nivelesEstudios/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAllEnabled() {
      return this.authHttp.get( this.masterService + 'enabled/').map( ( res: Response ) => res.json() as StudyLevels[] );
   }

}

