import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { SelectionStep } from '../_models/selectionStep';
import { SelectionProcess } from '../_models/selection-process';
import { CentralRisk } from '../_models/centralRisk';
import { EmployeeCentralRisk } from '../_models/employeeCentralRisk';
import { TerceroPublicaciones } from '../_models/terceroPublicaciones';
import { PostulationHistory } from '../_models/postulationHistory';

@Injectable()
export class SelectionStepService {

   private masterService = '<%= SVC_TH_URL %>/api/procesosPasos/';
   private serviceURL = '<%= SVC_TH_URL %>/api/';
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
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.masterService, f )
      .map( ( res: Response ) => res.json() );
   };

   update( f: SelectionStep ) {
      f.auditoriaUsuario = this.idUsuario;
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
      f.auditoriaUsuario = this.idUsuario;
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
         endPoint = this.masterService + 'procesoOrden/internoMixto/' + idProcess;
      } else if(tipo === 'EXTERNA'){
         endPoint = this.masterService + 'procesoOrden/externoMixto/' + idProcess;
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

   getTerceroPublicacio(id:number){
      return this.authHttp.get( '<%= SVC_TH_URL %>/api/tercerosPublicaciones/'+id )
      .map( ( res: Response ) => res.json() as TerceroPublicaciones );
   }

   updateThirdPublication(tp: TerceroPublicaciones){
      tp.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( '<%= SVC_TH_URL %>/api/tercerosPublicaciones/', JSON.stringify( tp ) ).catch( this.handleError );
   }

   getUsuariosRol(codigo:string){
      return this.authHttp.get( '<%= SVC_TH_URL %>/api/usuarios/usuarioRol/'+codigo )
      .map( ( res: Response ) => res.json() as any );
   }

   handleError( error: any ): Promise<any> {
      return Promise.reject( error.message || error );
   }

   getcentralRisk( ) {
      return this.authHttp.get( this.serviceURL + 'centralesRiesgos' )
      .map( ( res: Response ) => res.json() as CentralRisk[] );
   }

   getEmployeesCentralRisk(id:number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosCentralesRiesgos/tercero/'+id )
      .map( ( res: Response ) => res.json() as CentralRisk[] );
   }

   getHistoryByIdEmployee( id: number ) {
      return this.authHttp.get( this.serviceURL + 'tercerosPublicaciones/historic/' + id )
      .map( ( res: Response ) => res.json() as PostulationHistory[] );
   }

   addEmployeesCentralRisk( f: CentralRisk ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.post( this.serviceURL + 'tercerosCentralesRiesgos', f )
      .map( ( res: Response ) => res.json() );
   };

   updateEmployeesCentralRisk( f: CentralRisk ) {
      f.auditoriaUsuario = this.idUsuario;
      return this.authHttp.put( this.serviceURL + 'tercerosCentralesRiesgos', f  ).catch( this.handleError );
   }

   downloadFile(id:number){
      return this.authHttp.get( this.serviceURL + 'adjuntos/file/'+id ).map( ( res: Response ) => res.text() );
   }
}

