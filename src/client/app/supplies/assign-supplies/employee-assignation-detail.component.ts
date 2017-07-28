import { Component, OnInit } from '@angular/core';
import { EmployessSuppliesProjection } from '../../_models/employessSuppliesProjection';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployessSuppliesServices } from '../../_services/employeesSupplies.service';

@Component( {
               moduleId: module.id,
               selector: 'employee-assignation-detail',
               templateUrl: 'employee-assignation-detail.component.html'
            } )
export class EmployeeAssignationDetailComponent implements OnInit {

   public employessAssign: EmployessSuppliesProjection = new EmployessSuppliesProjection();

   constructor( private employessSuppliesServices: EmployessSuppliesServices,
      private route: ActivatedRoute ) {
   }

   ngOnInit() {

      this.route.params.subscribe( ( params: Params ) => {
         this.employessSuppliesServices.getEmployeeProjection( params[ 'idEmployeeAssign' ] ).subscribe( res => {
            this.employessAssign = res;
         } );
      } );
   }
}