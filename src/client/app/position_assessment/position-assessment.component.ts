import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SelectItem, ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { RiskService } from '../_services/positios-risks.service';
import { RiskType } from '../_models/riskType';
import { PositionsService } from '../_services/positions.service';
import { Positions } from '../_models/positions';
import { Risk } from '../_models/position-risks';

@Component( {
               moduleId: module.id,
               selector: 'position-assessment',
               templateUrl: 'position-assessment.component.html',
               providers: [ ConfirmationService ]
            } )
export class PositionAssessmentComponent implements OnInit {

   public riskTypes: RiskType[] = [];
   private position: Positions = new Positions();

   constructor( private listaService: ListaService,
      private riskService: RiskService,
      private route: ActivatedRoute,
      private positionsService: PositionsService,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {
   }

   ngOnInit() {

      this.route.params.subscribe( ( params: Params ) => {

         this.positionsService.get(params[':position']).subscribe(position => {
            this.position = position;

            this.riskService.getTypeRisk().subscribe( (rest: RiskType[]) => {
               rest.map(riskType => {
                  this.riskService.getRiskByTypeAndPosition(this.position.idCargo, riskType.idRiesgoTipo).subscribe(riesgos => {
                     riskType.subTypes = riesgos;
                  });
               });
               this.riskTypes = rest;
            } );
         });

      });


   }

}