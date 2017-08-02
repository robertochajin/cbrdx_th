import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { JwtHelper } from 'angular2-jwt';
import { EmployeeEventuality } from '../_models/employeeEventuality';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { Employee } from '../_models/employees';
import { EmployeesService } from '../_services/employees.service';
import { EmployeeEventualityPlans } from '../_models/employeeEventualitiesPlans';
import { EmployeeEventualityPlansAttachments } from '../_models/employeeEventualitiesPlansAttachment';

@Component( {
               moduleId: module.id,
               selector: 'accidents-incidents-add-plan',
               templateUrl: 'accidents-incidents-plan.component.html',
               providers: [ ConfirmationService ]
            } )

export class AccidentIncidentPlanComponent implements OnInit {
   employee: Employee = new Employee();
   listEmployees: Employee[] = [];
   msg: Message;
   busqueda: string;
   id: number;
   employeeEventuality: EmployeeEventuality = new EmployeeEventuality();
   employeeEventualityPlan: EmployeeEventualityPlans = new EmployeeEventualityPlans();
   listEmployeeEventualityPlan: EmployeeEventualityPlans[] = [];
   plansAttachments: EmployeeEventualityPlansAttachments[] = [];
   svcThUrl = '<%= SVC_TH_URL %>/api/upload';
   showForm: boolean = false;
   today: Date;
   es: any;

   constructor( private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private employeeEventualitiesService: EmployeeEventualitiesService,
      private employeeService: EmployeesService,
      private navService: NavService ) {

      this.route.params.subscribe( params => {
         this.id = +params[ 'id' ];
         if ( Number( this.id ) > 0 ) {
               this.employeeEventualitiesService.getById( this.id ).subscribe(
               res => {
                  this.employeeEventuality = res;
                  this.getTercero();
               } );
         }
      } );
   }

   ngOnInit() {

      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre',
            'diciembre'
         ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };
      this.today = new Date();
   }

   onSubmit() {
   }

   getTercero() {
      this.employeeService.get( this.employeeEventuality.idTercero ).subscribe(
         employee => {
            this.employee = employee;
            this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
                                           this.employee.segundoNombre + ' ' +
                                           this.employee.primerApellido + ' ' +
                                           this.employee.segundoApellido;
         } );
   }

   add(){
      this.showForm = true;
   }

}
