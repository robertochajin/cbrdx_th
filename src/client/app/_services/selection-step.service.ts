import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { SelectionStep } from '../_models/selectionStep';
import { SelectionProcess } from '../_models/selection-process';

@Injectable()
export class SelectionStepService {

   private masterService = '<%= SVC_TH_URL %>/api/procesosPasos/';
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

   add( f: SelectionStep ) {
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: SelectionStep ) {
      return this.authHttp.put( this.masterService, JSON.stringify( f ) ).catch( this.handleError );
   }

   getAll() {
      return this.authHttp.get( this.masterService )
      .map( ( res: Response ) => res.json() as SelectionStep[] );
   }

   newProcess( ) {
      return this.authHttp.post( '<%= SVC_TH_URL %>/api/procesos/' + this.idUsuario, null ).catch( this.handleError );
   }

   updateProcess( f: SelectionProcess ) {
      return this.authHttp.put( '<%= SVC_TH_URL %>/api/procesos/', JSON.stringify( f ) ).catch( this.handleError );
   }

   getCurrentProcess() {
      return this.authHttp.get( '<%= SVC_TH_URL %>/api/procesos/current/' )
      .map( ( res: Response ) => res.json() as SelectionProcess );
   }

   getAllByProcess(idProcess: number) {
      return this.authHttp.get( this.masterService + 'proceso/' + idProcess )
      .map( ( res: Response ) => res.json() as SelectionStep[] );
   }

   getAllByProcessAndType(idProcess: number, tipo? : string) {
      let endPoint = this.masterService + 'procesoOrden/' + idProcess;
      if(tipo === 'INTERNA') {
         let endPoint = this.masterService + 'procesoOrden/internoMixto/' + idProcess;
      } else if(tipo === 'EXTERNA'){
         let endPoint = this.masterService + 'procesoOrden/externoMixto/' + idProcess;
      }

      return this.authHttp.get( endPoint )
      .map( ( res: Response ) => res.json() as SelectionStep[] );
   }

   get(idSelectionStep: number) {
      return this.authHttp.get( this.masterService + idSelectionStep )
      .map( ( res: Response ) => res.json() as SelectionStep );
   }

   getByCode(code: string) {
      return this.authHttp.get( this.masterService + 'codigo/' + code )
      .map( ( res: Response ) => {
         let steps = res.json() as SelectionStep[];
         if(steps.length > 0){
            return steps[0] as SelectionStep;
         } else {
            return undefined;
         }
      } );
   }

   getLastStep( idProceso: number ) {
      return this.authHttp.get( this.masterService + 'ultimoPaso/' + idProceso )
      .map( ( res: Response ) => {
         if(res.text() !== ''){
            return res.json() as SelectionStep;
         } else {
            return undefined;
         }
      });
   }

   handleError( error: any ): Promise<any> {
      return Promise.reject( error.message || error );
   }

}

