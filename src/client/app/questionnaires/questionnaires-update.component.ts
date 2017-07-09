import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Questionnaries } from '../_models/questionnaries';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { QuestionnariesQuestions } from '../_models/questionnariesQuestions';
import { QuestionnariesAnswers } from '../_models/questionnariesAnswers';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';

@Component( {
               moduleId: module.id,
               templateUrl: 'questionnaires-form.component.html',
               selector: 'roles-form.component',
               providers: [ ConfirmationService ]
            } )
export class QuestionnairesUpdateComponent implements OnInit {

   cuestionarios: Questionnaries[] = [];
   cuestionario: Questionnaries = new Questionnaries();
   preguntas: QuestionnariesQuestions[] = [];
   pregunta: QuestionnariesQuestions = new QuestionnariesQuestions();
   respuestas: QuestionnariesAnswers[] = [];
   respuesta: QuestionnariesAnswers = new QuestionnariesAnswers();
   idCuestionario: number;
   msgs: Message[] = [];
   codeExists: boolean = false;
   codeExistsP: boolean = false;
   codeExistsR: boolean = false;
   formQuestion: boolean = false;
   showAnswers: boolean = false;
   formAnswer: boolean = false;
   questionsTypes: SelectItem[] = [];
   previousQuestions: SelectItem[] = [];
   previousAnswers: SelectItem[] = [];

   constructor( private questionnairesService: QuestionnairesService,
      private router: Router,
      private location: Location,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {

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
      this.questionnairesService.getAll().subscribe(
         res => {
            this.cuestionarios = res;
         } );

      listaService.getMasterDetails( 'ListasTiposPreguntas' ).subscribe( res => {
         this.questionsTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.questionsTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
   }

   ngOnInit() {
   }

   getQuestions() {
      if ( Number( this.idCuestionario ) > 0 ) {
         this.questionnairesService.getQuestions( this.idCuestionario ).subscribe(
            res => {
               this.preguntas = res;
            } );
      }
   }

   goBack( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.location.back();
                                              }
                                           } );
      } else {
         this.location.back();
      }
   }

   onSubmit() {
      if ( !this.codeExists ) {
         this.questionnairesService.update( this.cuestionario ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
         }, error => {
            this.navService.setMesage( 3, this.msgs );
         } );
      }
   }

   validateCode() {
      if ( this.cuestionario.codigoCuestionario !== '' && this.cuestionario.codigoCuestionario !== null ) {
         this.codeExists = this.cuestionarios.filter(
               t => (t.codigoCuestionario === this.cuestionario.codigoCuestionario && t.idCuestionario !== this.cuestionario.idCuestionario ) ).length > 0;
      } else {
         this.codeExists = false;
      }
   }

   addQuestion() {
      this.formQuestion = true;
      this.showAnswers = false;
      this.pregunta = new QuestionnariesQuestions();
   }

   updateQuestion( pregunta: QuestionnariesQuestions ) {
      this.formQuestion = true;
      this.showAnswers = false;
      this.pregunta = pregunta;
   }

   goBackQuestion( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.formQuestion = false;
                                                 this.pregunta = new QuestionnariesQuestions();
                                              }
                                           } );
      } else {
         this.formQuestion = false;
         this.pregunta = new QuestionnariesQuestions();
      }
   }

   onSubmitQuestion() {
      if ( !this.codeExistsP ) {
         if ( this.pregunta.idCuestionarioPregunta === null || this.pregunta.idCuestionarioPregunta === undefined || this.pregunta.idCuestionarioPregunta === 0 ) {
            this.pregunta.idCuestionario = this.idCuestionario;
            this.questionnairesService.addQuestion( this.pregunta ).subscribe( res => {
               this.getQuestions();
               this.navService.setMesage( 1, this.msgs );
               this.formQuestion = false;
               this.showAnswers = false;
               this.pregunta = new QuestionnariesQuestions();
            }, error => {
               this.navService.setMesage( 3, this.msgs );
            } );
         } else {
            this.questionnairesService.updateQuestion( this.pregunta ).subscribe( res => {
               this.navService.setMesage( 1, this.msgs );
               this.getQuestions();
            }, error => {
               this.navService.setMesage( 3, this.msgs );
            } );
         }
      }
   }

   validateCodeP() {
      if ( this.pregunta.codigoPregunta !== '' && this.pregunta.codigoPregunta !== null ) {
         this.codeExistsP = this.preguntas.filter(
               t => (t.codigoPregunta === this.pregunta.codigoPregunta && t.idCuestionarioPregunta !== this.pregunta.idCuestionarioPregunta ) ).length > 0;
      } else {
         this.codeExistsP = false;
      }
   }

   showPanelAnswers( pregunta: QuestionnariesQuestions ) {
      this.showAnswers = true;
      this.formAnswer = false;
      this.pregunta = pregunta;
      this.getAnswers();
   }

   addAnswer() {
      this.formAnswer = true;
      this.respuesta = new QuestionnariesAnswers();
   }

   updateAnswer( respuesta: QuestionnariesAnswers ) {
      this.formAnswer = true;
      this.respuesta = respuesta;
   }

   goBackAnswer( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.formAnswer = false;
                                                 this.respuesta = new QuestionnariesAnswers();
                                              }
                                           } );
      } else {
         this.formAnswer = false;
         this.respuesta = new QuestionnariesAnswers();
      }
   }

   onSubmitAnswer() {
      if ( !this.codeExistsR ) {
         if ( this.respuesta.idPreguntaOpcion === null || this.respuesta.idPreguntaOpcion === undefined || this.respuesta.idPreguntaOpcion === 0 ) {
            this.respuesta.idCuestionarioPregunta = this.pregunta.idCuestionarioPregunta;
            this.questionnairesService.addAnswer( this.respuesta ).subscribe( res => {
               this.getAnswers();
               this.navService.setMesage( 1, this.msgs );
               this.formAnswer = false;
               this.respuesta = new QuestionnariesAnswers();
            }, error => {
               this.navService.setMesage( 3, this.msgs );
            } );
         } else {
            this.questionnairesService.updateAnswer( this.respuesta ).subscribe( res => {
               this.navService.setMesage( 1, this.msgs );
               this.getAnswers();
            }, error => {
               this.navService.setMesage( 3, this.msgs );
            } );
         }
      }
   }

   getAnswers() {
      this.questionnairesService.getAnswers( this.pregunta.idCuestionarioPregunta ).subscribe(
         res => {
            this.respuestas = res;
            this.formAnswer = false;
         } );
   }

   validateCodeR() {
      if ( this.respuesta.codigoOpcion !== '' && this.respuesta.codigoOpcion !== null ) {
         this.codeExistsR = this.respuestas.filter(
               t => (t.codigoOpcion === this.respuesta.codigoOpcion  ) ).length > 0;
      } else {
         this.codeExistsR = false;
      }
   }

}
