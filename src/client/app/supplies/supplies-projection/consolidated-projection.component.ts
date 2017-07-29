import { Component, OnInit } from '@angular/core';
import { SuppliesProjectionServices } from '../../_services/suppliesProjection.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { NavService } from '../../_services/_nav.service';
import { Supplies } from '../../_models/supplies';
import { SuppliesProjection } from '../../_models/suppliesProjection';

@Component( {
               moduleId: module.id,
               templateUrl: 'consolidated-projection.component.html',
               selector: 'consolidated-projection-component',
               providers: [ ConfirmationService ]
            } )

export class ConsolidatedProjectionComponent implements OnInit {

   supplies: Supplies = new Supplies();
   suppliesProjection: SuppliesProjection = new SuppliesProjection();
   listSupplies: Supplies[] = [];
   busqueda: string;
   idProyeccionDotacion: number;
   showArea = false;
   selected = 0;
   constructor( private suppliesProjectionServices: SuppliesProjectionServices,
      private router: Router,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
      this.busqueda = navService.getSearch( 'consolidated-projection-component' );

      this.route.params.subscribe( ( params: Params ) => {
         this.idProyeccionDotacion = +params[ 'id' ];
         this.suppliesProjectionServices.getByProjection( this.idProyeccionDotacion )
         .subscribe(
            listSupplies => {
               this.idProyeccionDotacion = +params[ 'id' ];
               this.suppliesProjectionServices.get( this.idProyeccionDotacion ).subscribe( data => {
                  this.suppliesProjection = data;
               } );
               this.listSupplies = listSupplies;
               this.listSupplies.map( g => {
                  this.suppliesProjectionServices.getConsolidated( g.idDotacion, this.idProyeccionDotacion ).subscribe(
                     total => g.totales = total
                  );
               } );
            }
         );
      } );

   }

   ngOnInit() {

   }

   swichArea() {
      this.showArea = !this.showArea;
   }

   setSearch() {
      this.navService.setSearch( 'consolidated-projection-component', this.busqueda );
   }

}
