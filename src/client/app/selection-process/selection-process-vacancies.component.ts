import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { VacanciesService } from '../_services/vacancies.service';
import moment = require('moment');
import { PersonnelRequirement } from '../_models/personnelRequirement';

@Component( {
               moduleId: module.id,
               templateUrl: 'vacancy-list.component.html'
            } )
export class SelectionProcessVacanciesComponent implements OnInit {

   publications: PersonnelRequirement[] = [];

   constructor(private router: Router, private vacanciesService: VacanciesService) {
      vacanciesService.getAllActive().subscribe(ps => {
         this.publications = ps;
      });
   }

   ngOnInit() {

   }


   aplicar(publication: PersonnelRequirement){
      this.router.navigate( [ 'apply-vacancy/publications-detail/' + publication.idPublicacion ] );
   }




}
