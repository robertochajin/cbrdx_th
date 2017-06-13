import { Component, OnInit } from '@angular/core';
import { PublicationsService } from '../_services/publications.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SelectionStepService } from '../_services/selection-step.service';
import { NavService } from '../_services/_nav.service';
import { SelectionStep } from '../_models/selectionStep';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import * as moment from 'moment/moment';
import { VacanciesService } from '../_services/vacancies.service';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { SelectItem } from 'primeng/components/common/api';
import { CandidateProcess } from '../_models/candidateProcess';
import { CandidateProcessService } from '../_services/candidate-process.service';

@Component( {
               moduleId: module.id,
               selector: 'step-process',
               templateUrl: 'step-process.component.html'
            } )
export class StepProcessComponent implements OnInit {
   private publication: PersonnelRequirement = new PersonnelRequirement();
   private step: SelectionStep = new SelectionStep();
   private candidate: Employee = new Employee();
   public  indApproval: number;
   public approvalOptions: SelectItem[] = [];
   public candidateProcess: CandidateProcess = new CandidateProcess();

   constructor( public publicationsService: PublicationsService,
      private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private employeesService: EmployeesService,
      private vacanciesService: VacanciesService,
      private candidateProcessService: CandidateProcessService,
      private selectionStepService: SelectionStepService ) {

      this.approvalOptions.push({label: 'Seleccione', value:null});
      this.approvalOptions.push({label: 'No aplica este paso', value:2});
      this.approvalOptions.push({label: 'Aprueba este paso', value:1});
      this.approvalOptions.push({label: 'No aprueba este paso', value:0});

      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'idStep' ] !== undefined && params[ 'idPublication' ] !== undefined && params[ 'idCandidate' ] !== undefined ) {
            this.candidateProcess.idProcesoPaso = params[ 'idStep' ];
            this.candidateProcess.idTercero = params[ 'idCandidate' ];
            this.candidateProcess.idPublicacion = params[ 'idPublication' ];

            if ( params[ 'idProceso' ] !== undefined && params[ 'idProceso' ] !== null && +params[ 'idProceso' ] !== 0 ) {
               this.candidateProcess.idProcesoSeleccion = params[ 'idProceso' ];
            }

            vacanciesService.getPublication( params[ 'idPublication' ] ).subscribe( pb => {
               this.publication = pb;
               selectionStepService.get( params[ 'idStep' ] ).subscribe( step => {
                  this.step = step;
               } );
            } );

            employeesService.get( params[ 'idCandidate' ] ).subscribe( cndt => {
               this.candidate = cndt;
               this.candidate.nombreCompleto = this.candidate.primerNombre + ' ' +
                                               this.candidate.segundoNombre + ' ' +
                                               this.candidate.primerApellido + ' ' +
                                               this.candidate.segundoApellido;
               this.candidate.edad = moment( this.candidate.fechaNacimiento, 'YYYY-MM-DD' ).toNow( true ).toString();
            } );

         } else {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process' ] );
         }
      } );
   }

   ngOnInit() {
   }

   onSubmit() {
      if(this.indApproval === 2){
         this.candidateProcess.indicadorNoAplica = true;
      } else if(this.indApproval === 1) {
         this.candidateProcess.indicadorContProceso = true;
      } else if(this.indApproval === 0) {
         this.candidateProcess.indicadorContProceso = false;
      }

      if(this.candidateProcess.idProcesoSeleccion !== undefined) {
         this.candidateProcessService.update(this.candidateProcess).subscribe(res => {
            if(res.ok) {
               this._nav.setMesage( 2 );
               this.router.navigate( [ 'selection-process' ] );
            } else {
               this._nav.setMesage( 3 );
               this.router.navigate( [ 'selection-process' ] );
            }
         }, () => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process' ] );
         });
      } else {
         this.candidateProcessService.add(this.candidateProcess).subscribe(res => {
            if(res.idProcesoSeleccion) {
               this._nav.setMesage( 1 );
               this.router.navigate( [ 'selection-process' ] );
            } else {
               this._nav.setMesage( 3 );
               this.router.navigate( [ 'selection-process' ] );
            }
         }, () => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process' ] );
         });
      }
   }

   goBack(){

   }
}