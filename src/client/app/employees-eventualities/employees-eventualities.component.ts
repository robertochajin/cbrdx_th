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
               selector: 'employee-eventuality',
               providers: [ ConfirmationService ]
            } )
export class EmployeeEventualitiesComponent {

   @Input()
   employee: Employee;
   msg: Message;
   employeeEventuality: EmployeeEventuality = new EmployeeEventuality();
   listEventualities: EmployeeEventuality [];
   busqueda: string;
   saveEventuality: boolean = false;
   editEventuality: boolean = false;
   detailEventuality: boolean = false;

   constructor( private employeeEventualitiesService: EmployeeEventualitiesService,
      private listaService: ListaService,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = _nav.getSearch( 'employee-eventualities' );
   }

   ngOnInit() {
      this.employeeEventuality.idTercero = this.employee.idTercero;
      this.employeeEventualitiesService.getAllByIdEmployee( this.employee.idTercero ).subscribe( data => {
         this.listEventualities = data;
      } );
   }

   add() {
      this.employeeEventuality.idTerceroNovedad = null;
      this.saveEventuality = !this.saveEventuality;
      // this.router.navigate( [ 'employee-eventualities/add/' + this.employee.idTercero + '/' + 0 ] );
   }

   update( e: EmployeeEventuality ) {
      this.employeeEventuality.idTerceroNovedad = e.idTerceroNovedad;
      this.editEventuality = !this.editEventuality;
      // this.router.navigate( [ 'employee-novelty/update/' + this.employee.idTercero + '/' + e.idTerceroNovedad ] );
   }

   toggleForm() {
      this.saveEventuality = !this.saveEventuality;
      this.listEventualities = [];
      this.employeeEventualitiesService.getAllByIdEmployee( this.employee.idTercero ).subscribe( data => {
         this.listEventualities = data;
      } );
   }

   toggleFormEdit() {
      this.editEventuality = !this.editEventuality;
      this.listEventualities = [];
      this.employeeEventualitiesService.getAllByIdEmployee( this.employee.idTercero ).subscribe( data => {
         this.listEventualities = data;
      } );
   }

   toggleDetail() {
      this.detailEventuality = !this.detailEventuality;
   }

   detail( e: EmployeeEventuality ) {
      this.employeeEventuality = e;
      this.detailEventuality = !this.detailEventuality;
   }

   setSearch() {
      this._nav.setSearch( 'employee-eventualities', this.busqueda );
   }
}
