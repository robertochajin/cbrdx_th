import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { SelectionStep } from '../_models/selectionStep';
import { SelectionStepService } from '../_services/selection-step.service';
import { RolesService } from '../_services/roles.service';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { ListaItem } from '../_models/listaItem';
import { SelectionProcess } from '../_models/selection-process';

@Component( {
               moduleId: module.id,
               selector: 'step-edit',
               templateUrl: 'step-edit.component.html',
               providers: [ ConfirmationService ]
            } )

export class StepEditComponent implements OnInit {

   step: SelectionStep;
   public roles: SelectItem [] = [];
   public questionnaires: SelectItem [] = [];
   public convocatoryTypes: SelectItem [] = [];
   process: SelectionProcess;

   constructor( private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private rolesService: RolesService,
      private qs: QuestionnairesService,
      private _nav: NavService,
      private selectionStepService: SelectionStepService ) {

      this.rolesService.listRoles().subscribe( roles => {
         this.roles.push( { label: 'Seleccione', value: null } );
         roles.map( i => {
            this.roles.push( { label: i.codigoRol + ' - ' + i.descripcion, value: i.idRol } )
         } );
      } );

      this.qs.getAllEnabled().subscribe( qts => {
         this.questionnaires.push( { label: 'Seleccione', value: null } );
         qts.map( qt => {
            this.questionnaires.push( { label: qt.cuestionario, value: qt.idCuestionario } )
         } );
      } );

      this.listaService.getMasterDetails( 'ListasFormasReclutamientos' ).subscribe( res => {
         this.convocatoryTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.convocatoryTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.selectionStepService.getCurrentProcess().subscribe( process => {
         this.process = process;
         this.listaService.getMasterDetailsByCode( 'ListasEstadosProcesos', 'EDIT' ).subscribe( item => {
            if ( this.process.idEstado === item.idLista ) {
               this.route.params.subscribe( ( params: Params ) => {
                  let idStep: number = params[ 'idStep' ];
                  if ( idStep !== undefined ) {
                     this.selectionStepService.get( idStep ).subscribe( step => {
                        this.step = step;
                     } );
                  } else {
                     this.step = new SelectionStep();
                     this.step.idProceso = this.process.idProceso;
                  }
               } );
            } else {
               this._nav.setMesage( 3 );
               this.location.back();
            }
         } );

      } );
   }

   ngOnInit() {
   }

   saveStep() {
      if ( this.step.idProcesoPaso !== undefined && this.step.idProcesoPaso !== null ) {
         this.selectionStepService.update( this.step ).subscribe( res => {
            if ( res.Ok ) {
               this._nav.setMesage( 2 );
               this.location.back();
            }
         }, () => {
            this._nav.setMesage( 3 );
         } );
      } else {
         this.selectionStepService.getLastStep( this.step.idProceso ).subscribe( (res : SelectionStep )=> {

            if(res === undefined){
               this.step.orden = 1;
            } else {
               this.step.orden = res.orden + 1;
            }
            this.selectionStepService.add( this.step ).subscribe( res => {
               if ( res ) {
                  this._nav.setMesage( 1 );
                  this.location.back();
               }
            }, () => {
               this._nav.setMesage( 3 );
            } );

         } );
      }

   }

   cleanHiddenControls(){
      if(this.step.indicadorInterfazInterna){
         this.step.indicadorBloqueante = false;
         this.step.indicadorObservacion = false;
         this.step.indicadorCorreo = false;
         this.step.indicadorAdjunto = false;
         this.step.indicadorCalendario = false;
         this.step.indicadorCuestionarios = false;
         this.step.indicadorInterfaz = false;
         this.step.idCuestionario = null;
         this.step.interfaz = '';
      }
   }

   inputCleanUp( value: string ) {
      if ( value ) {
         this.step.codigo = value.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
      }
   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
   }

}
