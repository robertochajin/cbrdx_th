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
import { CandidateProcess } from '../_models/candidateProcess';
import { CandidateProcessService } from '../_services/candidate-process.service';
import { CentralRisk } from '../_models/centralRisk';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { JwtHelper } from 'angular2-jwt';
import { AdjuntosService } from '../_services/adjuntos.service';

@Component( {
               moduleId: module.id,
               selector: 'step-process',
               templateUrl: 'central-risk.component.html',
               providers: [ ConfirmationService ]
            } )
export class CentralRiskComponent implements OnInit {
   private publication: PersonnelRequirement = new PersonnelRequirement();
   private step: SelectionStep = new SelectionStep();
   private candidate: Employee = new Employee();
   public centrales: CentralRisk[] = [];
   public employeesCentrales: CentralRisk[] = [];
   public candidateProcess: CandidateProcess = new CandidateProcess();
   public url = '';
   public title = '';
   displayDialog: boolean = false;
   disabled: boolean = false;
   private stepStates: ListaItem[] = [];
   private desitionList: ListaItem[] = [];
   respuesta: any;
   cargando = 0;
   public indApproval: string;
   public approvalOptions: SelectItem[] = [];
   svcThUrl = '<%= SVC_TH_URL %>/api/tercerosCentralesRiesgos/file';
   fileThUrl = '<%= SVC_TH_URL %>/api/adjuntos/file';
   previewUrl = '<%= SVC_TH_URL %>/api/adjuntos/preview';
   public idCandidate: number;
   usuarioLogueado: any;
   idRol: number;
   jwtHelper: JwtHelper = new JwtHelper();
   svcThUrlAvatar = '<%= SVC_TH_URL %>/api/upload';
   private readonly = true;

   constructor( public publicationsService: PublicationsService,
      private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private listaService: ListaService,
      private employeesService: EmployeesService,
      private vacanciesService: VacanciesService,
      private candidateProcessService: CandidateProcessService,
      private confirmationService: ConfirmationService,
      private selectionStepService: SelectionStepService,
      private adjuntosService: AdjuntosService ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         this.candidateProcess.idResponsable = this.usuarioLogueado.usuario.idUsuario;
      }

      this.listaService.getMasterDetails( 'ListasDecisionesProcesoSeleccion' ).subscribe( res => {
         this.desitionList = res;
         this.approvalOptions.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.approvalOptions.push( { label: s.nombre, value: s.codigo } );
         } );
      } );

      this.route.params.subscribe( ( params: Params ) => {
         let idTercerosPublicaciones = +params[ 'idTerceroPublication' ];
         let idStep = +params[ 'idStep' ];
         this.candidateProcess.idProcesoPaso = idStep;
         this.candidateProcess.idTerceroPublicacion = idTercerosPublicaciones;
         this.selectionStepService.getTerceroPublicacio( idTercerosPublicaciones ).subscribe( tp => {

            this.idCandidate = tp.idTercero;
            let idPublicacion = tp.idPublicacion;
            employeesService.get( this.idCandidate ).subscribe( cndt => {
               this.candidate = cndt;
               this.candidate.nombreCompleto = this.candidate.primerNombre + ' ' +
                                               this.candidate.segundoNombre + ' ' +
                                               this.candidate.primerApellido + ' ' +
                                               this.candidate.segundoApellido;
               this.candidate.edad = moment().diff( this.candidate.fechaNacimiento, 'years', false ).toString();
            } );

            selectionStepService.getcentralRisk().subscribe( res => {
               this.centrales = res;
               selectionStepService.getEmployeesCentralRisk( this.idCandidate ).subscribe( res => {
                  res.map( emp => {
                     let _i = this.centrales.indexOf( this.centrales.find( m => m.idCentralRiesgo === emp.idCentralRiesgo ) );
                     this.centrales[ _i ].idTerceroCentralRiesgo = emp.idTerceroCentralRiesgo;
                     this.centrales[ _i ].idTercero = this.idCandidate;
                     this.centrales[ _i ].idAdjunto = emp.idAdjunto;
                     this.centrales[ _i ].indicadorReportado = emp.indicadorReportado;
                     this.centrales[ _i ].indicadorAprobado = emp.indicadorAprobado;
                  } );
               } );
            } );

            vacanciesService.getPublication( idPublicacion ).subscribe( pb => {
               this.publication = pb;

               this.listaService.getMasterDetailsByCode( 'ListasEstadosRequerimientos', 'CRRD' ).subscribe( reqState => {

                  this.listaService.getMasterDetails( 'ListasEstadosDiligenciados' ).subscribe( res => {
                     this.stepStates = res;
                     if ( params[ 'idProceso' ] !== undefined && params[ 'idProceso' ] !== 'null' && params[ 'idProceso' ] !== null && params[ 'idProceso' ] !== 0 ) {
                        this.candidateProcessService.get( params[ 'idProceso' ] ).subscribe( cp => {
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
   }

   ngOnInit() {
   }

   showDialogo( obj: CentralRisk ) {
      console.log(obj);
      this.adjuntosService.downloadFile( obj.idAdjunto ).subscribe( res => {
         let blob_url = URL.createObjectURL( res );

         this.url = blob_url;
         this.title = obj.nombre;
         this.displayDialog = true;
      } );
   }

   onBeforeSend( event: any, data: CentralRisk ) {
      this.cargando = data.idCentralRiesgo;
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      if ( data.idTercero === null || data.idTercero === undefined ) {
         data.idTercero = this.idCandidate;
         data.indicadorReportado = false;
         data.indicadorAprobado = false;
      }
      event.formData.append( 'obj', JSON.stringify( data ) );

   }

   onUpload( event: any, data: CentralRisk ) {
      this.cargando = 0;
      this.disabled = true;
      let respuesta = JSON.parse( event.xhr.response );
      data.idTerceroCentralRiesgo = respuesta.idTerceroCentralRiesgo;
      data.idAdjunto = respuesta.idAdjunto;

   }

   onSubmit() {
      if ( this.indApproval === 'APRB' ) {
         this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'APROB' );
         this.candidateProcess.idDesicionProcesoSeleccion = this.getIdDesitionByCode( 'APRB' );
      } else if ( this.indApproval === 'NOAPRB' ) {
         this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'RECH' );
         this.candidateProcess.idDesicionProcesoSeleccion = this.getIdDesitionByCode( 'NOAPRB' );
      } else if ( this.indApproval === 'NA' ) {
         this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'NA' );
         this.candidateProcess.idDesicionProcesoSeleccion = this.getIdDesitionByCode( 'NOAPL' );
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

   aprobar( f: CentralRisk ) {

      if ( f.idTerceroCentralRiesgo === null || f.idTerceroCentralRiesgo === undefined || f.idTerceroCentralRiesgo === 0 ) {
         this.selectionStepService.addEmployeesCentralRisk( f ).subscribe( res => {
            f.idTerceroCentralRiesgo = res.idTerceroCentralRiesgo;
            this._nav.setMesage( 1, null );
         } );
      } else {
         this.selectionStepService.updateEmployeesCentralRisk( f ).subscribe( res => {
            this._nav.setMesage( 2, null );
         } );
      }

   }

   reportar( f: CentralRisk ) {

      let msg = '';
      if ( f.indicadorReportado ) {
         msg = `¿Está seguro que desea Reportar el aspirante?`;
      } else {
         msg = `¿Está seguro que desea retirar el reporte?`;
      }
      this.confirmationService.confirm( {
                                           message: msg,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',

                                           accept: () => {
                                              this.selectionStepService.updateEmployeesCentralRisk( f ).subscribe( res => {
                                                 this._nav.setMesage( 2, null );
                                              } );
                                           },
                                           reject: () => {
                                              f.indicadorReportado = !f.indicadorReportado
                                           }
                                        } );

   }

   previewFile( f: CentralRisk ) {
      this.adjuntosService.downloadFile( f.idAdjunto ).subscribe( res => {
         let blob_url = URL.createObjectURL( res );

         this.url = blob_url;
         this.title = f.nombre;
         this.displayDialog = true;
      } );
   }

   downloadFile( f: CentralRisk ) {

      this.selectionStepService.downloadFile( f.idAdjunto ).subscribe( res => {
         window.location.assign( res );
      } );
   }

   deleteFile( f: CentralRisk ) {
      this.confirmationService.confirm( {
                                           message: `¿Está seguro que desea Inactivar el adjunto?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',

                                           accept: () => {
                                              f.idAdjunto = null;
                                              f.indicadorAprobado = false;
                                              f.indicadorReportado = false;
                                              this.disabled = true;
                                              this.selectionStepService.updateEmployeesCentralRisk( f ).subscribe( res => {
                                                 this._nav.setMesage( 2, null );
                                              } );
                                           }
                                        } );

   }

   curriculum() {
      this.router.navigate( [ 'employees/curriculum/' + this.candidate.idTercero ] );
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
