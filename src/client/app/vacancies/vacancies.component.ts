import { Component, OnInit } from '@angular/core';
import { Vacancies } from '../_models/vacancies';
import { VacanciesService } from '../_services/vacancies.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'vacancies.component.html',
               selector: 'vacancies-list',
               providers: [ ConfirmationService ]
            } )

export class VacanciesComponent implements OnInit {

   vacancy: Vacancies = new Vacancies();
   vacancies: Vacancies[];

   constructor( private vacanciesService: VacanciesService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      /*this.vacanciesService.getInProcess().subscribe(
         vacancies => {
            this.vacancies = vacancies;
         }
      );*/
   }

   update( c: Vacancies ) {
      this.router.navigate( [ 'vacancies/update/' + c.idVacante ] );
   }

}
