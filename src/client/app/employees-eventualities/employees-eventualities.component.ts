import { Component, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
import { DocumentManagement } from '../_models/document-management';
import { DocumentManagementService } from '../_services/document-managgement.service';
import { Router } from '@angular/router';
import { Employee } from '../_models/employees';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { EmployeeEventuality } from '../_models/employeeEventuality';

@Component( {
               moduleId: module.id,
               templateUrl: 'employees-eventualities.component.html',
               selector: 'employee-novelty',
               providers: [ ConfirmationService ]
            } )
export class EmployeeEventualitiesComponent {

   @Input()
   employee: Employee = new Employee();
   msg: Message;
   listEventualities: EmployeeEventuality [];
   busqueda: string;

   constructor( private employeeEventualitiesService: EmployeeEventualitiesService,
      private listaService: ListaService,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.employee.idTercero = 129; // id tercero quemado..
      this.employeeEventualitiesService.getAllByIdEmployee( this.employee.idTercero ).subscribe( data => {
         this.listEventualities = data;
      } );
      this.busqueda = _nav.getSearch( 'employee-eventualities' );
   }

   add() {
      this.router.navigate( [ 'employee-eventualities/add/' + this.employee.idTercero + '/' + 0 ] );
   }

   update( e: EmployeeEventuality ) {
      this.router.navigate( [ 'employee-novelty/update/' + this.employee.idTercero + '/' + e.idNovedadTercero ] );
   }

   detail( e: EmployeeEventuality ) {
      this.router.navigate( [ 'document-management/detail/', e.idNovedadTercero ] );
   }

   setSearch() {
      this._nav.setSearch( 'employee-eventualities', this.busqueda );
   }
}
