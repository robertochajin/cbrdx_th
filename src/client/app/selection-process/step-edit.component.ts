import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { SelectionStep } from '../_models/selectionStep';
import { SelectionStepService } from '../_services/selection-step.service';

@Component( {
               moduleId: module.id,
               selector: 'step-edit',
               templateUrl: 'step-edit.component.html',
               providers: [ConfirmationService]
            } )

export class StepEditComponent implements OnInit {

   step: SelectionStep;

   constructor( private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private _nav: NavService,
      private selectionStepService: SelectionStepService ) {

      this.route.params.subscribe( ( params: Params ) => {
         let idStep:number = params[ 'idReq' ];
         if(idStep !== undefined){
            this.selectionStepService.get(idStep).subscribe(step => {
               this.step = step;
            });
         } else {
            this.step = new SelectionStep();
         }
      });
   }

   ngOnInit() {
   }

   saveStep(){

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
