import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionStepService } from '../_services/selection-step.service';
import { SelectionStep } from '../_models/selectionStep';
import { ConfirmationService } from 'primeng/primeng';
import { SelectionProcess } from '../_models/selection-process';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';

@Component( {
               moduleId: module.id,
               templateUrl: 'step-list.component.html',
               providers: [ ConfirmationService ]
            } )
export class StepListComponent implements OnInit {

   steps: SelectionStep[] = [];
   process: SelectionProcess;
   private processStates: ListaItem[];
   private editing =  false;

   constructor( private router: Router,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private selectionStepService: SelectionStepService ) {
   }

   ngOnInit() {

      this.listaService.getMasterDetails( 'ListasEstadosProcesos' ).subscribe( res => {
         this.processStates = res;
         this.selectionStepService.getCurrentProcess().subscribe( process => {
            this.process = process;
            this.editing = (this.processStates.find(s => s.idLista === this.process.idEstado).codigo === 'EDIT');
            this.selectionStepService.getAllByProcess( this.process.idProceso ).subscribe( res => {
               this.steps = res;
            } );
         } );
      } );
   }


   add() {
      this.router.navigate( [ 'selection-process/add-step/' ] );
   }

   detail( r: SelectionStep ) {
      this.router.navigate( [ 'selection-process/detail-step/' + r.idProcesoPaso ] );
   }

   update( r: SelectionStep ) {
      this.router.navigate( [ 'selection-process/update-step/' + r.idProcesoPaso ] );
   }

   newVersion() {
      this.confirmationService.confirm( {
                                           message: ` Al crear una nueva versión se realizara una 
                                           copia de los pasos actuales para que pueda realizar la edición. Desea continuar? `,
                                           header: 'Confirmación creación nueva versión',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {

                                           },
                                           reject: () => {
                                           }
                                        } );
   }

   publishVersion() {

      this.confirmationService.confirm( {
                                           message: ` Al publicar esta nueva versión se deshabilitarán las versiones anteriores y el proceso 
                                           de selección se llevará a cabo con esta ultima configuración. ¿Desea continuar? `,
                                           header: 'Confirmación creación nueva versión',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {

                                           },
                                           reject: () => {
                                           }
                                        } );

   }
}
