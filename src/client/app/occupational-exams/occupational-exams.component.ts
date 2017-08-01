import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
import { DocumentManagement } from '../_models/document-management';
import { DocumentManagementService } from '../_services/document-managgement.service';
import { Router } from '@angular/router';
import { Employee } from '../_models/employees';
import { EmployeesService } from '../_services/employees.service';
import { PositionsService } from '../_services/positions.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'occupational-exams.component.html',
               selector: 'occupational-exams',
               providers: [ ConfirmationService ]
            } )
export class OccupationalExamsComponent {
   msg: Message;
   listEmployee: Employee[] = [];
   listSelectEmployee: Employee[] = [];
   listTypeArea: SelectItem[] = [];
   listOf: SelectItem[] = [];
   listPosition: SelectItem[] = [];
   idTipoArea: number;
   busqueda: string;

   constructor( private employeesService: EmployeesService,
      private listaService: ListaService,
      private positionsService: PositionsService,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {

      this.busqueda = _nav.getSearch( 'document-management' );

   }

   ngOnInit(): void {
      this.employeesService.getAll().subscribe( rs => {
         for(){

         }
      } );
   }

   selectEmployee( empl: Employee ) {
      this.listSelectEmployee.push( empl );
   }

   //
   // add() {
   //    this.router.navigate( [ 'document-management/add' ] );
   // }

   update( d: DocumentManagement ) {
      // this.router.navigate( [ 'document-management/update/', d.idDocumentoTercero ] );
   }

   detail( d: DocumentManagement ) {
      // this.router.navigate( [ 'document-management/detail/', d.idDocumentoTercero ] );
   }

   setSearch() {
      this._nav.setSearch( 'document-management', this.busqueda );
   }
}
