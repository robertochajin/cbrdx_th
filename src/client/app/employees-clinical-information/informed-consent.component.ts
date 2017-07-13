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

@Component( {
               moduleId: module.id,
               selector: 'medical-exam-consent',
               templateUrl: 'informed-consent.component.html',
               providers: [ ConfirmationService ]
            } )
export class MedicalExamInformedConsentComponent implements OnInit {

   private publication: PersonnelRequirement = new PersonnelRequirement();
   private step: SelectionStep = new SelectionStep();
   private candidate: Employee = new Employee();
   public indApproval: string;
   public approvalOptions: SelectItem[] = [];
   public candidateProcess: CandidateProcess = new CandidateProcess();
   private es: any;
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
   minDateEx: Date = null;
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

      this.listaService.getMasterDetails( 'ListasEstadosExamenesMedicos' ).subscribe( res => {
         this.listEstExaMed = res;
      } );

      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'idTerceroPublication' ] !== undefined && params[ 'idExamen' ] !== undefined ) {
            this.candidateProcess.idTerceroPublicacion = params[ 'idTerceroPublication' ];
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
               } );
            } );
            // obtener examen medico
            this.medicalExamService.getByIdProceso( params[ 'idExamen' ] ).subscribe( rs => {
               this.medicalExam = rs;
            } );
         } else {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process' ] );
         }
      } );

   }

   ngOnInit() {
   }

   onSubmitExam() {
      if ( this.medicalExam.idExamenMedico ) {
         let temp = this.listEstExaMed.find( c => c.idLista === this.medicalExam.idEstadoExamenMedico ).codigo;
         let tempCod = this.getIdStateExamByCode( temp );
         if ( temp === 'ENESPR' ) {
            if ( this.medicalExam.idAdjunto && this.medicalExam.idMaestroRespuesta && this.medicalExam.indicadorVerificado ) {
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

   getIdStateExamByCode( code: string ): number {
      let state: ListaItem = this.listEstExaMed.find( s => s.codigo === code );
      if ( state !== undefined ) {
         return state.idLista;
      } else {
         return 0;
      }
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