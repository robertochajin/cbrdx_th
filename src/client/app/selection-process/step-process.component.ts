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
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';

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
   private es: any;
   private minDate: Date = new Date();
   private stepStates: ListaItem[] = [];
   public responsables: SelectItem[] = [];
   private showCalendar = false;

   constructor( public publicationsService: PublicationsService,
      private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private listaService: ListaService,
      private employeesService: EmployeesService,
      private vacanciesService: VacanciesService,
      private candidateProcessService: CandidateProcessService,
      private selectionStepService: SelectionStepService ) {

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

      this.minDate = new Date( Date.now() );

      this.approvalOptions.push({label: 'Seleccione', value:null});
      this.approvalOptions.push({label: 'No aplica este paso', value:2});
      this.approvalOptions.push({label: 'Aprueba este paso', value:1});
      this.approvalOptions.push({label: 'No aprueba este paso', value:0});

      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'idStep' ] !== undefined && params[ 'idPublication' ] !== undefined && params[ 'idCandidate' ] !== undefined ) {
            this.candidateProcess.idProcesoPaso = params[ 'idStep' ];
            this.candidateProcess.idTercero = params[ 'idCandidate' ];
            this.candidateProcess.idPublicacion = params[ 'idPublication' ];



            selectionStepService.get( params[ 'idStep' ] ).subscribe( step => {
               this.step = step;

               vacanciesService.getPublication( params[ 'idPublication' ] ).subscribe( pb => {
                  this.publication = pb;
               } );

               this.listaService.getMasterDetails( 'ListasEstadosDiligenciados' ).subscribe( res => {
                  this.stepStates = res;
                  if ( params[ 'idProceso' ] !== undefined && params[ 'idProceso' ] !== null && +params[ 'idProceso' ] !== 0 ) {
                     this.candidateProcess.idProcesoSeleccion = params[ 'idProceso' ];
                     this.candidateProcessService.get(this.candidateProcess.idProcesoSeleccion).subscribe(cp => {
                        this.candidateProcess = cp;
                        this.prepareForm();
                     });
                  } else {
                     this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode('VAC');
                     this.prepareForm();
                  }
               });


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

   prepareForm(){
      //Se verifica el estado del paso y la la necesidad de mostrar o nó la asignación de fecha
      if(this.getIdStateByCode('VAC') === this.candidateProcess.idEstadoDiligenciado){
         this.showCalendar = this.step.indicadorCalendario;


      } else if(this.getIdStateByCode('PROG') === this.candidateProcess.idEstadoDiligenciado){

      } else if(this.getIdStateByCode('APROB') === this.candidateProcess.idEstadoDiligenciado){

      }
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

   getIdStateByCode(code: string) : number {
      let state:ListaItem = this.stepStates.find(s => s.codigo === code);
      if(state !== undefined){
         return state.idLista;
      } else {
         return 0;
      }
   }


   goBack(){

   }
}