import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { Dinamic } from './dinamic';

@Injectable()
export class DinamicServices {

   private masterService = '<%= SVC_TH_URL %>/api/competencias/';
   private jwtHelper: JwtHelper = new JwtHelper();
   private usuarioLogueado: any;
   private idUsuario: number;
   componentList:Dinamic[]=[]

   constructor( private authHttp: AuthHttp ) {
      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.idUsuario = this.usuarioLogueado.usuario.idUsuario;
      }
      this.componentList.push(
         {
            "idComponente": 1,
            "codigo": "input",
            "nombre": "Prueba input",
            "tipo": "input",
            "indicadorVisible": true,
            "indicadorEditable": true
         }
      );
      this.componentList.push(
         {
            "idComponente": 2,
            "codigo": "text",
            "nombre": "Prueba text",
            "tipo": "text",
            "indicadorVisible": true,
            "indicadorEditable": true
         }
      );
      this.componentList.push(
         {
            "idComponente": 3,
            "codigo": "checkbox",
            "nombre": "Prueba checkbox",
            "tipo": "checkbox",
            "indicadorVisible": true,
            "indicadorEditable": true
         }
      );
   }

   getAll( ){

      return this.componentList;
   }

  /* getAllByGroup( idGrupo: number ): Observable<Competencies[]> {
      return this.authHttp.get( this.masterService + 'buscarGrupo/' + idGrupo ).map( ( res: Response ) => res.json() as Competencies[] );
   }

   add( f: Competencies ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: Competencies ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   get( id: number ) {
      return this.authHttp.get( this.masterService + 'buscarId/' + id )
      .map( ( res: Response ) => res.json() as Competencies );
   }

   handleError( error: any ): Promise<any> {
      console.error( 'Error:', error );
      return Promise.reject( error.message || error );
   }
   */
}

