import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Tercero } from '../_models/tercero';
import { AuthHttp } from 'angular2-jwt';
import any = jasmine.any;

@Injectable()
export class TercerosService {

   private serviceURL = '<%= SVC_TH_URL %>/api/terceros/';

   constructor( public authHttp: AuthHttp ) {
   }

   listarTerceros() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as Tercero[] );
   }

   consultarTercero( tipoDocumento: number, numeroDocumento: string ) {
      return this.authHttp.get( this.serviceURL + tipoDocumento + "/" + numeroDocumento )
      .map( res => res.json() as Tercero ).catch( this.handleError );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
}
