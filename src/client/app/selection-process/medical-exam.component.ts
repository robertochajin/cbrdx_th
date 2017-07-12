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
import { SelectItem, ConfirmationService } from 'primeng/components/common/api';
import { CandidateProcess } from '../_models/candidateProcess';
import { CandidateProcessService } from '../_services/candidate-process.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';

import { JwtHelper } from 'angular2-jwt';
import { RolesService } from '../_services/roles.service';
import { References } from '../employees-references/references';
import { ReferencesService } from '../employees-references/references.service';
import { MedicalExam } from '../_models/medicalExam';
import { MedicalInstitutionService } from '../_services/medical-institutions.service';
import { MedicalInstitution } from '../_models/medical-institutions';
import { MedicalExamService } from '../_services/medical-exam.service';
import { MasterAnswersService } from '../_services/masterAnswers.service';
import { MasterAnswers } from '../_models/masterAnswers';

@Component( {
               moduleId: module.id,
               selector: 'medical-exam',
               templateUrl: 'medical-exam.component.html',
               providers: [ ConfirmationService ]
            } )
export class MedicalExamComponent implements OnInit {

   private publication: PersonnelRequirement = new PersonnelRequirement();
   private step: SelectionStep = new SelectionStep();
   private candidate: Employee = new Employee();
   public indApproval: string;
   public approvalOptions: SelectItem[] = [];
   public candidateProcess: CandidateProcess = new CandidateProcess();
   private es: any;
   masterAnswer: MasterAnswers = new MasterAnswers();
   showQuestionnaire = false;
   private minDate: Date = new Date();
   private stepStates: ListaItem[] = [];
   private desitionList: ListaItem[] = [];
   public responsables: SelectItem[] = [];
   private showCalendar = false;
   private readonly = false;
   svcThUrlAvatar = '<%= SVC_TH_URL %>/api/upload';

   usuarioLogueado: any;
   idRol: number;
   jwtHelper: JwtHelper = new JwtHelper();
   medicalExam: MedicalExam = new MedicalExam();
   references: References[];
   minDateEx: Date = new Date();
   rangeFin: string;
   medicalInstitutions: SelectItem[] = [];
   listEstExaMed: ListaItem[];
   enesperarespuesta: boolean = true;
   sinprogramar: boolean = true;
   respondido: boolean = false;
   institucionMedica: boolean = true;
   consentimiennto: boolean = false;

   constructor( public publicationsService: PublicationsService,
      private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private rolesService: RolesService,
      private masterAnswersService: MasterAnswersService,
      private employeesService: EmployeesService,
      private vacanciesService: VacanciesService,
      private candidateProcessService: CandidateProcessService,
      private medicalExamService: MedicalExamService,
      private medicalInstitutionService: MedicalInstitutionService,
      private selectionStepService: SelectionStepService ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.candidateProcess.idResponsable = this.usuarioLogueado.usuario.idUsuario;
      }

      this.listaService.getMasterDetails( 'ListasDecisionesProcesoSeleccion' ).subscribe( res => {
         this.desitionList = res;
         this.approvalOptions.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            if ( s.codigo !== 'NOAPL' ) {
               this.approvalOptions.push( { label: s.nombre, value: s.codigo } );
            }
         } );
      } );
      this.listaService.getMasterDetails( 'ListasEstadosExamenesMedicos' ).subscribe( res => {
         this.listEstExaMed = res;
      } );

      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'idStep' ] !== undefined && params[ 'idTerceroPublication' ] !== undefined ) {
            this.candidateProcess.idProcesoPaso = params[ 'idStep' ];
            this.candidateProcess.idTerceroPublicacion = params[ 'idTerceroPublication' ];

            selectionStepService.get( params[ 'idStep' ] ).subscribe( step => {
               this.step = step;

               selectionStepService.getTerceroPublicacio( params[ 'idTerceroPublication' ] ).subscribe( res => {
                  employeesService.get( res.idTercero ).subscribe( cndt => {
                     this.candidate = cndt;
                     this.candidate.nombreCompleto = this.candidate.primerNombre + ' ' +
                                                     this.candidate.segundoNombre + ' ' +
                                                     this.candidate.primerApellido + ' ' +
                                                     this.candidate.segundoApellido;
                     this.candidate.edad = moment( this.candidate.fechaNacimiento, 'YYYY-MM-DD' ).toNow( true ).toString();
                  } );
                  vacanciesService.getPublication( res.idPublicacion ).subscribe( pb => {
                     this.publication = pb;
                     // obtener las instituciones medicas
                     this.medicalInstitutionService.getByIdPublic( this.publication.idPublicacion ).subscribe( data => {
                        if ( data.length > 0 ) {
                           this.institucionMedica = true;
                           this.medicalInstitutions.push( { label: 'Seleccione', value: null } );
                           for ( let c of data ) {
                              this.medicalInstitutions.push( { label: c.institucionMedica, value: c.idInstitucionMedica } );
                           }
                        } else {
                           this.institucionMedica = false;
                        }
                     } );
                  } );
               } );

               this.listaService.getMasterDetails( 'ListasEstadosDiligenciados' ).subscribe( res => {
                  this.stepStates = res;
                  if ( params[ 'idProceso' ] !== undefined && params[ 'idProceso' ] !== null && +params[ 'idProceso' ] !== 0 ) {
                     this.candidateProcess.idProcesoSeleccion = params[ 'idProceso' ];
                     this.candidateProcessService.get( this.candidateProcess.idProcesoSeleccion ).subscribe( cp => {
                        this.candidateProcess = cp;
                        if ( this.getIdStateByCode( 'APROB' ) === this.candidateProcess.idEstadoDiligenciado ) {
                           this.readonly = true;
                        }
                        // obtener examen medico
                        this.medicalExamService.getByIdProceso( this.candidateProcess.idProcesoSeleccion ).subscribe( rs => {
                           this.medicalExam = rs;
                           this.medicalExam.fechaProgramada = new Date(this.medicalExam.fechaProgramada);
                           if ( this.listEstExaMed.find( x => x.idLista === this.medicalExam.idEstadoExamenMedico ).codigo === 'RESPOND' ) {
                              this.respondido = true;
                           }

                           if(this.medicalExam.idMaestroRespuesta){
                              this.masterAnswersService.get( this.medicalExam.idMaestroRespuesta ).subscribe( res => {
                                 this.masterAnswer = res;
                                 this.showQuestionnaire = true;
                              } );
                           }
                        } );
                     } );
                  } else {
                     this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'VAC' );
                  }
               } );
            } );
         } else {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process' ] );
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
      let today = new Date();
      let year = today.getFullYear();
      let last40Year = year - 40;
      let next40Year = year + 40;
      this.minDateEx = today;
      this.rangeFin = `${last40Year}:${next40Year}`;

   }

   onSubmit() {
      if ( this.indApproval === 'APRB' ) {
         this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'APROB' );
         this.candidateProcess.idDesicionProcesoSeleccion = this.getIdDesitionByCode( 'APRB' );
      } else if ( this.indApproval === 'NOAPRB' ) {
         this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'RECH' );
         this.candidateProcess.idDesicionProcesoSeleccion = this.getIdDesitionByCode( 'NOAPRB' );
      }

      if ( this.candidateProcess.idProcesoSeleccion !== undefined ) {
         this.candidateProcessService.update( this.candidateProcess ).subscribe( res => {
            if ( res.ok ) {
               this._nav.setMesage( 2 );
               this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
            } else {
               this._nav.setMesage( 3 );
               this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
            }
         }, () => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
         } );
      } else {
         this.candidateProcessService.add( this.candidateProcess ).subscribe( res => {
            if ( res.idProcesoSeleccion ) {
               this._nav.setMesage( 1 );
               this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
            } else {
               this._nav.setMesage( 3 );
               this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
            }
         }, () => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
         } );
      }
   }

   onSubmitExam() {
      if ( this.medicalExam.idExamenMedico ) {
         let temp = this.listEstExaMed.find( c => c.idLista === this.medicalExam.idEstadoExamenMedico ).codigo;
         let tempCod = this.getIdStateExamByCode( temp );
         if ( temp === 'ENESPR' ) {
            if ( this.medicalExam.idAdjunto && this.medicalExam.idCuestionarioOpciones && this.medicalExam.indicadorVerificado ) {
               this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'RESPOND' );
            } else {
               this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'ENESPR' );
            }
         }
         if ( temp === 'RESPOND' ) {
            this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'CERRADO' );
         }
         this.medicalExamService.update( this.medicalExam ).subscribe( data => {
            this._nav.setMesage( 2 );
            this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
         }, error => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
         } );
      } else {
         this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'ENESPR' );
         this.medicalExam.idProcesoSeleccion = this.candidateProcess.idProcesoSeleccion;
         this.medicalExamService.add( this.medicalExam ).subscribe( data => {
            this.medicalExam = data;
            this._nav.setMesage( 1 );
            this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
         }, error => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
         } );
      }
   }

   getIdStateByCode( code: string ): number {
      let state: ListaItem = this.stepStates.find( s => s.codigo === code );
      if ( state !== undefined ) {
         return state.idLista;
      } else {
         return 0;
      }
   }

   getIdDesitionByCode( code: string ): number {
      let state: ListaItem = this.desitionList.find( s => s.codigo === code );
      if ( state !== undefined ) {
         return state.idLista;
      } else {
         return 0;
      }
   }

   getIdStateExamByCode( code: string ): number {
      let state: ListaItem = this.listEstExaMed.find( s => s.codigo === code );
      if ( state !== undefined ) {
         return state.idLista;
      } else {
         return 0;
      }
   }

   curriculum() {
      this.router.navigate( [ 'employees/curriculum/' + this.candidate.idTercero ] );
   }

   goBack( fDirty: boolean ) {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.router.navigate(
                                                    [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
                                              }
                                           } );
      } else {
         this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
      }

   }
}