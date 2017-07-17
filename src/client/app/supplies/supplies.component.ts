import { Component, OnInit } from '@angular/core';
import { Supplies } from '../_models/supplies';
import { SuppliesService } from '../_services/supplies.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies.component.html',
               selector: 'employees-component',
               providers: [ ConfirmationService ]
            } )

export class SuppliesComponent implements OnInit {

   quest: Supplies = new Supplies();
   questionnaries: Supplies[] = [];
   busqueda: string;

   constructor( private suppliesService: SuppliesService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
      this.busqueda = navService.getSearch( 'questionnaries.component' );
   }

   ngOnInit() {
      this.suppliesService.getAll().subscribe(
         questionnaires => {
            this.questionnaries = questionnaires;
       }
      );


   }

   detail( f: Supplies ) {
      this.router.navigate( [ 'questionnaries/view/detail/' + f.idCuestionario ] );
   }

   add() {
      this.router.navigate( [ 'questionnaries/add' ] );
   }

   update( c: Supplies ) {
      this.router.navigate( [ 'questionnaries/update/' + c.idCuestionario ] );
   }

   setSearch() {
      this.navService.setSearch( 'questionnaries.component', this.busqueda );
   }

}
