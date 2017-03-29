import 'rxjs/add/operator/switchMap';
import { Component, Input }         from '@angular/core';
import { Router, ActivatedRoute, Params  }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Employee }                 from '../_models/employees';
import { SelectItem, Message, ConfirmDialog, ConfirmationService } from 'primeng/primeng';
import { Search}                    from "../_models/search";
import { EmployeesService }         from '../_services/employees.service';
import { ListEmployeesService }     from '../_services/lists-employees.service';
import { PoliticalDivisionService } from "../_services/political-division.service";
import { TiposPersonas }            from '../_models/tiposPersonas';
import { DivisionPolitica }         from "../_models/divisionPolitica";

import {Ocupaciones} from "../_models/ocupaciones";
import {OcupacionesService}         from "../_services/ocupaciones.service";

import {ActividadEconomica} from "../_models/actividadEconomica";
import {ActividadEconomicaService}  from "../_services/actividadEconomica.service";
import * as moment from 'moment/moment';

@Component({
  moduleId: module.id,
  selector: 'employees',
  templateUrl: 'employees-form.component.html',
  providers:  [ConfirmationService]
})

export class EmployeesUpdateComponent {
  @Input()
  employee: Employee = new Employee();
  header: string = 'Agregando Colaborador';
  
  personTypes: SelectItem[] = [];
  documentTypes: SelectItem[] = [];
  resultExpeditionCity: DivisionPolitica[];
  resultBirthPlace: DivisionPolitica[] = [];
  ciudadExpDocumento: string;
  backupCiudadExpDocumento: string;
  ciudadNacimiento: string;
  backupCiudadNacimiento: string;
  genderTypes: SelectItem[] = [];
  maritalStatusTypes: SelectItem[] = [];
  rhRactorTypes: SelectItem[] = [];
  healthTypes: SelectItem[] = [];
  occupationsTypes: SelectItem[] = [];
  academicLevelTypes: SelectItem[] = [];
  affiliationTypes: SelectItem[] = [];
  sector: SelectItem[] = [];
  activities: SelectItem[] = [];
  occupations: SelectItem[] = [];
  legalStatusTypes: SelectItem[] = [];
  listadoOcupaciones: Ocupaciones[];
  listadoActividadEconomica: ActividadEconomica[];
  msgs: Message[] = [];
  
  maxDate:Date = null;
  maxDateDocumento:Date = null;
  range: string;
  es: any;
  expeditionDate: string;
  birthDate: string;
  deathDate: string;
  
  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private listEmployeesService: ListEmployeesService,
    private politicalDivisionService: PoliticalDivisionService,
    private actividadEconomicaService: ActividadEconomicaService,
    private ocupacionesService: OcupacionesService,
    private confirmationService: ConfirmationService
  ) {
  
    this.listEmployeesService.getListPersonTypes().subscribe(res => {
      for (let dp of res) {
        this.personTypes.push({
          label: dp.nombreListaTipoPersona,
          value: dp.idListaTipoPersona
        });
      }
    });
    
    this.listEmployeesService.getListPersonTypes().subscribe(res => {
      for (let dp of res) {
        this.personTypes.push({
          label: dp.nombreListaTipoPersona,
          value: dp.idListaTipoPersona
        });
      }
    });
    this.listEmployeesService.getDocumentTypes().subscribe(res => {
      for (let dp of res) {
        this.documentTypes.push({
          label: dp.nombreListaTipoDocumento,
          value: dp.idListaTipoDocumento
        });
      }
      //this.employee.idTipoDocumento = this.documentTypes[0].value;
      //this.updateDate(this.documentTypes[0]);
    });
    
    this.listEmployeesService.getGenderTypes().subscribe(res => {
      for (let dp of res) {
        this.genderTypes.push({
          label: dp.nombreListaGenero,
          value: dp.idListaGenero
        });
      }
    });
    this.listEmployeesService.getMaritalStatusTypes().subscribe(res => {
      for (let dp of res) {
        this.maritalStatusTypes.push({
          label: dp.nombreListaEstadoCivil,
          value: dp.idListaEstadoCivil
        });
      }
    });
    this.listEmployeesService.getRhRactorTypes().subscribe(res => {
      for (let dp of res) {
        this.rhRactorTypes.push({
          label: dp.nombre,
          value: dp.idListaFactorRh
        });
      }
    });
    this.listEmployeesService.getHealthTypes().subscribe(res => {
      for (let dp of res) {
        this.healthTypes.push({
          label: dp.nombre,
          value: dp.idListaCoberturaSalud
        });
      }
    });
    this.listEmployeesService.getOccupationsTypes().subscribe(res => {
      for (let dp of res) {
        this.occupationsTypes.push({
          label: dp.nombre,
          value: dp.idListaTipoOcupacion
        });
      }
    });
    this.listEmployeesService.getAcademicLevelTypes().subscribe(res => {
      for (let dp of res) {
        this.academicLevelTypes.push({
          label: dp.nombreListaNivelEstudio,
          value: dp.idListaNivelEstudio
        });
      }
    });
    this.listEmployeesService.getAffiliationTypes().subscribe(rest => {
      for (let dp of rest) {
        this.affiliationTypes.push({
          label: dp.nombre,
          value: dp.idListaTipoAfiliacion
        });
      }
    });
    this.actividadEconomicaService.listByPadre(0).subscribe(res => {
      for (let dp of res) {
        this.sector.push({
          label: dp.actividadEconomica,
          value: dp.idActividadEconomica
        });
      }
      //this.employee.idSectorEconomico = this.sector[0].value;
      //this.updateActivities(this.employee.idSectorEconomico);
    });
    
    this.ocupacionesService.listByNivel(4).subscribe(res => {
      for (let dp of res) {
        this.occupations.push({
          label: dp.ocupacion,
          value: dp.idOcupacion
        });
      }
    });
    
    
    
  }
  
  ngOnInit() {
  
      this.route.params
          .switchMap((params: Params) => this.employeesService.get(+params['id']))
          .subscribe(employee => {
            this.employee = employee;
            this.updateActivities(this.employee.idSectorEconomico);
  
            
            let mom: moment.Moment = moment(this.employee.fechaDocumento, 'YYYY-MM-DD');
            this.expeditionDate = mom.format('MM/DD/YYYY');
            
            let mom2: moment.Moment = moment(this.employee.fechaNacimiento, 'YYYY-MM-DD');
            this.birthDate = mom2.format('MM/DD/YYYY');
            
            
            if (this.employee.indicadorVivo == false) {
              let mom3: moment.Moment = moment(this.employee.fechaDefuncion, 'YYYY-MM-DD');
              this.deathDate = mom3.format('MM/DD/YYYY');
            }
  
            this.ciudadExpDocumento = this.employee.ciudadExpDocumento;
            this.backupCiudadExpDocumento = this.employee.ciudadExpDocumento;
            this.ciudadNacimiento = this.employee.ciudadNacimiento;
            this.backupCiudadNacimiento = this.employee.ciudadNacimiento;
      });
    
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
    let lasYear = year-80;
    this.maxDate = new Date();
    this.maxDate.setMonth(month);
    this.maxDate.setFullYear(year);
    this.maxDateDocumento = new Date();
    this.maxDateDocumento.setMonth(month);
    this.maxDateDocumento.setFullYear(year);
    this.employee.indicadorHabilitado = true;
    this.employee.indicadorVivo = true;
    this.employee.idTipoOcupacion = 1;
    this.range = `${lasYear}:${year}`;
    this.focusUP();
  }
  
  onSubmit() {
    this.focusUP();
    if(this.ciudadExpDocumento != this.backupCiudadExpDocumento ){
      this.ciudadExpDocumento = "";
      this.employee.ciudadExpDocumento ='';
    }
    if(this.ciudadNacimiento != this.backupCiudadNacimiento ){
      this.ciudadNacimiento = "";
      this.employee.ciudadNacimiento ='';
    }
    if(this.ciudadExpDocumento == this.backupCiudadExpDocumento && this.ciudadNacimiento == this.backupCiudadNacimiento) {
      this.msgs = [];
      this.employee.primerNombre = this.capitalizeSave(this.employee.primerNombre);
      this.employee.segundoNombre = this.capitalizeSave(this.employee.segundoNombre);
      this.employee.primerApellido = this.capitalizeSave(this.employee.primerApellido);
      this.employee.segundoApellido = this.capitalizeSave(this.employee.segundoApellido);
      
      let mom: moment.Moment = moment(this.expeditionDate, 'MM/DD/YYYY');
      this.employee.fechaDocumento = mom.format('YYYY-MM-DD');
      let mom2: moment.Moment = moment(this.birthDate, 'MM/DD/YYYY');
      this.employee.fechaNacimiento = mom2.format('YYYY-MM-DD');
      if (this.employee.indicadorVivo == false) {
        let mom3: moment.Moment = moment(this.deathDate, 'MM/DD/YYYY');
        this.employee.fechaDefuncion = mom3.format('YYYY-MM-DD');
      }
      
      
      this.employeesService.update(this.employee)
        .subscribe(data => {
          this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
          //this.router.navigate(['/employees']);
          this.location.back();
        }, error => {
          this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
        });
    }
  }
  
  goBack(): void {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea salir sin guardar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.router.navigate(['/employees']);
      }
    });
  }
  searchExpeditionCity(event: any) {
    this.politicalDivisionService.getAllCities(event.query).subscribe(
      lis => this.resultExpeditionCity = lis
    );
  }
  captureExpeditionCity(event: any) {
    this.employee.idCiudadExpDocumento = event.idDivisionPolitica;
    this.ciudadExpDocumento = event.camino;
    this.backupCiudadExpDocumento = event.camino;
  }
  searchBirthPlace(event: any) {
    this.politicalDivisionService.getAllCities(event.query).subscribe(
      lis => this.resultBirthPlace = lis
    );
  }
  captureBirthPlace(event: any) {
    this.employee.idCiudadNacimiento = event.idDivisionPolitica;
    this.ciudadNacimiento = event.camino;
    this.backupCiudadNacimiento = event.camino;
  }
  
  focusUP() {
    const element = document.querySelector('#formulario');
    if (element) { element.scrollIntoView(element); }
  }
  updateDate(event:any) {
    
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prev18Year =  year - 18;
    let prev20Year =  year - 20;
    let lastYear =  prev18Year - 80;
    this.maxDate = new Date();
    this.maxDate.setMonth(month);
    
    
    if(event.value === 1) {
      this.maxDate.setFullYear(prev18Year);
    } else if (event.value === 2) {
      this.maxDate.setFullYear(year);
    } else {
      this.maxDate.setFullYear(year);
    }
    
    if((this.employee.fechaNacimiento) !== null && (this.employee.fechaNacimiento) !== '' ) {
      let timestamp2 = new Date(this.maxDate).getTime();
      let timestamp1 = new Date(this.employee.fechaNacimiento).getTime();
      let timeDiff = Math.round(timestamp2 - timestamp1);
      if(timeDiff< 0) {
        this.employee.fechaNacimiento = '';
      }
    }
    
  }
  
  capitalize(event:any) {
    let input = event.target.value;
    event.target.value = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
  }
  
  capitalizeSave(input:any) {
    return input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
  }
  
  onExpeditionDate(event:any) {
    let d = new Date(Date.parse(event));
    this.expeditionDate= `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
  }
  
  onBirthDate(event:any) {
    let d = new Date(Date.parse(event));
    this.birthDate= `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
  }
  
  onDeathDate(event:any) {
    let d = new Date(Date.parse(event));
    this.deathDate= `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
  }
  
  updateActivities(value:number) {
    this.activities = [];
    this.actividadEconomicaService.listLastChild(value).subscribe(res => {
      for (let dp of res) {
        this.activities.push({
          label: dp.actividadEconomica,
          value: dp.idActividadEconomica
        });
      }
      this.employee.idActividadEconomica = this.activities[0].value;
    });
  }
  
}
