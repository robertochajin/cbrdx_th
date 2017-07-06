import { Component, Input, OnInit } from '@angular/core';
import { EmployeeVehicle } from '../_models/employee-vehicle';
import { EmployeeVehicleService } from '../_services/employee-vehicles.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { Employee } from '../_models/employees';
import { PermissionsEmployees } from '../_models/permissionsEmployees';

@Component( {
               moduleId: module.id,
               templateUrl: 'employee-vehicles.component.html',
               selector: 'employees-vehicle',
               providers: [ ConfirmationService ]
            } )
export class EmployeesVehicleComponent implements OnInit {
   @Input() employee: Employee;
   @Input() seccion: PermissionsEmployees;
   employeeVehicle: EmployeeVehicle = new EmployeeVehicle();
   dialogObjet: EmployeeVehicle = new EmployeeVehicle();

   employeesVehicle: EmployeeVehicle[];

   constructor( private employeesVehicleService: EmployeeVehicleService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {

      this.employeesVehicleService.getByIdTercero( this.employee.idTercero ).subscribe(
         employeesVehicle => {
            this.employeesVehicle = employeesVehicle;

         }
      );

   }

   del( employeeVehicle: EmployeeVehicle ) {
      this.dialogObjet = employeeVehicle;
      this.confirmationService.confirm( {
                                           message: `¿Está seguro que desea inactivar este registro?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.employeesVehicleService.update( this.dialogObjet ).subscribe( r => {
                                                 this.employeesVehicle.splice( this.employeesVehicle.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   add() {
      this.router.navigate( [ 'employees/detail/' + this.employee.idTercero + '/vehicle/add/' ] );
   }

   detail( c: EmployeeVehicle ) {
      this.router.navigate( [ 'employees/detail/' + this.employee.idTercero + '/vehicle/detail/' + c.idTerceroVehiculo ] );
   }

   update( c: EmployeeVehicle ) {
      this.router.navigate( [ 'employees/detail/' + this.employee.idTercero + '/vehicle/update/' + c.idTerceroVehiculo ] );
   }
}
