import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CompanyAssets } from '../_models/companyAssets';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CompanyAssetsServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/cargosElementos/';

   constructor( private authHttp: AuthHttp ) {
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as CompanyAssets[] );
   }

   getAllByPosition( id: number ): Observable<CompanyAssets[]> {
      return this.authHttp.get( this.serviceURL + 'buscarCargo/' + id ).map( ( res: Response ) => res.json() as CompanyAssets[] );
   }

   add( f: CompanyAssets ) {
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: CompanyAssets ) {
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as CompanyAssets );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
