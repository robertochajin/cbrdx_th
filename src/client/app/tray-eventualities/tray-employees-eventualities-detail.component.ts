import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeEstate } from '../_models/employee-estate';
import { EmployeeEstateService } from '../_services/employee-estate.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeeEventuality } from '../_models/employeeEventuality';
import { EventualityServices } from '../_services/eventuality.service';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { EmployeeEventualitiesAttachmentService } from '../_services/employees-eventualities-attachment.service';
import { EmployeeEventualityAttachment } from '../_models/employeeEventualityAttachment';
import { AdjuntosService } from '../_services/adjuntos.service';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';

@Component( {
               moduleId: module.id,
               templateUrl: 'tray-employees-eventualities-detail.component.html',
               selector: 'tray-employees-eventuality-detail'
            } )
export class EmployeeEventualityTrayDetailComponent {
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

   listAttachment: EmployeeEventualityAttachment[] = [];
   employee: Employee = new Employee();

   constructor( private eventualityServices: EventualityServices,
      private employeeNoveltyService: EmployeeEventualitiesService,
      private employeeEventualitiesAttachmentService: EmployeeEventualitiesAttachmentService,
      private router: Router,
      private employeesService: EmployeesService,
      private adjuntosService: AdjuntosService,
      private route: ActivatedRoute ) {
   }

   ngOnInit() {
      this.employeeEventualitiesAttachmentService.getAllByIdEventuality( this.employeeEventuality.idTerceroNovedad )
      .subscribe( rest => {
         this.listAttachment = rest;
      } );
      this.employeeNoveltyService.getFieldByIdEventuality( this.employeeEventuality.idNovedad ).subscribe( data => {
         this.listField = data;
         this.propareForm();
      } );
      this.employeesService.get( this.employeeEventuality.idTercero ).subscribe( res => {
         this.employee = res;
         this.employee.nombreCompleto = this.employee.primerNombre + ' ' + this.employee.segundoNombre + ' ' + this.employee.primerApellido + ' ' + this.employee.segundoApellido;
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

   downloadFile( id: number ) {
      this.adjuntosService.downloadFile( id ).subscribe( res => {
         this.adjuntosService.getFileName( id ).subscribe( adj => {
            saveAs( res, adj.nombreArchivo );
         } );
      } );
   }

   goBack(): void {
      this.dismiss.emit( 1 );
   }
}
