import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { OrganizationalStructurePositions } from '../_models/organizationalStructurePositions';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class OrganizationalStructurePositionsServices {

   private masterService = '<%= SVC_TH_URL %>/api/estructuraOrganizacionalCargos/';
   private detailService = '<%= SVC_TH_URL %>/api/estructuraOrganizacionalCargos/';
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;
   private idUsuario: number;

   constructor( private authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
      }
   }

   getAllEnabled(): Observable<OrganizationalStructurePositions[]> {
      return this.authHttp.get( this.masterService + 'enabled/' )
      .map( ( res: Response ) => res.json() as OrganizationalStructurePositions[] );
   }

   getAllByOrganizacionalStructure( idOrganizacionalStructure: number ): Observable<OrganizationalStructurePositions[]> {
      return this.authHttp.get( this.masterService + 'buscarCargo/' + idOrganizacionalStructure )
      .map( ( res: Response ) => res.json() as OrganizationalStructurePositions[] );
   }

   add( f: OrganizationalStructurePositions ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: OrganizationalStructurePositions ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as OrganizationalStructurePositions );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }

   getByPositionAndOrganizationalStructure(idPosition:number, idOrganizationalEstructure:number) {
      return this.authHttp.get( this.masterService + 'buscarCargoEstructura/' + idPosition +'/'+ idOrganizationalEstructure )
      .map( ( res: Response ) => {
         if(res.text() !== ''){
            return res.json() as OrganizationalStructurePositions;
         } else {
            return undefined;
         }
      });
   }
}

