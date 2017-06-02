import { Component, OnInit } from '@angular/core';
import { RolesService } from '../_services/roles.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { VacanciesService } from '../_services/vacancies.service';
import { ListaService } from '../_services/lista.service';
import moment = require('moment');

@Component( {
               moduleId: module.id,
               templateUrl: 'vacancy-list.component.html'
            } )
export class SelectionProcessVacanciesComponent implements OnInit {



   constructor( private rolesService: RolesService,
      private router: Router,
      private navService: NavService,
      private listaService: ListaService,
      private vacanciesService: VacanciesService, ) {
   }

   ngOnInit() {
   }


}
