import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { EmployeesRecruitmentService } from '../_services/employees-recruitment.service';
import { SelectionStepService } from '../_services/selection-step.service';
import { Employee } from '../_models/employees';
import { EmployeesRecruitment } from '../_models/EmployeesRecruitment';
import { SelectionStep } from '../_models/SelectionStep';
import { EmployeeRecruitmentSteps } from '../_models/employee-recruitment-steps';

@Component( {
               moduleId: module.id,
               templateUrl: 'employees-recruitment.component.html',
               selector: 'employees-recruitment'
            } )

export class EmployeesRecruitmentComponent implements OnInit {

   @Input()
   employee: Employee;
   msg: Message;
   msgs: Message[] = [];
   Publication: SelectItem[] = [];
   employeesRecruitmentSteps: EmployeeRecruitmentSteps[] = [];
   listEmployeesRecruitment: EmployeesRecruitment[] = [];
   myStep: SelectionStep;

   constructor( private employeesRecruitmentService: EmployeesRecruitmentService,
      private selectionStepService: SelectionStepService,
      private router: Router,
      private navService: NavService,
      private route: ActivatedRoute ) {

      //this.employeesRecruitment = new EmployeesRecruitment();

   }

   ngOnInit() {
      // Lista Tipo de cargos para el tercero actual. Llena el DT
      this.employeesRecruitmentService.getEmployeesStep( this.employee.idTercero ).subscribe(data=>{
         this.listEmployeesRecruitment = data;
      });
   }

   getEmployeesStepDetail(id: number) {
         this.employeesRecruitmentService.getEmployeesStepDetail( id ).subscribe(data=>{
            this.employeesRecruitmentSteps = data;
         });
   }

   // Redirecciona a la pantalla dependiendo del paso y del rol del usuario
   redirecStep( recruitmentSteps: employeesRecruitmentSteps, ) {
      this.selectionStepService.get( recruitmentSteps.idProcesoPaso ).subscribe(data=>{
         this.myStep = data;
      });
      // if ( this.userRoles.find( r => r.rol === 'ROLE_PROCESOSELECCION' )
           // || (myStep !== undefined && myStep.idResponsable === this.usuarioLogueado.usuario.idUsuario) ) {
         if ( this.myStep !== undefined && this.myStep.interfazInterna ) {
         //    //selection-process/process-step/candidate-revision/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso
         //    //selection-process/process-step/:idStep/centralRisk/terceroPublication/:idTerceroPublication/process/:idProceso
         //    //selection-process/process-step/call-reference/:idStep/terceroPublication/:idTerceroPublication/process/:idProceso
         //
            this.router.navigate(
               [ myStep.interfazInterna.replace( ':idStep', recruitmentSteps.idProcesoPaso.toString() )
               .replace( ':idTerceroPublication', recruitmentSteps.idTerceroPublicacion.toString() )
               .replace( ':idProceso', this.myStep.idProceso ? this.myStep.idProceso.toString() : '0' )
               ] );
         } else {
            let stepProcessUrl = 'selection-process/process-step/' + recruitmentSteps.idProcesoPaso.toString() + '/terceroPublication/' + recruitmentSteps.idTerceroPublicacion.toString();
            if ( recruitmentSteps.idProcesoSeleccion ) {
               stepProcessUrl += '/process/' + recruitmentSteps.idProcesoSeleccion.toString();
            } else {
               stepProcessUrl += '/process/0';
            }
            this.router.navigate(
               [ stepProcessUrl ] );
          }
      // }
   }

}