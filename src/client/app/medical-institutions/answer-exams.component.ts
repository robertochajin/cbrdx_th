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
import { References } from '../_models/references';
import { ReferencesService } from '../_services/references.service';
import { MedicalExam } from '../_models/medicalExam';
import { MedicalInstitutionService } from '../_services/medical-institutions.service';
import { MedicalInstitution } from '../_models/medical-institutions';
import { MedicalExamService } from '../_services/medical-exam.service';
import { ConstanteService } from '../_services/constante.service';
import { AdjuntosService } from '../_services/adjuntos.service';
import { DocumentManagementService } from '../_services/document-managgement.service';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { MasterAnswersService } from '../_services/masterAnswers.service';
import { MasterAnswers } from '../_models/masterAnswers';

@Component( {
               moduleId: module.id,
               selector: 'answer-exams',
               templateUrl: 'answer-exams.component.html',
               providers: [ ConfirmationService ]
            } )
export class AnswerExamsComponent implements OnInit {

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

   idRol: number;
   medicalExam: MedicalExam = new MedicalExam();
   listEstExaMed: ListaItem[];
   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   dataUploadArchivo: any = '';
   dataUploadUsuario: any = '';
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';
   idCertificado: number;
   certificado: any = '';
   codigoCuestionario: string;
   showFinish: boolean = false;
   maestroRespuestas: MasterAnswers = new MasterAnswers();
   respuestaOk: boolean = false;

   constructor( public publicationsService: PublicationsService,
      private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private rolesService: RolesService,
      private constanteService: ConstanteService,
      private adjuntosService: AdjuntosService,
      private employeesService: EmployeesService,
      private vacanciesService: VacanciesService,
      private candidateProcessService: CandidateProcessService,
      private medicalExamService: MedicalExamService,
      private documentManagementService: DocumentManagementService,
      private selectionStepService: SelectionStepService,
      private questionnairesService: QuestionnairesService,
      private masterAnswersService: MasterAnswersService ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.candidateProcess.idResponsable = this.usuarioLogueado.usuario.idUsuario;
      }
      this.constanteService.getByCode( 'FTYPE' ).subscribe( data => {
         if ( data.valor ) {
            this.ftype = data.valor;
         }
      } );
      this.constanteService.getByCode( 'FSIZE' ).subscribe( data => {
         if ( data.valor ) {
            this.fsize = Number( data.valor );
         }
      } );
      this.constanteService.getByCode( 'DIAGNO' ).subscribe( data => {
         if ( data.valor ) {
            this.codigoCuestionario = data.valor;
         }
      } );

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
                  this.candidate.edad = moment().diff( this.candidate.fechaNacimiento, 'years', false ).toString();
               } );
               vacanciesService.getPublication( res.idPublicacion ).subscribe( pb => {
                  this.publication = pb;
               } );
            } );
            // obtener examen medico
            this.medicalExamService.getById( params[ 'idExamen' ] ).subscribe( rs => {
               this.medicalExam = rs;
               if ( this.medicalExam.idMaestroRespuesta ) {
                  this.getMaestroCuestionariosById();
               } else {
                  this.getMaestroCuestionariosByCode();
               }
               if ( this.medicalExam.idAdjunto ) {
                  this.getFileName();
               }
            } );
         } else {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process' ] );
         }
      } );

   }

   ngOnInit() {
      this.documentManagementService.getAll().subscribe( data => {
         this.idCertificado = data.find( d => d.codigoInstitucional === 'GTHFO04' ).idAdjunto;
         if ( this.idCertificado ) {
            this.adjuntosService.getFileName( this.idCertificado ).subscribe( res => {
               this.certificado = res.nombreArchivo;
            } );
         }
      } );
   }

   onSubmitAnsw() {
      if ( this.medicalExam.idExamenMedico ) {
         let temp = this.listEstExaMed.find( c => c.idLista === this.medicalExam.idEstadoExamenMedico ).codigo;
         if ( temp === 'ENESPR' ) {
            if ( this.medicalExam.idAdjunto || this.medicalExam.idMaestroRespuesta ) {
               this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'RESPOND' );
            } else {
               this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'ENESPR' );
            }
         }
         this.medicalExam.idMedicoResponsable = this.usuarioLogueado.usuario.idUsuario;
         this.medicalExamService.update( this.medicalExam ).subscribe( data => {
            this._nav.setMesage( 0, { severity: 'success', summary: 'Exito', detail: 'Gracias por su diagnsotico.' } );
            localStorage.removeItem( 'token' );
            this.router.navigate( [ '/login' ] );
         }, error => {
            this._nav.setMesage( 3 );
         } );
      } else {
         this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'ENESPR' );
         this.medicalExam.idProcesoSeleccion = this.candidateProcess.idProcesoSeleccion;
         this.medicalExamService.add( this.medicalExam ).subscribe( data => {
            this.medicalExam = data;
            this._nav.setMesage( 0, { severity: 'success', summary: 'Exito', detail: 'Gracias por su diagnsotico.' } );
            localStorage.removeItem( 'token' );
            this.router.navigate( [ '/login' ] );
         }, error => {
            this._nav.setMesage( 3 );
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

   uploadingOk( event: any ) {
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         this.medicalExam.idAdjunto = respuesta.idAdjunto;
      }
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '" + this.dataUploadArchivo + "', 'ruta':" +
                " '/Gestionamos/Terceros/" + this.candidate.tipoDocumento + "_" + this.candidate.numeroDocumento + "/Examenes Medicos'  }";
      event.formData.append( 'obj', obj.toString() );
   }

   onSelect( event: any, file: any ) {
      this.dataUploadArchivo = file[ 0 ].name;
      this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;
   }

   uploadAgain( rta: boolean ) {
      this.medicalExam.idAdjunto = null;
   }

   downloadFile( id: number ) {
      this.adjuntosService.downloadFile( id ).subscribe( res => {
         this.adjuntosService.getFileName( id ).subscribe( adj => {
            saveAs( res, adj.nombreArchivo );
         } );
      } );
   }

   getFileName() {
      if ( this.medicalExam.idAdjunto ) {
         this.adjuntosService.getFileName( this.medicalExam.idAdjunto ).subscribe( res => {
            this.dataUploadArchivo = res.nombreArchivo;
         } );
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

   getMaestroCuestionariosById() {
      this.masterAnswersService.get( this.medicalExam.idMaestroRespuesta ).subscribe( res => {
         this.maestroRespuestas = res;
         this.showFinish = false;
      } );
   }

   getMaestroCuestionariosByCode() {
      this.questionnairesService.getByCode( this.codigoCuestionario ).subscribe( quest => {
         this.maestroRespuestas.idCuestionario = quest.idCuestionario;
         this.masterAnswersService.add( this.maestroRespuestas ).subscribe( res => {
            this.maestroRespuestas = res;
            this.showFinish = false;
            this.medicalExam.idMaestroRespuesta = this.maestroRespuestas.idMaestroRespuesta;
            this.medicalExamService.update( this.medicalExam ).subscribe();
         } );
      } );
   }

   finishQuestionnaire() {
      this.showFinish = true;
   }
}
