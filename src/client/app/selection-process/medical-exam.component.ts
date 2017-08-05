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
import { MasterAnswersService } from '../_services/masterAnswers.service';
import { MasterAnswers } from '../_models/masterAnswers';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { ConstanteService } from '../_services/constante.service';
import { QuestionnariesQuestions } from '../_models/questionnariesQuestions';
import { QuestionnariesAnswers } from '../_models/questionnariesAnswers';

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
   public opcionesPregunta: SelectItem[] = [];
   private showCalendar = false;
   private readonly = false;
   svcThUrlAvatar = '<%= SVC_TH_URL %>/api/upload';

   usuarioLogueado: any;
   idRol: number;
   jwtHelper: JwtHelper = new JwtHelper();
   medicalExam: MedicalExam = new MedicalExam();
   fechaProgramada: Date;
   references: References[];
   minDateEx: Date = new Date();
   rangeFin: string;
   medicalInstitutions: SelectItem[] = [];
   listEstExaMed: ListaItem[];
   enesperarespuesta: boolean = true;
   respondido: boolean = false;
   cerrado: boolean = false;
   institucionMedica: boolean = true;
   consentimiennto: boolean = false;
   noaplicaexamen: boolean = true;
   codigoCuestionario: string;
   idCuestionario: number;
   options: QuestionnariesAnswers[] = [];
   questions: QuestionnariesQuestions[] = [];
   question: QuestionnariesQuestions = new QuestionnariesQuestions();

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
      private questionnairesService: QuestionnairesService,
      private constanteService: ConstanteService,
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
            this.medicalExamService.commpareRisk( this.candidateProcess.idTerceroPublicacion ).subscribe( data => {
               this.noaplicaexamen = data;
            } );
            selectionStepService.get( params[ 'idStep' ] ).subscribe( step => {
               this.step = step;

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

                     this.listaService.getMasterDetailsByCode( 'ListasEstadosRequerimientos', 'CRRD' ).subscribe( reqState => {
                        this.listaService.getMasterDetails( 'ListasEstadosDiligenciados' ).subscribe( res => {
                           this.stepStates = res;
                           if ( params[ 'idProceso' ] !== undefined && params[ 'idProceso' ] !== null && +params[ 'idProceso' ] !== 0 ) {
                              this.candidateProcess.idProcesoSeleccion = params[ 'idProceso' ];
                              this.candidateProcessService.get( this.candidateProcess.idProcesoSeleccion ).subscribe( cp => {
                                 this.candidateProcess = cp;
                                 if ( this.getIdStateByCode( 'APROB' ) === this.candidateProcess.idEstadoDiligenciado ||
                                      this.getIdStateByCode( 'RECH' ) === this.candidateProcess.idEstadoDiligenciado ||
                                      reqState.idLista === this.publication.idEstado ) {
                                    this.readonly = true;
                                 } else {
                                    this.readonly = false;
                                 }
                                 // obtener examen medico
                                 this.medicalExamService.getByIdProceso( this.candidateProcess.idProcesoSeleccion ).subscribe( rs => {
                                    if ( rs ) {
                                       this.medicalExam = rs;
                                       this.fechaProgramada = new Date( this.medicalExam.fechaProgramada );
                                       if ( this.listEstExaMed.find(
                                             x => x.idLista === this.medicalExam.idEstadoExamenMedico ).codigo === 'RESPOND' ) {
                                          this.respondido = true;
                                          this.enesperarespuesta = false;
                                       }
                                       if ( !this.medicalExam.idMaestroRespuesta ) {
                                          this.constanteService.getByCode( 'DIAGNO' ).subscribe( data => {
                                             if ( data.valor ) {
                                                this.codigoCuestionario = data.valor;
                                                this.getCuestionariosByCode();
                                             }
                                          } );
                                       }
                                       if ( this.medicalExam.idMaestroRespuesta ) {
                                          this.masterAnswersService.get( this.medicalExam.idMaestroRespuesta ).subscribe( res => {
                                             this.masterAnswer = res;
                                             this.showQuestionnaire = true;
                                          } );
                                       }
                                       if ( this.listEstExaMed.find(
                                             x => x.idLista === this.medicalExam.idEstadoExamenMedico ).codigo === 'ENESPR' ) {
                                          this.enesperarespuesta = true;
                                       }
                                       if ( this.listEstExaMed.find(
                                             x => x.idLista === this.medicalExam.idEstadoExamenMedico ).codigo === 'CERRADO' ) {
                                          this.cerrado = true;
                                          this.enesperarespuesta = false;
                                          this.respondido = false;
                                       }
                                       this.fechaProgramada = new Date( this.medicalExam.fechaProgramada );
                                    } else {
                                       this.medicalExam = new MedicalExam();
                                    }

                                 } );
                              } );
                           } else {
                              if ( reqState.idLista === this.publication.idEstado ) {
                                 this.readonly = true;
                              } else {
                                 this.readonly = false;
                                 if ( !this.noaplicaexamen ) {
                                    this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'PROG' );
                                    this.candidateProcessService.add( this.candidateProcess ).subscribe( process => {
                                       this.candidateProcess = process;
                                       this.medicalExam.idProcesoSeleccion = this.candidateProcess.idProcesoSeleccion;
                                    } );
                                 }
                              }
                           }
                        } );
                     } );

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
         this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'CERRADO' );
         if ( !this.medicalExam.idMedicoResponsable ) {
            this.medicalExam.idCuestionarioOpciones
         }
         this.medicalExamService.update( this.medicalExam ).subscribe( data => {
            this.medicalExam = this.medicalExam;
         } );
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
      this.medicalExam.fechaProgramada = this.fechaProgramada.toISOString().replace('Z', '-0500');
      this.medicalExam.idProcesoSeleccion = this.candidateProcess.idProcesoSeleccion;
      this.medicalExam.idTercero = this.candidate.idTercero;
      if ( this.medicalExam.idExamenMedico ) {
         let temp = this.listEstExaMed.find( c => c.idLista === this.medicalExam.idEstadoExamenMedico ).codigo;
         if ( temp === 'RESPOND' ) {
            this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'CERRADO' );
         }
         if ( temp === 'ENESPR' ) {
            if ( this.medicalExam.idAdjunto && this.medicalExam.idMaestroRespuesta && this.medicalExam.indicadorVerificado ) {
               this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'RESPOND' );
            } else {
               this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'ENESPR' );
            }
         }
         this.medicalExamService.update( this.medicalExam ).subscribe( data => {
            this._nav.setMesage( 2 );
            this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
         }, error => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
         } );
      } else {
         if ( !this.institucionMedica ) {
            this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'RESPOND' );
         } else {
            this.medicalExam.idEstadoExamenMedico = this.getIdStateExamByCode( 'ENESPR' );
         }
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

   prepareForm( isRequirementClosed: boolean ) {

      if ( isRequirementClosed ) {
         this.readonly = true;
      } else {
         //Se verifica el estado del paso y la la necesidad de mostrar o nó la asignación de fecha
         if ( this.getIdStateByCode( 'VAC' ) === this.candidateProcess.idEstadoDiligenciado ) {
            this.showCalendar = this.step.indicadorCalendario;

         } else if ( this.getIdStateByCode( 'PROG' ) === this.candidateProcess.idEstadoDiligenciado ) {
            this.showCalendar = this.step.indicadorCalendario;
            // verificar si el usuario en sesion es responsable para mostrar solo lectura de datos
            if ( this.usuarioLogueado.usuario.idUsuario === this.candidateProcess.idResponsable ) {
               this.readonly = true;
            } else {
               this.readonly = false;
            }
         } else if ( this.getIdStateByCode( 'APROB' ) === this.candidateProcess.idEstadoDiligenciado ) {
            this.readonly = true;
         } else if ( this.getIdStateByCode( 'RECH' ) === this.candidateProcess.idEstadoDiligenciado ) {
            this.readonly = true;
         } else if ( this.getIdStateByCode( 'NA' ) === this.candidateProcess.idEstadoDiligenciado ) {
            this.showCalendar = this.step.indicadorCalendario;
         }
      }

   }
}