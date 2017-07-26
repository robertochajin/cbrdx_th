import { Component, OnInit } from '@angular/core';
import { SuppliesProjectionServices } from '../_services/suppliesProjection.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Supplies } from '../_models/supplies';

@Component( {
               moduleId: module.id,
               templateUrl: 'consolidated-projection.component.html',
               selector: 'consolidated-projection-component',
               providers: [ ConfirmationService ]
            } )

export class ConsolidatedProjectionComponent implements OnInit {

   supplies: Supplies = new Supplies();
   listSupplies: Supplies[] = [];
   busqueda: string;
   idProyeccionDotacion: number;

   constructor( private suppliesProjectionServices: SuppliesProjectionServices,
      private router: Router,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
      this.busqueda = navService.getSearch( 'consolidated-projection-component' );
      this.idProyeccionDotacion = 1;
   }

   ngOnInit() {
      this.suppliesProjectionServices.getByProjection( this.idProyeccionDotacion ).subscribe(
         listSupplies => {
            this.listSupplies = listSupplies;
            this.listSupplies.map( g => {
               this.suppliesProjectionServices.getConsolidated( g.idDotacion, this.idProyeccionDotacion ).subscribe(
                  total => g.totales = total
               );
            } );
         }
      );
   }

   setSearch() {
      this.navService.setSearch( 'consolidated-projection-component', this.busqueda );
   }

}
