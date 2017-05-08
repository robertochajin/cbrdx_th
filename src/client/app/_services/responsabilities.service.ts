import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Responsabilities } from "../_models/responsabilities";
import { Observable } from "rxjs/Rx";
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class ResponsabilitiesServices {
   
   private masterService = '<%= SVC_TH_URL %>/api/responsabilidades/';
   private detailService = '<%= SVC_TH_URL %>/api/responsabilidades/';
   
   constructor( private authHttp: AuthHttp ) {
   }
   
   getAllEnabled(): Observable<Responsabilities[]> {
      return this.authHttp.get( this.masterService + 'enabled/' ).map( ( res: Response ) => res.json() as Responsabilities[] );
   }
   
   getAllEnabledByPosition( idPosition: number ): Observable<Responsabilities[]> {
      return this.authHttp.get( this.masterService + 'noAsignadas/' + idPosition ).map( ( res: Response ) => res.json() as Responsabilities[] );
   }
   
}

