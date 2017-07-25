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
import { ListaItem } from '../_models/listaItem';

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
   listEstados: ListaItem[] = [];
   busqueda: string;
   saveEventuality: boolean = false;
   editEventuality: boolean = false;
   detailEventuality: boolean = false;
   activitiesEventuality: boolean = false;

   constructor( private employeeEventualitiesService: EmployeeEventualitiesService,
      private listaService: ListaService,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = _nav.getSearch( 'employee-eventualities' );
      this.listaService.getMasterDetails( 'ListasEstadosNovedades' ).subscribe( res => {
         this.listEstados = res;
      } );
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
   }

   update( e: EmployeeEventuality ) {
      this.employeeEventuality.idTerceroNovedad = e.idTerceroNovedad;
      this.editEventuality = !this.editEventuality;
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

   getStateByCode( codigo: string ) {
      let temp = this.listEstados.find( x => x.codigo === codigo );
      if ( temp ) {
         return temp.idLista;
      } else {
         return null;
      }
   }

   cancelar( e: EmployeeEventuality ) {
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea cancelar esta novedad?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              e.idEstadoNovedad = this.getStateByCode( 'CANCEL' );
                                              this.employeeEventualitiesService.update( e ).subscribe( rs => {
                                                 this.listEventualities = [];
                                                 this.employeeEventualitiesService.getAllByIdEmployee( this.employee.idTercero )
                                                 .subscribe( data => {
                                                    this.listEventualities = data;
                                                 } );
                                              } );
                                           }
                                        } );
   }

   activities( e: EmployeeEventuality ) {
      this.activitiesEventuality = !this.activitiesEventuality;
   }
}
