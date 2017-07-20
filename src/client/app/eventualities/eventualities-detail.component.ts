import { Component, OnInit } from '@angular/core';
import { Eventuality } from '../_models/eventuality';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventualityServices } from '../_services/eventuality.service';
import { EventualityRolesServices } from '../_services/eventualityRoles.service';
import { EventualityFieldsServices } from '../_services/eventualityFields.service';
import { EventualityRoles } from '../_models/eventualityRoles';
import { EventualityField } from '../_models/eventualityField';

@Component( {
               moduleId: module.id,
               selector: 'eventualities-detail',
               templateUrl: 'eventualities-detail.component.html'
            } )
export class EventualitiesDetailComponent implements OnInit {

   public eventuality: Eventuality = new Eventuality();
   public listReportRoles: EventualityRoles[] = [];
   public evFields: EventualityField[] = [];

   constructor(
      private router: Router,
      private route: ActivatedRoute,
      private eventualityServices: EventualityServices,
      private eventualityRolesServices: EventualityRolesServices,
      private eventualityFieldsServices: EventualityFieldsServices) {
   }

   ngOnInit() {
      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'idEventuality' ] ) {
            this.eventualityServices.get( +params[ 'idEventuality' ] ).subscribe( obj => {
               this.eventuality = obj;
               this.eventualityRolesServices.getAllByEventuality( this.eventuality.idNovedad ).subscribe( rRoles => {
                  rRoles.map( rr => {
                     if ( rr.indicadorHabilitado ) {
                        this.listReportRoles.push( rr );
                     }
                  } );
               } );
               this.eventualityFieldsServices.getAllByEventuality( this.eventuality.idNovedad ).subscribe( evFields => {
                  this.evFields = evFields;
               } );
            } );
         } else {
            this.router.navigate( [ 'eventualities' ] );
         }
      } );
   }


}
