import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';
import {Employee} from "../_models/employees";
import {EmployeesClinicalData} from "../_models/employeesClinicalData";
import {ClinicalInformationService} from "../_services/clinical-information.service";
import {DiagnosticosCIE} from "../_models/diagnosticosCIE";
import {DiagnosticCIEServices} from "../_services/diagnosticCIE.service";

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
  ecd: EmployeesClinicalData = new EmployeesClinicalData();
  diagnosticList: DiagnosticosCIE[] = [];

  minDate: Date = null;
  maxDate: Date = new Date(Date.now());
  es: any;
  range: string;
  wrongDiagnostic: boolean = true;

  clinicalInformations: EmployeesClinicalData[];
  idMayorDeEdad: number = 1;  //Es necesario crear la constante y consultarla


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
    let lastYear = year - 100;
    this.maxDate = new Date();
    this.minDate = new Date();
    if (this.employee.idTipoDocumento === this.idMayorDeEdad) {
      this.minDate.setFullYear(lastYear, month);
      this.range = `${lastYear}:${last18Year}`;
      this.maxDate.setFullYear(last18Year);
    } else {
      this.minDate.setFullYear(last18Year, month);
      this.range = `${last18Year}:${year}`;
      this.maxDate.setFullYear(year);
    }
  }

  captureDiagnosticId(event: any){

  }

  diagnosticSearch(event: any){
    this.diagnosticCIEServices.getByWildCard(event.query).subscribe(diagnostics => this.diagnosticList = diagnostics);
  }

  saveDiagnostic() {
    //toma el temporal y lo agrega a la lista despues de recibir success en la solicitud del guardado
    this.clinicalInformationService.add(this.ecd).subscribe(data => {
      if(data.idTerceroDatoClinico){
        this.clinicalInformations.push(data);
      }
    });
  }

  detail(f: EmployeesClinicalData) {

  }

  update(f: EmployeesClinicalData) {

  }
}
