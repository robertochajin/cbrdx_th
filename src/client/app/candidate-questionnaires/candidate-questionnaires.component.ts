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
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';

@Component( {
               moduleId: module.id,
               selector: 'candidate-questionnaires',
               templateUrl: 'candidate-questionnaires.component.html',
               providers: [ ConfirmationService ]
            } )
export class CandidateQuestionnairesComponent implements OnInit {
   private candidate: Employee = new Employee();

   constructor( private questionnairesService: QuestionnairesService,
      private router: Router,
      private location: Location,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private employeesService: EmployeesService,
      private navService: NavService ) {

   }

   ngOnInit() {
   }

}
