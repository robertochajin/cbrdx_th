import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionStepService } from '../_services/selection-step.service';
import { SelectionStep } from '../_models/selectionStep';
import { ConfirmationService } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'step-list.component.html',
               providers: [ ConfirmationService ]
            } )
export class StepListComponent implements OnInit {

    steps : SelectionStep[] = [];

   constructor(
      private router: Router,
      private confirmationService: ConfirmationService,
      private selectionStepService: SelectionStepService ) {
   }

   ngOnInit() {
      this.selectionStepService.getCurrentSteps().subscribe( res => {
         this.steps = res;
      });
   }

   add( ) {
      this.router.navigate( [ 'selection-process/edit-step/' ] );
   }

   detail( r: SelectionStep ) {
      this.router.navigate( [ 'selection-process/detail-step/' + r.idProcesoPaso ] );
   }

   update( r: SelectionStep ) {
      this.router.navigate( [ 'selection-process/edit-step/' + r.idProcesoPaso ] );
   }

   newVersion(){
      this.confirmationService.confirm( {
                                           message: ` Al crear una nueva versión  `,
                                           header: 'Confirmación creación nueva versión',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {

                                           },
                                           reject: () => {
                                           }
                                        } );
   }

   publishVersion(){

   }
}
