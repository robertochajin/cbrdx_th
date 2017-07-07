import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Questionnaries } from '../_models/questionnaries';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { QuestionnariesQuestions } from '../_models/questionnariesQuestions';
import { QuestionnariesAnswers } from '../_models/questionnariesAnswers';
import { SelectItem } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';

@Component( {
               moduleId: module.id,
               templateUrl: 'questionnaires-form.component.html',
               selector: 'roles-form.component',
               providers: [ ConfirmationService ]
            } )
export class QuestionnairesUpdateComponent implements OnInit {

   cuestionario: Questionnaries = new Questionnaries();
   quest: Questionnaries = new Questionnaries();
   preguntas: QuestionnariesQuestions[] = [];
   pregunta: QuestionnariesQuestions = new QuestionnariesQuestions();
   preg: QuestionnariesQuestions = new QuestionnariesQuestions();
   respuestas: QuestionnariesAnswers[] = [];
   respuesta: QuestionnariesAnswers = new QuestionnariesAnswers();

   allQuest: Questionnaries[] = [];
   idCuestionario: number;
   msgs: Message[] = [];
   codeExists: boolean = false;
   codeExistsP: boolean = false;
   formQuestion: boolean = false;
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

      this.quest.idCuestionario = 1;
      this.quest.cuestionario = "NOMBRE";
      this.quest.descripcion = "DESCRIP";
      this.quest.indicadorHabilitado = true;
      this.quest.indicadorPonderacion = true;
      this.quest.auditoriaUsuario = 1;
      this.quest.valor = 100;
      this.quest.auditoriaFecha = null;
      this.quest.codigo = "as2";

      this.preg.idPregunta = 1;
      this.preg.idCuestionario = 1;
      this.preg.pregunta = "NOMBRE";
      this.preg.codigo = "COD";
      this.preg.idTipo = 1;
      this.preg.tipo = "Abierto";
      this.preg.indicadorHabilitado = true;
      this.preg.indicadorObligatorio = false;
      this.preg.indicadorFiltrante = false;
      this.preg.indicadorDepende = false;
      this.preg.dependePregunta = null;
      this.preg.dependeRespuesta = null;
      this.preg.auditoriaUsuario = 1;
      this.preg.secuencia = 1;
      this.preg.auditoriaFecha = null;

      /*this.route.params.subscribe( params => {
       this.idCuestionario = +params[ 'id' ];
       if ( Number( this.idCuestionario ) > 0 ) {
       this.questionnairesService.get( this.idCuestionario ).subscribe(
       res => {
       this.cuestionario = res;
       this.getPreguntas();
       } );
       }
       } );*/
      this.allQuest.push( this.quest );
      this.cuestionario = this.quest;
      this.preguntas.push( this.preg );
      this.pregunta = this.preg;
      /*this.questionnairesService.getAll( ).subscribe(
       res => {
       this.allQuest = res;
       } );*/

      listaService.getMasterDetails( 'ListasTiposPersonas' ).subscribe( res => {
         this.questionsTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.questionsTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
   }

   ngOnInit() {
   }

   getPreguntas() {
      if ( Number( this.idCuestionario ) > 0 ) {
         this.questionnairesService.getQuestions( this.idCuestionario ).subscribe(
            res => {
               this.preguntas = res;
            } );
      }
   }

   getRespuestas( idPregunta: number ) {
      if ( Number( idPregunta ) > 0 ) {
         this.questionnairesService.getAnswers( idPregunta ).subscribe(
            res => {
               this.preguntas = res;
            } );
      }
   }

   goBack(fDirty : boolean): void {
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

   addQuestion() {
      this.formQuestion = true;
      this.pregunta = new QuestionnariesQuestions();
   }

   updateQuestion( pregunta: QuestionnariesQuestions ) {
      this.formQuestion = true;
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
         this.questionnairesService.update( this.cuestionario ).subscribe( res => {
            this.navService.setMesage( 1, this.msgs );
         }, error => {
            this.navService.setMesage( 3, this.msgs );
         } );
      }
   }

   validateCode() {
      if ( this.cuestionario.codigo !== '' && this.cuestionario.codigo !== null ) {
         this.codeExists = this.allQuest.filter(
               t => (t.codigo === this.cuestionario.codigo && t.idCuestionario !== this.cuestionario.idCuestionario ) ).length > 0;
      } else {
         this.codeExists = false;
      }
   }
}
