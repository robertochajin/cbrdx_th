import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import * as moment from 'moment/moment';
import { SelectItem, ConfirmationService } from 'primeng/components/common/api';
import { CandidateProcess } from '../_models/candidateProcess';
import { CandidateProcessService } from '../_services/candidate-process.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { JwtHelper } from 'angular2-jwt';
import { MedicalExam } from '../_models/medicalExam';
import { MedicalExamService } from '../_services/medical-exam.service';
import { OrganizationalStructureService } from '../_services/organizationalStructure.service';
import { AdjuntosService } from '../_services/adjuntos.service';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { QuestionnariesAnswers } from '../_models/questionnariesAnswers';
import { QuestionnariesQuestions } from '../_models/questionnariesQuestions';
import { ConstanteService } from '../_services/constante.service';

@Component( {
               moduleId: module.id,
               selector: 'answer-exam-occupational-period',
               templateUrl: 'answer-exam-occupational-period.component.html',
               providers: [ ConfirmationService ]
            } )
export class AnswerExamOccupationalPeriodComponent implements OnInit {

   private candidate: Employee = new Employee();
   public indApproval: string;
   public approvalOptions: SelectItem[] = [];
   public candidateProcess: CandidateProcess = new CandidateProcess();
   public opcionesPregunta: SelectItem[] = [];
   private es: any;
   svcThUrlAvatar = '<%= SVC_TH_URL %>/api/upload';

   usuarioLogueado: any;
   idRol: number;
   jwtHelper: JwtHelper = new JwtHelper();
   medicalExam: MedicalExam = new MedicalExam();
   listEstExaMed: ListaItem[];
   enesperarespuesta: boolean = true;
   sinprogramar: boolean = true;
   respondido: boolean = false;
   institucionMedica: boolean = true;
   consentimiennto: boolean = false;
   codigoVerificacion: string;
   cargo: string;
   estructuraFisica: string;
   area: string;
   dataUploadArchivo: string;
   codigoCuestionario: string;
   idCuestionario: number;
   options: QuestionnariesAnswers[] = [];
   questions: QuestionnariesQuestions[] = [];
   question: QuestionnariesQuestions = new QuestionnariesQuestions();

   constructor( private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private employeesService: EmployeesService,
      private adjuntosService: AdjuntosService,
      private constanteService: ConstanteService,
      private medicalExamService: MedicalExamService,
      private questionnairesService: QuestionnairesService,
      private organizationalStructureService: OrganizationalStructureService ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.candidateProcess.idResponsable = this.usuarioLogueado.usuario.idUsuario;
      }

      this.listaService.getMasterDetails( 'ListasEstadosExamenesMedicos' ).subscribe( res => {
         this.listEstExaMed = res;
      } );

      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'idExamen' ] !== undefined ) {
            // obtener examen medico
            this.medicalExamService.getById( params[ 'idExamen' ] ).subscribe( rs => {
               this.medicalExam = rs;
               if ( rs.idAdjunto ) {
                  this.getFileName();
               }
               if ( this.medicalExam.idMaestroRespuesta ) {
                  this.constanteService.getByCode( 'DIAGNO' ).subscribe( data => {
                     if ( data.valor ) {
                        this.codigoCuestionario = data.valor;
                        this.getCuestionariosByCode();
                     }
                  } );
               }
               if ( rs.indicadorVerificado ) {
                  this.consentimiennto = true;
               } else {
                  this.consentimiennto = false;
               }
               this.employeesService.get( rs.idTercero ).subscribe( cndt => {
                  this.candidate = cndt;
                  this.candidate.nombreCompleto = this.candidate.primerNombre + ' ' +
                                                  this.candidate.segundoNombre + ' ' +
                                                  this.candidate.primerApellido + ' ' +
                                                  this.candidate.segundoApellido;
                  this.candidate.edad = moment().diff( this.candidate.fechaNacimiento, 'years', false ).toString();
               } );
               this.employeesService.getEmployeePositionByIdEmployee( rs.idTercero ).subscribe( rs => {
                  this.cargo = rs.cargo;
                  this.organizationalStructureService.viewOrganizationalStructure( rs.idEstructuraOrganizacional ).subscribe( res => {
                     this.estructuraFisica = res.estructuraFisica;
                     this.area = res.nombre;
                  } );
               } );
            } );
         } else {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'dashboard' ] );
         }
      } );

   }

   ngOnInit() {
   }

   onSubmitCon() {
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
            this._nav.setMesage( 2 );
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

   goBack( fDirty: boolean ) {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.router.navigate( [ 'dashboard' ] );
                                                 ;
                                              }
                                           } );
      } else {
         this.router.navigate( [ 'dashboard' ] );
      }

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
   getCuestionariosByCode() {
      this.questionnairesService.getByCode( this.codigoCuestionario ).subscribe( quest => {
         this.idCuestionario = quest.idCuestionario;
         this.getQuestions();
      } );
   }

   getQuestions() {
      this.questionnairesService.getQuestions( this.idCuestionario ).subscribe(
         res => {
            this.questions = res;
            this.sortQuestions();
            this.question = this.questions[ 0 ];
            this.getAnswers();
         } );
   }

   getAnswers() {
      this.questionnairesService.getAnswers( this.question.idCuestionarioPregunta ).subscribe(
         res => {
            this.options = res;
            this.sortAnswers();
            this.options.map( s => {
               this.opcionesPregunta.push( { label: s.opcion, value: s.idPreguntaOpcion } )
            } );

         } );
   }

   private sortQuestions() {
      this.questions.sort( function ( a, b ) {
         if ( a.secuencia < b.secuencia )
            return -1;
         else
            return 1;
      } )
   }

   private sortAnswers() {
      this.options.sort( function ( a, b ) {
         if ( a.orden < b.orden )
            return -1;
         else
            return 1;
      } )
   }
   curriculum() {
      this.router.navigate( [ 'employees/curriculum/' + this.candidate.idTercero ] );
   }
}