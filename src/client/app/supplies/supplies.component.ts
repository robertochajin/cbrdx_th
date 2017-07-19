import { Component, OnInit } from '@angular/core';
import { SuppliesGroups } from '../_models/suppliesGroups';
import { SuppliesService } from '../_services/supplies.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies.component.html',
               selector: 'supplies-component',
               providers: [ ConfirmationService ]
            } )

export class SuppliesComponent implements OnInit {

   suppliesGroups: SuppliesGroups = new SuppliesGroups();
   listSuppliesGroups: SuppliesGroups[] = [];
   busqueda: string;

   constructor( private suppliesService: SuppliesService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
      this.busqueda = navService.getSearch( 'supplies.component' );
   }

   ngOnInit() {
      this.suppliesService.getAll().subscribe(
         listSuppliesGroups => {
            this.listSuppliesGroups = listSuppliesGroups;
       }
      );
   }

   add() {
      this.router.navigate( [ 'supplies/add' ] );
   }

   update( c: SuppliesGroups ) {
      this.router.navigate( [ 'supplies/update/' + c.idGrupoDotacion ] );
   }

   setSearch() {
      this.navService.setSearch( 'supplies.component', this.busqueda );
   }

}
