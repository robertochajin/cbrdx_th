import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeeEventuality } from '../_models/employeeEventuality';
import { EventualityServices } from '../_services/eventuality.service';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { EmployeeEventualitiesAttachmentService } from '../_services/employees-eventualities-attachment.service';
import { EmployeeEventualityAttachment } from '../_models/employeeEventualityAttachment';
import { AdjuntosService } from '../_services/adjuntos.service';
import { EmployeeEventualitiesActivitiesService } from '../_services/employee-eventualities-activities.service';
import { EmployeeEventualityActivity } from '../_models/employeeEventualitiesActivities';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { ConfirmationService, Message, SelectItem } from 'primeng/primeng';
import { Location } from '@angular/common';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import * as moment from 'moment/moment';
import { ListaItem } from '../_models/listaItem';

@Component( {
               moduleId: module.id,
               templateUrl: 'transact-eventualities.component.html',
               selector: 'transact-eventuality'
            } )
export class EmployeeEventualityTransactComponent {
   @Input()
   employeeEventuality: EmployeeEventuality = new EmployeeEventuality();
   // indicadores para mostrar campos en formulario
   showhorainicio: boolean = false;
   showfechainicio: boolean = false;
   showhorafinal: boolean = false;
   showfechafinal: boolean = false;
   showdescripcion: boolean = false;
   showdiagnostico: boolean = false;
   showreemplazado: boolean = false;
   showhorareintegro: boolean = false;
   showfechareintegro: boolean = false;
   showdias: boolean = false;
   showvalor: boolean = false;
   showcuotas: boolean = false;
   showreferencia: boolean = false;
   showentidad: boolean = false;
   showperiodoinicial: boolean = false;
   showperiodofinal: boolean = false;
   showretiro: boolean = false;
   showeps: boolean = false;
   showfp: boolean = false;
   showccf: boolean = false;

   // indicador de campo requerido
   requiredhorainicio: boolean = false;
   requiredfechainicio: boolean = false;
   requiredhorafinal: boolean = false;
   requiredfechafinal: boolean = false;
   requireddescripcion: boolean = false;
   requireddiagnostico: boolean = false;
   requiredreemplazado: boolean = false;
   requiredhorareintegro: boolean = false;
   requiredfechareintegro: boolean = false;
   requireddias: boolean = false;
   requiredvalor: boolean = false;
   requiredcuotas: boolean = false;
   requiredreferencia: boolean = false;
   requiredentidad: boolean = false;
   requiredperiodoinicial: boolean = false;
   requiredperiodofinal: boolean = false;
   requiredretiro: boolean = false;
   requiredeps: boolean = false;
   requiredfp: boolean = false;
   requiredccf: boolean = false;

   listField: any[] = [];
   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();

   employeeEventualityActivity: EmployeeEventualityActivity = new EmployeeEventualityActivity();
   listAttachment: EmployeeEventualityAttachment[] = [];
   listActivities: EmployeeEventualityActivity[] = [];
   acordion: number = 0;
   busqueda: string = '';
   saveActivity: boolean = false;
   listEstados: SelectItem[] = [];
   listEstadosTemp: ListaItem[] = [];
   msgs: Message[];
   employee: Employee = new Employee();
   indicadorJefeAutoriza: boolean = false;

   constructor( private eventualityServices: EventualityServices,
      private employeeNoveltyService: EmployeeEventualitiesService,
      private employeeEventualitiesAttachmentService: EmployeeEventualitiesAttachmentService,
      private employeeEventualitiesActivitiesService: EmployeeEventualitiesActivitiesService,
      private router: Router,
      private listaService: ListaService,
      private employeeService: EmployeesService,
      private _nav: NavService,
      private location: Location,
      private adjuntosService: AdjuntosService,
      private confirmationService: ConfirmationService,
      private route: ActivatedRoute ) {
      this.busqueda = _nav.getSearch( 'transact-eventuality' );
   }

   ngOnInit() {
      this.listaService.getMasterDetails( 'ListasEstadosNovedades' ).subscribe( res => {
         this.listEstadosTemp = res;
         this.listEstados.push( { label: 'Seleccione', value: null } );
         res.map( ( s: any ) => {
            if ( s.codigo !== 'ENCONSTRUC' ) {
               this.listEstados.push( { label: s.nombre, value: s.idLista } );
            }
         } );
      } );
      this.route.params.subscribe( ( params: Params ) => {
         let tempIdTerceroNovedad = Number( +params[ 'idTerceroNovedad' ] );
         if ( tempIdTerceroNovedad ) {
            this.employeeNoveltyService.getById( tempIdTerceroNovedad ).subscribe( rs => {
               this.employeeEventuality = rs;
               if ( this.getStateByCode( 'PENAPR' ) === rs.idEstadoNovedad ) {
                  this.indicadorJefeAutoriza = true;
               } else {
                  this.indicadorJefeAutoriza = false;
               }
               this.employeeService.get( rs.idTercero ).subscribe( employee => {
                  this.employee = employee;
                  this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
                                                 this.employee.segundoNombre + ' ' +
                                                 this.employee.primerApellido + ' ' +
                                                 this.employee.segundoApellido;

                  this.employee.edad = moment().diff( this.employee.fechaNacimiento, 'years', false ).toString();
               } );
               this.employeeEventualitiesAttachmentService.getAllByIdEventuality( rs.idTerceroNovedad )
               .subscribe( rest => {
                  this.listAttachment = rest;
               } );
               this.employeeNoveltyService.getFieldByIdEventuality( rs.idNovedad ).subscribe( data => {
                  this.listField = data;
                  this.propareForm();
               } );
            } );
            this.employeeEventualitiesActivitiesService.getAllByEventuality( tempIdTerceroNovedad ).subscribe( data => {
               this.listActivities = data;
            } );
         } else {

         }
      } );

   }

   propareForm() {
      for ( let field of this.listField ) {
         if ( field.codigoCampoNovedad === 'FECHINI' ) {
            this.showfechainicio = field.indicadorHabilitado;
            this.requiredfechainicio = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'FECFIN' ) {
            this.showfechafinal = field.indicadorHabilitado;
            this.requiredfechafinal = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'HORINI' ) {
            this.showhorainicio = field.indicadorHabilitado;
            this.requiredhorainicio = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'HORFIN' ) {
            this.showhorafinal = field.indicadorHabilitado;
            this.requiredhorafinal = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'FECREI' ) {
            this.showfechareintegro = field.indicadorHabilitado;
            this.requiredfechareintegro = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'HORREI' ) {
            this.showhorareintegro = field.indicadorHabilitado;
            this.requiredhorareintegro = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'DIAS' ) {
            this.showdias = field.indicadorHabilitado;
            this.requireddias = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'DIAGN' ) {
            this.showdiagnostico = field.indicadorHabilitado;
            this.requireddiagnostico = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'REMPL' ) {
            this.showreemplazado = field.indicadorHabilitado;
            this.requiredreemplazado = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'VALOR' ) {
            this.showvalor = field.indicadorHabilitado;
            this.requiredvalor = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'CUOTAS' ) {
            this.showcuotas = field.indicadorHabilitado;
            this.requiredcuotas = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'REFERE' ) {
            this.showreferencia = field.indicadorHabilitado;
            this.requiredreferencia = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'ENTID' ) {
            this.showentidad = field.indicadorHabilitado;
            this.requiredentidad = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'DESCRI' ) {
            this.showdescripcion = field.indicadorHabilitado;
            this.requireddescripcion = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'PERIN' ) {
            this.showperiodoinicial = field.indicadorHabilitado;
            this.requiredperiodoinicial = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'PERFI' ) {
            this.showperiodofinal = field.indicadorHabilitado;
            this.requiredperiodoinicial = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'RET' ) {
            this.showretiro = field.indicadorHabilitado;
            this.requiredretiro = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'EPS' ) {
            this.showeps = field.indicadorHabilitado;
            this.requiredeps = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'FP' ) {
            this.showfp = field.indicadorHabilitado;
            this.requiredfp = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'CCF' ) {
            this.showccf = field.indicadorHabilitado;
            this.requiredccf = field.indicadorObligatorio;
         }
      }

   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();
   }

   downloadFile( id: number ) {
      this.adjuntosService.downloadFile( id ).subscribe( res => {
         this.adjuntosService.getFileName( id ).subscribe( adj => {
            saveAs( res, adj.nombreArchivo );
         } );
      } );
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   getStateByCode( codigo: string ) {
      let temp = this.listEstadosTemp.find( x => x.codigo === codigo );
      if ( temp ) {
         return temp.idLista;
      } else {
         return null;
      }
   }

   add() {
      this.employeeEventualityActivity.idTerceroNovedad = this.employeeEventuality.idTerceroNovedad;
      this.employeeEventualityActivity.idEstadoNovedad = this.employeeEventuality.idEstadoNovedad;
      this.saveActivity = !this.saveActivity;
   }

   cancelSave( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.saveActivity = !this.saveActivity;
                                                 this.employeeEventualityActivity = new EmployeeEventualityActivity();
                                              }
                                           } );
      } else {
         this.saveActivity = !this.saveActivity;
         this.employeeEventualityActivity = new EmployeeEventualityActivity();
      }
   }

   update( nv: EmployeeEventualityActivity ) {
      this.saveActivity = !this.saveActivity;
      this.employeeEventualityActivity = nv;
   }

   detail() {

   }

   submitNotAuthorize() {
      this.employeeEventuality.idEstadoNovedad = this.getStateByCode( 'RECHAZ' );
      this.employeeNoveltyService.update( this.employeeEventuality ).subscribe( rs => {
         this._nav.setMesage( 2, this.msgs );
         this.location.back();
      }, error => {
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   submitAuthorize() {
      this.employeeEventuality.idEstadoNovedad = this.getStateByCode( 'SOLICI' );
      this.employeeNoveltyService.update( this.employeeEventuality ).subscribe( rs => {
         this._nav.setMesage( 2, this.msgs );
         this.location.back();
      }, error => {
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   onSubmit() {
      if ( this.employeeEventualityActivity.idTerceroNovedadActividad ) {
         this.employeeEventualitiesActivitiesService.update( this.employeeEventualityActivity ).subscribe( rs => {
            this._nav.setMesage( 2, this.msgs );
            this.employeeEventuality.idEstadoNovedad = this.employeeEventualityActivity.idEstadoNovedad;
            this.employeeNoveltyService.update( this.employeeEventuality ).subscribe();
            this.saveActivity = !this.saveActivity;
            this.listActivities = [];
            this.employeeEventualitiesActivitiesService.getAllByEventuality( this.employeeEventuality.idTerceroNovedad )
            .subscribe( data => {
               this.listActivities = data;
            } );
            this.employeeEventualityActivity = new EmployeeEventualityActivity();
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      } else {
         this.employeeEventualitiesActivitiesService.add( this.employeeEventualityActivity ).subscribe( rs => {
            this._nav.setMesage( 1, this.msgs );
            this.employeeEventuality.idEstadoNovedad = this.employeeEventualityActivity.idEstadoNovedad;
            this.employeeNoveltyService.update( this.employeeEventuality ).subscribe();
            this.saveActivity = !this.saveActivity;
            this.listActivities = [];
            this.employeeEventualitiesActivitiesService.getAllByEventuality( this.employeeEventuality.idTerceroNovedad )
            .subscribe( data => {
               this.listActivities = data;
            } );
            this.employeeEventualityActivity = new EmployeeEventualityActivity();
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      }
   }

   setSearch() {
      this._nav.setSearch( 'transact-eventuality', this.busqueda );
   }

   goBack(): void {
      this.location.back();
   }
}
