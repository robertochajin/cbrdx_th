import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Employee } from '../_models/employees';
import { EmployeesClinicalData } from '../_models/employeesClinicalData';
import { ClinicalInformationService } from '../_services/clinical-information.service';
import { DiagnosticosCIE } from '../_models/diagnosticosCIE';
import { DiagnosticCIEServices } from '../_services/diagnosticCIE.service';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'clinical-information.component.html',
               selector: 'clinical-information',
               providers: [ ConfirmationService ]
            } )
export class ClinicalInformationComponent implements OnInit {
   @Input()
   employee: Employee;
   clinicalInformation: EmployeesClinicalData = new EmployeesClinicalData;
   ecd: EmployeesClinicalData;
   diagnosticList: DiagnosticosCIE[] = [];
   minDateInicio: Date = null;
   maxDateInicio: Date = new Date( Date.now() );
   minDateFin: Date = null;
   maxDateFin: Date = null;
   tfechaInicio: string;
   tfechaFin: string;
   es: any;
   rangeInicio: string;
   rangeFin: string;
   wrongDiagnostic: boolean = true;
   msgs: Message[] = [];

   clinicalInformations: EmployeesClinicalData[];
   idMayorDeEdad: number = 1; // Es necesario crear la constante y consultarla
   editing: boolean = false;
   ecdBackUp: EmployeesClinicalData;

   constructor( private clinicalInformationService: ClinicalInformationService,
      private diagnosticCIEServices: DiagnosticCIEServices,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.setInitRanges();
      this.clinicalInformationService.getAllByEmployee( this.employee.idTercero )
      .subscribe( employeesClinicalData => this.clinicalInformations = employeesClinicalData );
   }

   setInitRanges() {
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
      let month = today.getMonth();
      let year = today.getFullYear();
      let last18Year = year - 18;
      let last40Year = year - 40;
      let last80Year = year - 80;
      let lastYear = year - 100;
      let next40Year = year + 40;
      this.maxDateInicio = new Date();
      this.minDateInicio = new Date();
      this.minDateFin = new Date();
      this.maxDateFin = new Date();
      if ( this.employee.idTipoDocumento === this.idMayorDeEdad ) {
         this.minDateInicio.setFullYear( lastYear, month );
         this.minDateFin.setFullYear( lastYear, month );
      } else {
         this.minDateInicio.setFullYear( last18Year, month );
         this.minDateFin.setFullYear( last18Year, month );
      }
      this.rangeInicio = `${last80Year}:${year}`;
      this.rangeFin = `${last40Year}:${next40Year}`;
      this.maxDateInicio = today;
      this.maxDateFin = today;
   }

   captureDiagnosticId( event: any ) {
      this.ecd.idDiagnostico = this.ecd.diagnostico.idDiagnosticoCie;
      this.wrongDiagnostic = false;
   }

   diagnosticSearch( event: any ) {
      this.diagnosticCIEServices.getByWildCard( event.query ).subscribe( diagnostics => {
         this.diagnosticList = diagnostics;
         this.diagnosticList.map( d => d.label = d.codigo + ' : ' + d.descripcion );
      } );
   }

   add() {
      this.ecd = new EmployeesClinicalData();
      this.editing = false;
   }

   saveDiagnostic() {
      // toma el temporal y lo agrega a la lista despues de recibir success en la solicitud del guardado
      if ( this.ecd.idDiagnostico === this.ecd.diagnostico.idDiagnosticoCie ) {
         this.ecd.idTercero = this.employee.idTercero;


         if ( this.ecd.idTerceroDatoClinico !== null && this.ecd.idTerceroDatoClinico !== undefined ) {
            this.clinicalInformationService.update( this.ecd ).subscribe( data => {
               if ( data.ok ) {
                  this.clinicalInformationService.getAllByEmployee( this.employee.idTercero )
                  .subscribe( employeesClinicalData => this.clinicalInformations = employeesClinicalData );
                  this.ecd = null;
                  this.editing = false;
               }
               // 1:add 2:update 3:error
               this._nav.setMesage( 2, this.msgs );
            } );
         } else {
            this.clinicalInformationService.add( this.ecd ).subscribe( data => {
               if ( data.idTerceroDatoClinico ) {
                  this.clinicalInformationService.getAllByEmployee( this.employee.idTercero )
                  .subscribe( employeesClinicalData => this.clinicalInformations = employeesClinicalData );
                  this.ecd = null;
                  this.editing = false;
               }
               // 1:add 2:update 3:error
               this._nav.setMesage( 1, this.msgs );
            } );
         }

      } else {
         this.wrongDiagnostic = true;
      }
   }

   onSelectInicio( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.minDateFin= new Date();
      this.minDateFin.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
   }

   onSelectFin( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.maxDateInicio= new Date();
      this.maxDateInicio.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() - 1 );
   }

   update( f: EmployeesClinicalData ) {
      this.ecdBackUp = f;
      this.ecd = new EmployeesClinicalData();
      this.ecd.diagnostico = {
         idDiagnosticoCie: f.idDiagnostico,
         codigo: f.codigo,
         descripcion: f.descripcion,
         label: f.codigo + ' ' + f.descripcion
      };
      this.ecd.idDiagnostico = f.idDiagnostico;
      this.ecd.idTercero = f.idTercero;
      this.ecd.idTerceroDatoClinico = f.idTerceroDatoClinico;
      this.ecd.fechaFin= f.fechaFin;
      this.ecd.fechaInicio= f.fechaInicio;
      this.clinicalInformations.splice( this.clinicalInformations.indexOf( f ), 1 );
      this.editing = true;
      this.maxDateFin = new Date();
      let d = new Date( f.fechaInicio  );
      this.minDateFin.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
   }

   goBack(dDirty : boolean): void {

      if ( dDirty ) {
         this.confirmationService.confirm( {
            message: ` ¿Esta seguro que desea Cancelar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
               this.ecd = null;
               if ( this.editing ) {
                  this.clinicalInformations.push( this.ecdBackUp );
                  this.editing = false;
               }
            }
         } );
      }else {
         this.ecd = null;
         if ( this.editing ) {
            this.clinicalInformations.push( this.ecdBackUp );
            this.editing = false;
         }      }

   }
}
