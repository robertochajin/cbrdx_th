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
   private consecuencies: SelectItem [] = [];
   private probabilities: SelectItem [] = [];

   constructor( private listaService: ListaService,
      private riskService: RiskService,
      private route: ActivatedRoute,
      private positionsService: PositionsService,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {
   }

   ngOnInit() {

      this.route.params.subscribe( ( params: Params ) => {

         this.positionsService.get( +params[ 'position' ] ).subscribe( position => {
            this.position = position;

            this.listaService.getMasterDetails( 'ListasConsecuenciasRiesgos' ).subscribe( res => {
               this.consecuencies.push( { label: 'Seleccione', value: null } );
               res.map( ( s: ListaItem ) => this.consecuencies.push( { label: s.nombre, value: s.idLista } ) );

               this.listaService.getMasterDetails( 'ListasProbabilidadesRiesgos' ).subscribe( res => {
                  this.probabilities.push( { label: 'Seleccione', value: null } );
                  res.map( ( s: ListaItem ) => this.probabilities.push( { label: s.nombre, value: s.idLista } ) );
                  this.riskService.getTypeRiskByPosition(this.position.idCargo).subscribe( ( rest: RiskType[] ) => {
                     rest.map( riskType => {
                        this.riskService.getRiskByTypeAndPosition( this.position.idCargo, riskType.idRiesgoTipo ).subscribe( riesgos => {
                           riskType.subTypes = riesgos;
                        } );
                     } );
                     this.riskTypes = rest;
                  } );
               } );
            } );

         } );

      } );

   }

   onChangeProbability(event: any, risk: Risk){
      this.riskService.updateRisk(risk).subscribe(res => {
         this._nav.setMesage(2);
      }, error => {
         this._nav.setMesage(3);
      });
   }

   onChangeConcecuence(event: any, risk: Risk){
      this.riskService.updateRisk(risk).subscribe(res => {
         this._nav.setMesage(2);
      }, error => {
         this._nav.setMesage(3);
      })
   }

}