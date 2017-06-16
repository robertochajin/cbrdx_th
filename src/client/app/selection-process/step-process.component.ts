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
import { Location } from '@angular/common';

import { JwtHelper } from 'angular2-jwt';
import { RolesService } from '../_services/roles.service';

@Component( {
               moduleId: module.id,
               selector: 'step-process',
               templateUrl: 'step-process.component.html'
            } )
export class StepProcessComponent implements OnInit {
   private publication: PersonnelRequirement = new PersonnelRequirement();
   private step: SelectionStep = new SelectionStep();
   private candidate: Employee = new Employee();
   public indApproval: number;
   public approvalOptions: SelectItem[] = [];
   public candidateProcess: CandidateProcess = new CandidateProcess();
   private es: any;
   private minDate: Date = new Date();
   private stepStates: ListaItem[] = [];
   public responsables: SelectItem[] = [];
   private showCalendar = false;
   private showAttachments = false;
   private readonly = false;
   private readonlyEstado = false;
   private desitionList: ListaItem[] = [];

   usuarioLogueado: any;
   idRol: number;
   jwtHelper: JwtHelper = new JwtHelper();

   constructor( public publicationsService: PublicationsService,
      private route: ActivatedRoute,
      private _nav: NavService,
      private router: Router,
      private location: Location,
      private listaService: ListaService,
      private rolesService: RolesService,
      private employeesService: EmployeesService,
      private vacanciesService: VacanciesService,
      private candidateProcessService: CandidateProcessService,
      private selectionStepService: SelectionStepService ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
      }

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
      this.listaService.getMasterDetails( 'ListasDecisionesProcesoSeleccion' ).subscribe( res => {
         this.desitionList=res;
         this.approvalOptions.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.approvalOptions.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'idStep' ] !== undefined && params[ 'idTerceroPublication' ] !== undefined ) {
            this.candidateProcess.idProcesoPaso = params[ 'idStep' ];
            this.candidateProcess.idTerceroPublicacion = params[ 'idTerceroPublication' ];

            selectionStepService.get( params[ 'idStep' ] ).subscribe( step => {
               this.step = step;
               rolesService.listRoles().subscribe( rest => {
                  let temp = rest.find( r => r.idRol === this.step.idRol );
                  if ( temp ) {
                     selectionStepService.getUsuariosRol( temp.codigoRol ).subscribe( data => {
                        if ( data.length > 0 ) {
                           this.responsables.push( { label: 'Seleccione', value: null } );
                           this.responsables.push( { label: this.usuarioLogueado.nombre, value: this.usuarioLogueado.usuario.idUsuario } );
                           for ( let d of data ) {
                              this.responsables.push( { label: d.nombre, value: d.idUsuario } );
                           }
                        } else {
                           this.responsables.push( { label: this.usuarioLogueado.nombre, value: this.usuarioLogueado.usuario.idUsuario } );
                        }
                     } );
                  }
               } );
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

               this.listaService.getMasterDetails( 'ListasEstadosDiligenciados' ).subscribe( res => {
                  this.stepStates = res;
                  if ( params[ 'idProceso' ] !== undefined && params[ 'idProceso' ] !== 'null' && params[ 'idProceso' ] !== null && +params[ 'idProceso' ] !== 0 ) {
                     this.candidateProcess.idProcesoSeleccion = params[ 'idProceso' ];
                     this.candidateProcessService.get( this.candidateProcess.idProcesoSeleccion ).subscribe( cp => {
                        this.candidateProcess = cp;
                        this.prepareForm();
                     } );
                  } else {
                     this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'VAC' );
                     this.prepareForm();
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
   }

   prepareForm() {
      //Se verifica el estado del paso y la la necesidad de mostrar o nó la asignación de fecha
      if ( this.getIdStateByCode( 'VAC' ) === this.candidateProcess.idEstadoDiligenciado ) {
         this.showCalendar = this.step.indicadorCalendario;
         this.showAttachments=false;

      } else if ( this.getIdStateByCode( 'PROG' ) === this.candidateProcess.idEstadoDiligenciado ) {
         this.showAttachments = this.step.indicadorAdjunto;
         this.showCalendar = this.step.indicadorCalendario;
         // verificar si el usuario en sesion es responsable para mostrar solo lectura de datos
         if ( this.usuarioLogueado.usuario.idUsuario === this.candidateProcess.idResponsable ) {
            this.readonly = true;
         } else {
            this.readonly = false;
         }
      } else if ( this.getIdStateByCode( 'APROB' ) === this.candidateProcess.idEstadoDiligenciado ) {
         this.readonly = true;
         this.readonlyEstado = true;
         this.showAttachments = this.step.indicadorAdjunto;
      } else if ( this.getIdStateByCode( 'RECH' ) === this.candidateProcess.idEstadoDiligenciado ) {
         this.readonly = true;
         this.readonlyEstado = true;
         this.showAttachments = this.step.indicadorAdjunto;
      } else if (  this.getIdStateByCode( 'NA' ) === this.candidateProcess.idEstadoDiligenciado) {
         this.showCalendar = this.step.indicadorCalendario;
         this.showAttachments = this.step.indicadorAdjunto;
      }

   }

   onSubmit() {
      if ( this.candidateProcess.idDesicionProcesoSeleccion===this.getIdDesitionByCode('NOAPL') ) {
         this.candidateProcess.indicadorNoAplica = true;
         this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'NA' );
      } else if ( this.candidateProcess.idDesicionProcesoSeleccion===this.getIdDesitionByCode('APRB') ) {
         this.candidateProcess.indicadorContProceso = true;
         this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'APROB' );
      } else if ( this.candidateProcess.idDesicionProcesoSeleccion===this.getIdDesitionByCode('NOAPRB') ) {
         this.candidateProcess.indicadorContProceso = false;
         this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'RECH' );
      } else {
         this.candidateProcess.idEstadoDiligenciado = this.getIdStateByCode( 'PROG' );
      }
      if ( this.candidateProcess.idProcesoSeleccion !== undefined ) {
         this.candidateProcessService.update( this.candidateProcess ).subscribe( res => {
            if ( res.ok ) {
               this._nav.setMesage( 2 );
               this.router.navigate( [ 'candidates-list/'+ this.publication.idPublicacion ] );
            } else {
               this._nav.setMesage( 3 );
               this.router.navigate( [ 'candidates-list/'+ this.publication.idPublicacion ] );
            }
         }, () => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'candidates-list/'+ this.publication.idPublicacion ] );
         } );
      } else {
         this.candidateProcessService.add( this.candidateProcess ).subscribe( res => {
            if ( res.idProcesoSeleccion ) {
               this._nav.setMesage( 1 );
               this.router.navigate( [ 'candidates-list/'+ this.publication.idPublicacion ] );
            } else {
               this._nav.setMesage( 3 );
               this.router.navigate( [ 'candidates-list/'+ this.publication.idPublicacion ] );
            }
         }, () => {
            this._nav.setMesage( 3 );
            this.router.navigate( [ 'candidates-list/'+ this.publication.idPublicacion ] );
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

   curriculum() {
      this.router.navigate( [ 'employees/curriculum/' + this.candidate.idTercero ] );
   }
   getIdDesitionByCode( code: string ): number {
      let state: ListaItem = this.desitionList.find( s => s.codigo === code );
      if ( state !== undefined ) {
         return state.idLista;
      } else {
         return 0;
      }
   }

   goBack() {
      this.location.back();
   }
}