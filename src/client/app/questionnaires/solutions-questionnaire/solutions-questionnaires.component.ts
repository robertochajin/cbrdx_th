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
import { ListaItem } from '../../_models/listaItem';
import { EmployeesService } from '../../_services/employees.service';
import { Employee } from '../../_models/employees';
import { JwtHelper } from 'angular2-jwt';

@Component( {
               moduleId: module.id,
               selector: 'solutions-questionnaires',
               template: 'solutions-questionnaires.component.html',
               providers: [ ConfirmationService ]
            } )
export class SolutionsQuestionnairesComponent implements OnInit {
   @Input() cuestionario: Questionnaries;
   preguntas: QuestionnariesQuestions[] = [];
   pregunta: QuestionnariesQuestions = new QuestionnariesQuestions();
   respuestas: QuestionnariesAnswers[] = [];
   respuesta: QuestionnariesAnswers = new QuestionnariesAnswers();
   idCuestionario: number;
   idTercero: number;
   jwtHelper: JwtHelper = new JwtHelper();
   candidato: Employee = new Employee();

   constructor( private questionnairesService: QuestionnairesService,
      private router: Router,
      private location: Location,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private employeesService: EmployeesService,
      private navService: NavService ) {

      /*this.usuariosService.viewUser( idUsuario ).subscribe( data => {
       this.user = data;
       this.employeeService.get( this.user.idTercero ).subscribe( employee => {
       this.candidato = employee;
       this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
       this.employee.segundoNombre + ' ' +
       this.employee.primerApellido + ' ' +
       this.employee.segundoApellido;
       this.employee.edad = moment( this.employee.fechaNacimiento, 'YYYY-MM-DD' ).toNow( true ).toString();
       } );
       } );*/

   }

   ngOnInit() {
      this.idCuestionario = this.cuestionario.idCuestionario;
      this.getQuestions();
   }

   getQuestions() {
      if ( Number( this.idCuestionario ) > 0 ) {
         this.questionnairesService.getQuestions( this.idCuestionario ).subscribe(
            res => {
               this.preguntas = res;
            } );
      } else {
         this.preguntas = [];
      }
   }

   getAnswers() {
      this.questionnairesService.getAnswers( this.pregunta.idPregunta ).subscribe(
         res => {
            this.respuestas = res;
         } );
   }

}
