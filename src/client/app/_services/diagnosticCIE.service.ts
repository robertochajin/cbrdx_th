import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { DiagnosticosCIE } from '../_models/diagnosticosCIE';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DiagnosticCIEServices {

   private masterService = '<%= SVC_TH_URL %>/api/diagnosticosCie/';

   constructor( private authHttp: AuthHttp ) {
   }

   getByWildCard( qr: any ) {
      return this.authHttp.get( this.masterService + 'codigoNombre/' + qr + '/' )
      .map( ( res: Response ) => res.json() as DiagnosticosCIE[] );
   }

   getById( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id ).map( ( res: Response ) => res.json() as DiagnosticosCIE );
   }

}

