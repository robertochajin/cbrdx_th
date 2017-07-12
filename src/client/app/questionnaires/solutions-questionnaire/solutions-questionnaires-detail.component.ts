import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { NavService } from '../../_services/_nav.service';
import { Questionnaries } from '../../_models/questionnaries';
import { QuestionnairesService } from '../../_services/questionnaires.service';
import { ListaService } from '../../_services/lista.service';
import { Answers } from '../../_models/answers';
import { MasterAnswers } from '../../_models/masterAnswers';
import { MasterAnswersService } from '../../_services/masterAnswers.service';

@Component( {
               moduleId: module.id,
               selector: 'solutions-questionnaires-detail',
               templateUrl: 'solutions-questionnaires-detail.component.html',
               providers: [ ConfirmationService ]
            } )
export class SolutionsQuestionnairesDetailComponent implements OnInit {
   @Input() maestroRespuestas: MasterAnswers;
   cuestionario: Questionnaries = new Questionnaries()
   respuestas: Answers[] = [];
   idMaestroRespuestas: number;
   idCuestionario: number;

   constructor( private questionnairesService: QuestionnairesService,
      private router: Router,
      private location: Location,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private masterAnswersService: MasterAnswersService,
      private navService: NavService ) {
   }

   ngOnInit() {

      this.masterAnswersService.get( this.maestroRespuestas.idMaestroRespuesta).subscribe(
         res => {
            this.maestroRespuestas = res;
            this.questionnairesService.get( this.maestroRespuestas.idCuestionario ).subscribe(
               res => {
                  this.cuestionario = res;
                  this.getAnswers();
               } );
         } );

   }

   getAnswers() {
      this.masterAnswersService.getSolutions( this.idMaestroRespuestas ).subscribe(
         res => {
            this.respuestas = res;
            this.respuestas.map( s => {
               if ( s.opcion ) {
                  s.respuesta = s.opcion
               }
            } );
         } );
   }

}
