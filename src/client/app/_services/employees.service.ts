import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Employee } from '../_models/employees';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class EmployeesService {

   usuarioLogueado: any;
   idUsuario: number;
   private serviceURL = '<%= SVC_TH_URL %>/api/';
   private serviceURLTerceros = '<%= SVC_TH_URL %>/tercerosCargos/';
   private jwtHelper: JwtHelper = new JwtHelper();

   constructor( private authHttp: AuthHttp ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
      }

   }

   getAll() {
      return this.authHttp.get( this.serviceURL + 'vterceros' ).map( ( res: Response ) => res.json() as Employee[] );
   }

   getByTipo( type: string ) {
      return this.authHttp.get( this.serviceURL + 'vterceros/buscarTerceros/' + type + '/' ).map( ( res: Response ) => res.json() );
   }

   getTerColWithoutPosition( query: string ) {
      return this.authHttp.get( this.serviceURL + 'vterceros/asignarColaborador/' + query.trim() + '/' )
      .map( ( res: Response ) => res.json() );
   }

   add( c: Employee ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'terceros', c ).map( ( res: Response ) => res.json() );
   };

   update( c: Employee ) {
      c.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'terceros', c ).map( ( res: Response ) => res );
   }

   get( id: number ) {
      return this.authHttp.get( this.serviceURL + 'vterceros/' + id ).map( ( res: Response ) => res.json() as Employee );
   }

   getInfoPositionEmployee(id: number) {
      return this.authHttp.get( this.serviceURL + 'terceros/tercerosCargosAreasFisicas/' + id ).map( ( res: Response ) => res.json());
   }

   getNacionalidad( id: number ) {
      return this.authHttp.get( this.serviceURL + '/vista/' + id ).map( ( res: Response ) => res.json() );
   }

   getCargoActual( id: number ) {
      return this.authHttp.get( this.serviceURLTerceros + '/tercerosCargos/' + id ).map( ( res: Response ) => res.json() );
   }

   delete( c: Employee ) {
      c.auditoriaUsuario = this.idUsuario;
      const respuesta = this.authHttp.delete( this.serviceURL + '/' + c.idTercero );
      return respuesta.map( ( res: Response ) => res.json() );
   }

   validateDocument( numeroDocumento: string, idTipoDocumento: number ) {
      return this.authHttp.get( this.serviceURL + 'terceros/' + numeroDocumento + '/' + idTipoDocumento + '/' )
      .map( ( res: Response ) => {
         if ( res.text() !== '' ) {
            return res.json() as Employee;
         } else {
            return undefined;
         }
      } );
   }

}
