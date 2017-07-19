import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PhysicStructure } from '../_models/physic-structure';
import { PhysicStructureService } from '../_services/physic-structure.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { EmployeeEstate } from '../_models/employee-estate';
import { EmployeeEstateService } from '../_services/employee-estate.service';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import { SelectionStepService } from '../_services/selection-step.service';
import { PostulationHistory } from '../_models/postulationHistory';

@Component( {
               moduleId: module.id,
               templateUrl: 'postulation-history.component.html',
               selector: 'postulation-history',
               providers: [ ConfirmationService ]
            } )

export class PostulationHistoryComponent implements OnInit {

   @Input()
   idTercero: number;

   employeeEstate: EmployeeEstate = new EmployeeEstate();
   employee: Employee = new Employee();
   listHistory: PostulationHistory[];
   busqueda: string;

   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();

   constructor( private selectionStepService: SelectionStepService,
      private employeesService: EmployeesService,
      private router: Router,
      private navService: NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = this.navService.getSearch( 'postulation-history' );
   }

   ngOnInit() {

      if ( this.idTercero ) {
         this.employeesService.get( this.idTercero ).subscribe( rs => {
            this.employee = rs;
         } );
         this.selectionStepService.getHistoryByIdEmployee( this.idTercero ).subscribe( data => {
            this.listHistory = data;
         } );
      }
   }

   goBack() {
      this.dismiss.emit( 1 );
   }

   setSearch() {
      this.navService.setSearch( 'postulation-history', this.busqueda );
   }
}
