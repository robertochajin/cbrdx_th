import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { LocationsNomenclatures } from '../_models/locationsNomenclatures';

@Injectable()
export class LocationsNomenclaturesServices {

   private serviceURL = '<%= SVC_TH_URL %>/api/localizacionesNomenclaturas/';
   private jwtHelper: JwtHelper = new JwtHelper();
   private idUsuario: number;

   constructor( private authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         let decodedToken = this.jwtHelper.decodeToken( token );
         this.idUsuario = decodedToken.usuario.idUsuario;
      }
   }

   getAll() {
      return this.authHttp.get( this.serviceURL ).map( ( res: Response ) => res.json() as LocationsNomenclatures[] );
   }

   getAllByLocalizacion( idLocalizacion: number ) {
      return this.authHttp.get( this.serviceURL + 'localizacion/' + idLocalizacion )
      .map( ( res: Response ) => res.json() as LocationsNomenclatures[] );
   }

   add( f: LocationsNomenclatures ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: LocationsNomenclatures ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + id )
      .map( ( res: Response ) => res.json() as LocationsNomenclatures );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

}
