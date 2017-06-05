import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionStepService } from '../_services/selection-step.service';
import { SelectionStep } from '../_models/selectionStep';

@Component( {
               moduleId: module.id,
               templateUrl: 'step-list.component.html'
            } )
export class SelectionProcessComponent implements OnInit {

    steps : SelectionStep[] = [];

   constructor(
      private router: Router,
      private selectionStepService: SelectionStepService ) {
   }

   ngOnInit() {
      this.selectionStepService.getCurrentSteps().subscribe( res => {
         this.steps = res;
      });
   }

   add( r: SelectionStep ) {
      this.router.navigate( [ 'selection-process/edit-step/' ] );
   }

   detail( r: SelectionStep ) {
      this.router.navigate( [ 'selection-process/detail-step/' + r.idProcesoPaso ] );
   }

   update( r: SelectionStep ) {
      this.router.navigate( [ 'selection-process/edit-step/' + r.idProcesoPaso ] );
   }

}
