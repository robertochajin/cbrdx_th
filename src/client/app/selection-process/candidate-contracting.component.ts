import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
import { VacancyTest } from '../_models/vacancyTest';
import { VacancyTestServices } from '../_services/vacancyTest.service';
import { AdjuntosService } from '../_services/adjuntos.service';
import { ConstanteService } from '../_services/constante.service';
import { TerceroPublicaciones } from '../_models/terceroPublicaciones';

@Component( {
               moduleId: module.id,
               selector: 'candidate-contracting',
               templateUrl: 'candidate-contracting.component.html',
               providers: [ ConfirmationService ]
            } )
export class CandidateContractingComponent implements OnInit {
   private publication: PersonnelRequirement = new PersonnelRequirement();
   private step: SelectionStep = new SelectionStep();
   private candidate: Employee = new Employee();
   public indApproval: string;
   public listQuest: SelectItem[] = [];
   guardandoResoursesQues = false;
   questId: number;
   public definingTest = false;
   public approvalOptions: SelectItem[] = [];
   public candidateProcess: CandidateProcess = new CandidateProcess();
   private es: any;
   private minDate: Date = new Date();
   private stepStates: ListaItem[] = [];
   private desitionList: ListaItem[] = [];
   private readonly = true;
   svcThUrlAvatar = '<%= SVC_TH_URL %>/api/upload';

   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   dataUploadArchivo: any = '';
   dataUploadUsuario: any = '';
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';
   idRol: number;
   immediately = false;
   private thirdPublication: TerceroPublicaciones = new TerceroPublicaciones();

   constructor( public publicationsService: PublicationsService,
      private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private location: Location,
      private adjuntosService: AdjuntosService,
      private vacancyTestServices: VacancyTestServices,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private rolesService: RolesService,
      private constanteService: ConstanteService,
      private employeesService: EmployeesService,
      private vacanciesService: VacanciesService,
      private candidateProcessService: CandidateProcessService,
      private selectionStepService: SelectionStepService ) {

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

      this.listaService.getMasterDetails( 'ListasDecisionesProcesoSeleccion' ).subscribe( res => {
         this.desitionList = res;
         this.approvalOptions.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            if ( s.codigo !== 'NOAPL' ) {
               this.approvalOptions.push( { label: s.nombre, value: s.codigo } );
            }
         } );
      } );

      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'idStep' ] !== undefined && params[ 'idTerceroPublication' ] !== undefined ) {
            this.candidateProcess.idProcesoPaso = params[ 'idStep' ];
            this.candidateProcess.idTerceroPublicacion = params[ 'idTerceroPublication' ];

            selectionStepService.get( params[ 'idStep' ] ).subscribe( step => {
               this.step = step;

               selectionStepService.getTerceroPublicacio( params[ 'idTerceroPublication' ] ).subscribe( res => {
                  this.thirdPublication = res;
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
                              } );

                           } else {
                              if ( reqState.idLista === this.publication.idEstado ) {
                                 this.readonly = true;
                              } else {
                                 this.readonly = false;
                                 this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'VAC' );
                              }
                           }
                        } );
                     } );

                  } );
               } );

            } );

         } else {
            this._nav.setMesage( 3 );
            this.location.back();
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
   }

   onSubmit() {
      if ( this.thirdPublication.indicadorContratacion !== undefined && this.thirdPublication.indicadorContratacion !== null ) {
         if ( this.thirdPublication.indicadorContratacion ) {
            this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'APROB' );
            this.candidateProcess.idDesicionProcesoSeleccion = this.getIdDesitionByCode( 'APRB' );
         } else if ( !this.thirdPublication.indicadorContratacion ) {
            this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'RECH' );
            this.candidateProcess.idDesicionProcesoSeleccion = this.getIdDesitionByCode( 'NOAPRB' );
         }

         if ( this.candidateProcess.idProcesoSeleccion !== undefined ) {
            this.candidateProcessService.update( this.candidateProcess ).subscribe( res => {
               if ( res.ok ) {
                  this.selectionStepService.updateThirdPublication( this.thirdPublication ).subscribe( tp => {
                     this._nav.setMesage( 2 );
                     this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
                  } );
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
                  this.selectionStepService.updateThirdPublication( this.thirdPublication ).subscribe( tp => {
                     this._nav.setMesage( 1 );
                     this.router.navigate( [ 'selection-process/candidates-list/' + this.publication.idPublicacion ] );
                  } );
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

   setImmediateDate() {
      if ( this.immediately ) {
         this.thirdPublication.fechaContratacion = new Date();
      } else {
         this.thirdPublication.fechaContratacion = null;
      }
   }

}
