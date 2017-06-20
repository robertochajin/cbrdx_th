import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models/employees';
import { EmployeesService } from '../_services/employees.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'employees.component.html',
               selector: 'employees-component',
               providers: [ ConfirmationService ]
            } )

export class EmployeesComponent implements OnInit {

   employee: Employee = new Employee();
   dialogObjet: Employee = new Employee();

   employees: Employee[];
   codigoTipo: number;
   busqueda: string;

   constructor( private employeesService: EmployeesService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {
      this.busqueda = navService.getSearch( 'employees.component' );
   }

   ngOnInit() {
      this.employeesService.getByTipo( 'TERCOL' ).subscribe(
         employees => {
            this.employees = employees;
            this.employees.forEach( e => {
               e.nombreCompleto = e.primerNombre + ' ' + e.segundoNombre + ' ' + e.primerApellido + ' ' + e.segundoApellido;
            } );
         }
      );

   }

   del( employee: Employee ) {
      this.dialogObjet = employee;
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea inactivar este registro?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.employeesService.delete( this.dialogObjet );
                                              this.employees.splice( this.employees.indexOf( this.dialogObjet ), 1 );
                                              this.dialogObjet = null;
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   detail( f: Employee ) {
      this.router.navigate( [ 'employees/view/detail/' + f.idTercero ] );
   }

   add() {
      this.router.navigate( [ 'employees/add' ] );
   }

   update( c: Employee ) {
      this.router.navigate( [ 'employees/detail/' + c.idTercero ] );
   }

   setSearch() {
      this.navService.setSearch( 'employees.component', this.busqueda );
   }

}
