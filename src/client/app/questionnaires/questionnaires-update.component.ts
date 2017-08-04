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
   formQuestionnarie: boolean = true;
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
               this.sortQuestions();
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
         this.formQuestionnarie = false;
         this.questionnairesService.update( this.cuestionario ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
            this.formQuestionnarie = true;
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

   inputCleanCode( event: any ) {
      let input = event.target.value;
      if ( input.length > 0 ) {
         event.target.value = input.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
      }
   }

   addQuestion() {
      this.formQuestion = true;
      this.showAnswers = false;
      this.pregunta = new QuestionnariesQuestions();
      this.getPreviousQuestions( this.preguntas.length + 1 );
   }

   getPreviousQuestions( secuencia: number ) {
      this.previousQuestions = [];
      this.previousQuestions.push( { label: 'Seleccione', value: null } );
      this.preguntas.filter( p => p.secuencia < secuencia && p.indicadorHabilitado === true &&
                                  ( p.codigoTipoPregunta === 'CHECK' || p.codigoTipoPregunta === 'SELECT' ) ).map( s => {
         this.previousQuestions.push( { label: s.pregunta, value: s.idCuestionarioPregunta } );
      } );
   }

   getPreviousAnswers() {
      this.previousAnswers = [];
      this.previousAnswers.push( { label: 'Seleccione', value: null } );
      if ( this.pregunta.idDependePregunta ) {
         this.questionnairesService.getAnswers( this.pregunta.idDependePregunta ).subscribe(
            res => {
               res.map( s => {
                  this.previousAnswers.push( { label: s.opcion, value: s.idPreguntaOpcion } );
               } );
            } );
      }

   }

   updateQuestion( pregunta: QuestionnariesQuestions ) {
      this.formQuestion = true;
      this.showAnswers = false;
      this.pregunta = pregunta;
      this.getPreviousQuestions( this.pregunta.secuencia );
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
            this.pregunta.secuencia = this.preguntas.length + 1;
            this.pregunta.codigoPregunta = this.pregunta.codigoPregunta.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
            this.questionnairesService.addQuestion( this.pregunta ).subscribe( res => {
               this.formQuestion = false;
               this.showAnswers = false;
               this.pregunta = new QuestionnariesQuestions();
               this.getQuestions();
               this.navService.setMesage( 1, this.msgs );
            }, error => {
               this.navService.setMesage( 3, this.msgs );
            } );
         } else {
            this.questionnairesService.updateQuestion( this.pregunta ).subscribe( res => {
               this.navService.setMesage( 1, this.msgs );
               this.formQuestion = false;
               this.showAnswers = false;
               this.pregunta = new QuestionnariesQuestions();
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

   downQuestion( f: QuestionnariesQuestions ) {
      let myIndex = this.preguntas.indexOf( f );
      if ( myIndex < this.preguntas.length - 1 ) {
         let newOrder = this.preguntas[ myIndex ].secuencia;
         this.preguntas[ myIndex ].secuencia = this.preguntas[ myIndex + 1 ].secuencia;
         this.questionnairesService.updateQuestion( this.preguntas[ myIndex ] ).subscribe( res => {
            if ( res.ok ) {
               this.preguntas[ myIndex + 1 ].secuencia = newOrder;
               this.questionnairesService.updateQuestion( this.preguntas[ myIndex + 1 ] ).subscribe( res => {
                  if ( res.ok ) {
                     this.sortQuestions();
                  }
               } );
            }
         } );
      }
   }

   upQuestion( f: QuestionnariesQuestions ) {
      let myIndex = this.preguntas.indexOf( f );
      if ( myIndex > 0 ) {
         let newOrder = this.preguntas[ myIndex ].secuencia;
         this.preguntas[ myIndex ].secuencia = this.preguntas[ myIndex - 1 ].secuencia;
         this.questionnairesService.updateQuestion( this.preguntas[ myIndex ] ).subscribe( res => {
            if ( res.ok ) {
               this.preguntas[ myIndex - 1 ].secuencia = newOrder;
               this.questionnairesService.updateQuestion( this.preguntas[ myIndex - 1 ] ).subscribe( res => {
                  if ( res.ok ) {
                     this.sortQuestions();
                  }
               } );
            }
         } );
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
            this.respuesta.orden = this.respuestas.length + 1;
            this.respuesta.codigoOpcion = this.respuesta.codigoOpcion.toUpperCase().replace( /[^A-Z0-9]/g, '' ).trim();
            this.questionnairesService.addAnswer( this.respuesta ).subscribe( res => {
               this.navService.setMesage( 1, this.msgs );
               this.formAnswer = false;
               this.respuesta = new QuestionnariesAnswers();
               this.getAnswers();
            }, error => {
               this.navService.setMesage( 3, this.msgs );
            } );
         } else {
            this.questionnairesService.updateAnswer( this.respuesta ).subscribe( res => {
               this.navService.setMesage( 1, this.msgs );
               this.formAnswer = false;
               this.respuesta = new QuestionnariesAnswers();
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
            this.sortAnswers();
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

   downAnswer( f: QuestionnariesAnswers ) {
      let myIndex = this.respuestas.indexOf( f );
      if ( myIndex < this.respuestas.length - 1 ) {
         let newOrder = this.respuestas[ myIndex ].orden;
         this.respuestas[ myIndex ].orden = this.respuestas[ myIndex + 1 ].orden;
         this.questionnairesService.updateAnswer( this.respuestas[ myIndex ] ).subscribe( res => {
            if ( res.ok ) {
               this.respuestas[ myIndex + 1 ].orden = newOrder;
               this.questionnairesService.updateAnswer( this.respuestas[ myIndex + 1 ] ).subscribe( res => {
                  if ( res.ok ) {
                     this.sortAnswers();
                  }
               } );
            }
         } );
      }
   }

   upAnswer( f: QuestionnariesAnswers ) {
      let myIndex = this.respuestas.indexOf( f );
      if ( myIndex > 0 ) {
         let newOrder = this.respuestas[ myIndex ].orden;
         this.respuestas[ myIndex ].orden = this.respuestas[ myIndex - 1 ].orden;
         this.questionnairesService.updateAnswer( this.respuestas[ myIndex ] ).subscribe( res => {
            if ( res.ok ) {
               this.respuestas[ myIndex - 1 ].orden = newOrder;
               this.questionnairesService.updateAnswer( this.respuestas[ myIndex - 1 ] ).subscribe( res => {
                  if ( res.ok ) {
                     this.sortAnswers();
                  }
               } );
            }
         } );
      }
   }

   private sortQuestions() {
      this.preguntas.sort( function ( a, b ) {
         if ( a.secuencia < b.secuencia )
            return -1;
         else
            return 1;
      } )
   }

   private sortAnswers() {
      this.respuestas.sort( function ( a, b ) {
         if ( a.orden < b.orden )
            return -1;
         else
            return 1;
      } )
   }

}
