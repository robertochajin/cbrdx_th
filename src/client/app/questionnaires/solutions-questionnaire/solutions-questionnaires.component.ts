import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { MasterAnswers } from '../../_models/masterAnswers';
import { MasterAnswersService } from '../../_services/masterAnswers.service';

@Component( {
               moduleId: module.id,
               selector: 'solutions-questionnaires',
               templateUrl: 'solutions-questionnaires.component.html',
               providers: [ ConfirmationService ]
            } )
export class SolutionsQuestionnairesComponent implements OnInit {
   @Input() maestroRespuestas: MasterAnswers;
   @Output() finish: EventEmitter<MasterAnswers> = new EventEmitter<MasterAnswers>();
   cuestionario: Questionnaries = new Questionnaries()
   preguntas: QuestionnariesQuestions[] = [];
   pregunta: QuestionnariesQuestions = new QuestionnariesQuestions();
   opciones: QuestionnariesAnswers[] = [];
   opcionesCorrectas: QuestionnariesAnswers[] = [];
   respuesta: Answers = new Answers();
   idMaestroRespuestas: number;
   idCuestionario: number;
   listadoOpciones: SelectItem[] = [];
   indice: number = 0;
   showThx: boolean = false;
   saving: boolean = false;
   respuestasCheckbox: number[] = [];
   msgs: Message[] = [];

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
      this.idMaestroRespuestas = this.maestroRespuestas.idMaestroRespuesta;
      this.idCuestionario = this.maestroRespuestas.idCuestionario;
      this.questionnairesService.get( this.idCuestionario ).subscribe(
         res => {
            this.cuestionario = res;
            this.getQuestions();
         } );


   }

   getQuestions() {
      if ( Number( this.idCuestionario ) > 0 ) {
         this.questionnairesService.getQuestionsEnable( this.idCuestionario ).subscribe(
            res => {
               this.preguntas = res;
               this.sortQuestions();
               if ( this.maestroRespuestas.idPreguntaEnCurso ) {
                  this.indice = this.preguntas.indexOf(
                        this.preguntas.find( s => s.idCuestionarioPregunta === this.maestroRespuestas.idPreguntaEnCurso ) ) + 1;
               } else {
                  this.indice = 0;
               }
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
         this.finish.emit( this.maestroRespuestas );
      } else {
         this.pregunta = this.preguntas[ this.indice ];
         this.getAnswers();
         this.indice += 1;
      }

   }

   getAnswers() {
      if ( this.pregunta.codigoTipoPregunta === 'CHECK' || this.pregunta.codigoTipoPregunta === 'SELECT' ) {
         this.questionnairesService.getAnswersEnabled( this.pregunta.idCuestionarioPregunta ).subscribe(
            res => {
               this.opciones = res;
               this.sortOptions();
               this.listadoOpciones = [];
               if ( this.pregunta.codigoTipoPregunta === 'SELECT' ) {
                  this.listadoOpciones.push( { label: 'Seleccione', value: null } );
               }
               this.opcionesCorrectas = [];
               res.map( s => {
                  this.listadoOpciones.push( { label: s.opcion, value: s.idPreguntaOpcion } );
                  if ( s.indicadorCorrecto === true ) {
                     this.opcionesCorrectas.push( s );
                  }
               } );
            } );
      } else {
         this.opciones = [];
         this.listadoOpciones = [];
      }
   }

   onSubmit() {
      this.saving = true;
      if ( this.pregunta.codigoTipoPregunta === 'CHECK' ) {
         for ( let x of this.respuestasCheckbox ) {
            this.respuesta.idCuestionarioPregunta = this.pregunta.idCuestionarioPregunta;
            this.respuesta.idMaestroRespuesta = this.idMaestroRespuestas;
            this.respuesta.idPreguntaOpcion = x;
            this.masterAnswersService.addSolution( this.respuesta ).subscribe( res => {
               this.navService.setMesage( 1, this.msgs );
               this.updateMaster( res, this.pregunta );
               this.saving = false;

            }, error => {
               this.navService.setMesage( 3, this.msgs );
               this.saving = false;
            } );
         }
         this.nextQuestion();
      } else {
         this.respuesta.idCuestionarioPregunta = this.pregunta.idCuestionarioPregunta;
         this.respuesta.idMaestroRespuesta = this.idMaestroRespuestas;
         this.masterAnswersService.addSolution( this.respuesta ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
            this.updateMaster( res, this.pregunta );
            this.nextQuestion();
            this.saving = false;
            this.respuesta = new Answers();
         }, error => {
            this.navService.setMesage( 3, this.msgs );
            this.saving = false;
         } );
      }
   }

   updateMaster( r: Answers, p: QuestionnariesQuestions ) {
      if ( p.indicadorFiltrante ) {
         if ( p.codigoTipoPregunta === 'SELECT' && this.opcionesCorrectas.length > 0 ) {
            if ( r.idPreguntaOpcion !== this.opcionesCorrectas[ 0 ].idPreguntaOpcion ) {
               this.maestroRespuestas.indicadorAprobado = false;
            }
         } else if ( p.codigoTipoPregunta === 'CHECK' && this.opcionesCorrectas.length > 0 ) {
            if ( this.opcionesCorrectas.filter( s => s.idPreguntaOpcion === r.idPreguntaOpcion ).length === 0 ) {
               this.maestroRespuestas.indicadorAprobado = false;
            }
         }
      }
      this.maestroRespuestas.idPreguntaEnCurso = r.idCuestionarioPregunta;
      if ( p.idCuestionarioPregunta === this.preguntas[ this.preguntas.length - 1 ].idCuestionarioPregunta ) {
         this.maestroRespuestas.indicadorFinalizado = true;
      }

      this.masterAnswersService.update( this.maestroRespuestas ).subscribe( res => {
         // this.navService.setMesage( 1, this.msgs );
      }, error => {
         this.navService.setMesage( 3, this.msgs );
      } );

   }

   private sortQuestions() {
      this.preguntas.sort( function ( a, b ) {
         if ( a.secuencia < b.secuencia )
            return -1;
         else
            return 1;
      } )
   }

   private sortOptions() {
      this.opciones.sort( function ( a, b ) {
         if ( a.orden < b.orden )
            return -1;
         else
            return 1;
      } )
   }

}
