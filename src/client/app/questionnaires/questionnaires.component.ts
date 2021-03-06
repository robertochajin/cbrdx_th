import { Component, OnInit } from '@angular/core';
import { Questionnaries } from '../_models/questionnaries';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'questionnaires.component.html',
               selector: 'employees-component',
               providers: [ ConfirmationService ]
            } )

export class QuestionnairesComponent implements OnInit {

   quest: Questionnaries = new Questionnaries();
   questionnaries: Questionnaries[] = [];
   busqueda: string;

   constructor( private questionnairesService: QuestionnairesService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
      this.busqueda = navService.getSearch( 'questionnaries.component' );
   }

   ngOnInit() {
      this.questionnairesService.getAll( ).subscribe(
         questionnaires => {
            this.questionnaries = questionnaires;
       }
      );


   }

   detail( f: Questionnaries ) {
      this.router.navigate( [ 'questionnaries/view/detail/' + f.idCuestionario ] );
   }

   add() {
      this.router.navigate( [ 'questionnaries/add' ] );
   }

   update( c: Questionnaries ) {
      this.router.navigate( [ 'questionnaries/update/' + c.idCuestionario ] );
   }

   setSearch() {
      this.navService.setSearch( 'questionnaries.component', this.busqueda );
   }

}
