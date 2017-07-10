import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { NavService } from '../../_services/_nav.service';
import { Questionnaries } from '../../_models/questionnaries';
import { QuestionnairesService } from '../../_services/questionnaires.service';
import { QuestionnariesQuestions } from '../../_models/questionnariesQuestions';
import { QuestionnariesAnswers } from '../../_models/questionnariesAnswers';
import { ListaService } from '../../_services/lista.service';
import { Answers } from '../../_models/answers';

@Component( {
               moduleId: module.id,
               selector: 'solutions-questionnaires',
               templateUrl: 'solutions-questionnaires.component.html',
               providers: [ ConfirmationService ]
            } )
export class SolutionsQuestionnairesComponent implements OnInit {
   @Input() cuestionario: Questionnaries;
   preguntas: QuestionnariesQuestions[] = [];
   pregunta: QuestionnariesQuestions = new QuestionnariesQuestions();
   opciones: QuestionnariesAnswers[] = [];
   opcion: QuestionnariesAnswers = new QuestionnariesAnswers();
   respuesta: Answers = new Answers();
   idCuestionario: number;
   listadoOpciones: SelectItem[] = [];
   indice: number = 0;
   showThx: boolean = false;
   msgs: Message[] = [];

   constructor( private questionnairesService: QuestionnairesService,
      private router: Router,
      private location: Location,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
   }

   ngOnInit() {
      this.route.params.subscribe( params => {
         this.idCuestionario = +params[ 'id' ];
         if ( Number( this.idCuestionario ) > 0 ) {
            this.questionnairesService.get( this.idCuestionario ).subscribe(
               res => {
                  this.cuestionario = res;
                  this.getQuestions();
               } );
         }
      } );
   }

   getQuestions() {
      if ( Number( this.idCuestionario ) > 0 ) {
         this.questionnairesService.getQuestions( this.idCuestionario ).subscribe(
            res => {
               this.preguntas = res;
               this.indice = 0;
               this.nextQuestion();
            } );
      } else {
         this.preguntas = [];
         this.nextQuestion();
      }
   }

   nextQuestion() {
      if ( this.preguntas.length === this.indice ) {
         this.showThx = true;
      } else {
         this.pregunta = this.preguntas[ this.indice ];
         this.getAnswers();
         this.indice += 1;
      }

   }

   getAnswers() {
      this.questionnairesService.getAnswers( this.pregunta.idCuestionarioPregunta ).subscribe(
         res => {
            this.opciones = res;
            this.listadoOpciones = [];
            if ( this.pregunta.idTipoPregunta !== 1 ) {
               this.listadoOpciones.push( { label: 'Seleccione', value: null } );
            }
            res.map( s => {
               this.listadoOpciones.push( { label: s.opcion, value: s.idPreguntaOpcion } );
            } );
         } );
   }

   onSubmit() {
      this.respuesta.idCuestionarioPregunta = this.pregunta.idCuestionarioPregunta;
      this.questionnairesService.addSolution( this.respuesta ).subscribe( res => {
         this.navService.setMesage( 1, this.msgs );
         this.nextQuestion();
      }, error => {
         this.navService.setMesage( 3, this.msgs );
      } );
   }

}
