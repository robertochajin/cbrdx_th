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

@Component( {
               moduleId: module.id,
               selector: 'candidate-test',
               templateUrl: 'candidate-test.component.html',
               providers: [ ConfirmationService ]
            } )
export class CandidateTestComponent implements OnInit {
   private publication: PersonnelRequirement = new PersonnelRequirement();
   private step: SelectionStep = new SelectionStep();
   private candidate: Employee = new Employee();
   public indApproval: string;
   public listQuest: SelectItem[] = [];
   public testStates: SelectItem[] = [];
   guardandoResoursesQues = false;
   questId: number;
   private vacancyTest: VacancyTest;
   private vacancyTests: VacancyTest[] = [];
   public definingTest = false;
   public approvalOptions: SelectItem[] = [];
   public candidateProcess: CandidateProcess = new CandidateProcess();
   private es: any;
   private minDate: Date = new Date();
   private stepStates: ListaItem[] = [];
   private desitionList: ListaItem[] = [];
   public responsables: SelectItem[] = [];
   private showCalendar = false;
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
   private testToDefine: VacancyTest;
   private allTestDefined = false;

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
                                 this.vacancyTestServices.getAllEnabledBySelectionProcess( this.candidateProcess.idProcesoSeleccion )
                                 .subscribe( testList => {
                                    this.vacancyTests = testList;
                                    this.listTest();
                                 } );
                              } );
                           } else {
                              // en el caso de no tener un idProcesoSeleccion es necesario crear una primera instancia del mismo para poder
                              // agregar las pruebas técnicas

                              if ( reqState.idLista === this.publication.idEstado ) {
                                 this.readonly = true;
                              } else {
                                 this.readonly = false;
                                 this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'VAC' );
                                 this.candidateProcessService.add( this.candidateProcess ).subscribe( process => {
                                    this.candidateProcess = process;
                                    this.vacancyTestServices.initializeTestList( this.candidateProcess.idProcesoSeleccion,
                                                                                 this.candidateProcess.idTerceroPublicacion )
                                    .subscribe( testList => {
                                       this.vacancyTests = testList;
                                       this.listTest();
                                    } );
                                 } );
                              }
                           }
                           this.testStates.push( { label: 'Seleccione', value: null } );
                           this.testStates.push( { label: 'Realiza prueba completa', value: true } );
                           this.testStates.push( { label: 'No realiza prueba', value: false } );
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
   }

   onSubmit() {
      if ( this.areAllTestDefined() ) {
         this.allTestDefined = true;
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
      } else {
         this.allTestDefined = false;
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

   listTest() {
      this.listaService.getMasterDetails( 'ListasPruebasTecnicas' ).subscribe( rest => {
         this.listQuest.push( { label: 'Seleccione', value: null } );
         rest.map( ( s: ListaItem ) => {
            if ( this.vacancyTests.find( t => t.idPruebaTecnica === s.idLista ) === undefined ) {
               this.listQuest.push( { label: s.nombre, value: s.idLista } );
            }
         } );
      } );
   }

   addTest() {

      this.guardandoResoursesQues = true;
      this.vacancyTest = new VacancyTest();
      this.vacancyTest.idProcesoSeleccion = this.candidateProcess.idProcesoSeleccion;
      this.vacancyTest.idPruebaTecnica = this.questId;
      this.vacancyTest.indicadorHabilitado = true;

      this.vacancyTestServices.add( this.vacancyTest ).subscribe( res => {
         if ( res ) {
            let tecniqueTest = this.listQuest.find( pt => pt.value === res.idPruebaTecnica );
            res.pruebaTecnica = tecniqueTest.label;
            this.listQuest.splice( this.listQuest.indexOf( tecniqueTest ), 1 );
            this.vacancyTests.push( res );
            this.questId = null;
            this.guardandoResoursesQues = false;
         }
      }, error => {
         this._nav.setMesage( 3 );
      } );

   }

   definegTest( test: VacancyTest ) {
      if ( test ) {
         this.definingTest = true;
         this.testToDefine = new VacancyTest();
         this.testToDefine = Object.assign( {}, test );
         this.getFileName();
      }
   }

   updateTest() {
      this.vacancyTestServices.update( this.testToDefine ).subscribe( res => {
         this._nav.setMesage( 2 );
         let oldItem = this.vacancyTests.find(
            t => t.idProcesoSeleccionPruebaTecnica === this.testToDefine.idProcesoSeleccionPruebaTecnica );
         this.vacancyTests[ this.vacancyTests.indexOf( oldItem ) ] = this.testToDefine;
         this.definingTest = false;
      }, error => {
         this._nav.setMesage( 3 );
      } );
   }

   cancelDefiningTest( dirty: boolean ) {
      if ( dirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.definingTest = false;
                                              }
                                           } );
      } else {
         this.definingTest = false;
      }
   }

   uploadingOk( event: any ) {
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         this.testToDefine.idAdjunto = respuesta.idAdjunto;
      }
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '" + this.dataUploadArchivo + "', 'ruta':" +
                " '/Gestionamos/Terceros/" + this.candidate.tipoDocumento + "_" + this.candidate.numeroDocumento + "/Pruebas Técnicas' }";
      event.formData.append( 'obj', obj.toString() );
   }

   onSelect( event: any, file: any ) {
      this.dataUploadArchivo = file[ 0 ].name;
      this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;
   }

   uploadAgain( rta: boolean ) {
      this.testToDefine.idAdjunto = null;
   }

   downloadFile( id: number ) {
      this.adjuntosService.downloadFile( id ).subscribe( ( res: any ) => {
         window.location.assign( res );
      } );
   }

   getFileName() {
      if ( this.testToDefine.idAdjunto ) {
         this.adjuntosService.getFileName( this.testToDefine.idAdjunto ).subscribe( ( res: any ) => {
            this.dataUploadArchivo = res.nombreArchivo;
         } );
      }
   }

   private areAllTestDefined(): boolean {
      let allDefined = true;
      if ( this.indApproval != null ) {
         this.vacancyTests.map( t => {
            if ( t.indicadorRealiza === null ) {
               allDefined = false;
            }
         } );
      }
      return allDefined;
   }
}
