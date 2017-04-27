import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';
import {Employee} from "../_models/employees";
import {EmployeesClinicalData} from "../_models/employeesClinicalData";
import {ClinicalInformationService} from "../_services/clinical-information.service";
import {DiagnosticosCIE} from "../_models/diagnosticosCIE";
import {DiagnosticCIEServices} from "../_services/diagnosticCIE.service";
import * as moment from 'moment/moment';

@Component({
   moduleId: module.id,
   templateUrl: 'clinical-information.component.html',
   selector: 'clinical-information',
   providers: [ConfirmationService]
})
export class ClinicalInformationComponent {
   @Input()
   employee: Employee;
   clinicalInformation: EmployeesClinicalData = new EmployeesClinicalData;
   ecd: EmployeesClinicalData;
   diagnosticList: DiagnosticosCIE[] = [];
   minDateInicio: Date = null;
   maxDateInicio: Date = new Date(Date.now());
   minDateFin: Date = null;
   maxDateFin: Date = null;
   tfechaInicio: string;
   tfechaFin: string;
   es: any;
   rangeInicio: string;
   rangeFin: string;
   wrongDiagnostic: boolean = true;

   clinicalInformations: EmployeesClinicalData[];
   idMayorDeEdad: number = 1; //Es necesario crear la constante y consultarla
   editing: boolean = false;
   ecdBackUp: EmployeesClinicalData;


   constructor(private clinicalInformationService: ClinicalInformationService,
               private diagnosticCIEServices: DiagnosticCIEServices,
               private router: Router,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      this.setInitRanges();
      this.clinicalInformationService.getAllByEmployee(this.employee.idTercero).subscribe(employeesClinicalData => this.clinicalInformations = employeesClinicalData);
   }

   setInitRanges() {
      this.es = {
         firstDayOfWeek: 1,
         dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
         dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
         dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
         monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
         monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
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
      if (this.employee.idTipoDocumento === this.idMayorDeEdad) {
         this.minDateInicio.setFullYear(lastYear, month);
         this.minDateFin.setFullYear(lastYear, month);
      } else {
         this.minDateInicio.setFullYear(last18Year, month);
         this.minDateFin.setFullYear(last18Year, month);
      }
      this.rangeInicio = `${last80Year}:${year}`;
      this.rangeFin = `${last40Year}:${next40Year}`;
      this.maxDateInicio = today;
      this.maxDateFin = today;
   }

   captureDiagnosticId(event: any) {
      this.ecd.idDiagnostico = this.ecd.diagnostico.idDiagnosticoCie;
      this.wrongDiagnostic = false;
   }

   diagnosticSearch(event: any) {
      this.diagnosticCIEServices.getByWildCard(event.query).subscribe(diagnostics => {
         this.diagnosticList = diagnostics;
         this.diagnosticList.map(d => d.label = d.codigo + ' : ' + d.descripcion)
      });
   }

   add() {
      this.ecd = new EmployeesClinicalData();
      this.editing = false;
   }

   saveDiagnostic() {
      //toma el temporal y lo agrega a la lista despues de recibir success en la solicitud del guardado
      if (this.ecd.idDiagnostico === this.ecd.diagnostico.idDiagnosticoCie) {
         this.ecd.idTercero = this.employee.idTercero;

         let fi: moment.Moment = moment(this.tfechaInicio, 'MM/DD/YYYY');
         let ff: moment.Moment;
         //this.ecd.fechaInicio = fi.format('YYYY-MM-DD');
         this.ecd.fechaInicio = fi.add(3, 'days').format('YYYY-MM-DD');
         if (this.tfechaFin !== undefined && this.tfechaFin !== '') {
            ff = moment(this.tfechaFin, 'MM/DD/YYYY');
            this.ecd.fechaFin = ff.add(3, 'days').format('YYYY-MM-DD');
            //this.ecd.fechaFin = ff.format('YYYY-MM-DD');
         }

         if (this.ecd.idTerceroDatoClinico != null && this.ecd.idTerceroDatoClinico != undefined) {
            this.clinicalInformationService.update(this.ecd).subscribe(data => {
               if (data.ok) {
                  this.ecd.codigo = this.ecd.diagnostico.codigo;
                  this.ecd.descripcion = this.ecd.diagnostico.descripcion;
                  this.ecd.fechaFin = ff.subtract(3, 'days').format('YYYY-MM-DD');
                  this.ecd.fechaInicio = fi.subtract(3, 'days').format('YYYY-MM-DD');
                  this.clinicalInformations.push(this.ecd);
                  this.tfechaFin = '';
                  this.tfechaInicio = '';
                  this.ecd = null;
                  this.editing = false;
               }
            });
         } else {
            this.clinicalInformationService.add(this.ecd).subscribe(data => {
               if (data.idTerceroDatoClinico) {
                  data.codigo = this.ecd.diagnostico.codigo;
                  data.descripcion = this.ecd.diagnostico.descripcion;
                  this.clinicalInformations.push(data);
                  this.tfechaFin = '';
                  this.tfechaInicio = '';
                  this.ecd = null;
                  this.editing = false;
               }
            });
         }

      } else {
         this.wrongDiagnostic = true;
      }
   }

   onSelectInicio(event: any) {
      let d = new Date(Date.parse(event));
      this.tfechaInicio = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.minDateFin.setFullYear(d.getFullYear(), d.getMonth(), d.getDate() + 1);
   }

   onSelectFin(event: any) {
      let d = new Date(Date.parse(event));
      this.tfechaFin = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.maxDateInicio.setFullYear(d.getFullYear(), d.getMonth(), d.getDate() - 1);
   }

   detail(f: EmployeesClinicalData) {

   }

   update(f: EmployeesClinicalData) {
      this.ecdBackUp = f;
      let fi: moment.Moment = moment(f.fechaInicio, 'YYYY-MM-DD');
      this.tfechaInicio = fi.format('MM/DD/YYYY');
      if (f.fechaFin !== null && f.fechaFin !== undefined && f.fechaFin !== '') {
         let ff: moment.Moment = moment(f.fechaFin, 'YYYY-MM-DD');
         this.tfechaFin = ff.format('MM/DD/YYYY');
      } else {
         this.tfechaFin = '';
      }
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
      this.clinicalInformations.splice(this.clinicalInformations.indexOf(f), 1);
      this.editing = true;
      this.maxDateFin = new Date();
   }

   goBack(): void {
      this.confirmationService.confirm({
         message: ` ¿Esta seguro que desea Cancelar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',
         accept: () => {
            this.ecd = null;
            if (this.editing) {
               this.clinicalInformations.push(this.ecdBackUp);
               this.editing = false;
            }
         }
      });
   }
}
