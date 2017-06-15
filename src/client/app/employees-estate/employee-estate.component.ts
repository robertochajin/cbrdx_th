import { Component, Input, OnInit } from '@angular/core';
import { EmployeeEstate } from '../_models/employee-estate';
import { EmployeeEstateService } from '../_services/employee-estate.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { Employee } from '../_models/employees';

@Component( {
               moduleId: module.id,
               templateUrl: 'employee-estate.component.html',
               selector: 'employees-estate',
               providers: [ ConfirmationService ]
            } )
export class EmployeesEstateComponent implements OnInit {
   @Input() employee: Employee;
   employeeEstate: EmployeeEstate = new EmployeeEstate();
   dialogObjet: EmployeeEstate = new EmployeeEstate();

   employeesEstate: EmployeeEstate[];

   constructor( private employeesEstateService: EmployeeEstateService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {

      this.employeesEstateService.getByEmployee( this.employee.idTercero ).subscribe(
         employeesEstate => {
            this.employeesEstate = employeesEstate;

         }
      );

   }

   del( employeeEstate: EmployeeEstate ) {
      this.dialogObjet = employeeEstate;
      this.confirmationService.confirm( {
                                           message: `¿Está seguro que desea inhabilitar este registro?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.employeesEstateService.update( this.dialogObjet ).subscribe( r => {
                                                 this.employeesEstate.splice( this.employeesEstate.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   add() {
      this.router.navigate( [ 'employees/detail/' + this.employee.idTercero + '/estate/add' ] );
   }

   detail( c: EmployeeEstate ) {
      this.router.navigate( [ 'employees/detail/' + this.employee.idTercero + '/estate/detail/' + c.idTerceroInmueble ] );
   }

   update( c: EmployeeEstate ) {
      this.router.navigate( [ 'employees/detail/' + this.employee.idTercero + '/estate/update/' + c.idTerceroInmueble ] );
   }
}
