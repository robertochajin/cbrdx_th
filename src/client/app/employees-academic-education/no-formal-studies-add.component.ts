import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit} from '@angular/core';
import { AcademicEducationService } from './academic-education.service';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Noformalstudies } from './no-formal-studies';
import { Message, ConfirmationService } from 'primeng/primeng';

import { StudyLevelServices } from '../_services/study-level.service';
import { StudyAreaServices } from '../_services/study-area.service';
import { CitiesServices } from '../_services/cities.service';
import { StudyStateServices } from '../_services/study-state.service';
import { StudyTypeServices } from '../_services/study-type.service';
import { StudyIntensityServices } from '../_services/study-intensity.service';
import {NavService}                 from '../_services/_nav.service';
@Component({
  moduleId: module.id,
  selector: 'academic-education-formal',
  templateUrl: 'no-formal-studies-form.component.html',
  providers: [ConfirmationService]
})

export class NoFormalStudiesAddComponent implements OnInit {
  @Input()
  cityList: any;
  nfstudy: Noformalstudies = new Noformalstudies();
  header = 'Agregando Estudio no Formal';
  submitted: boolean;
  msgs: Message[] = [];
  studyLevelList: any;
  studyAreaList: any;
  studyStateList: any;
  studyTypeList: any;
  studyIntensityList  : any;
  minDate: Date = null;
  maxDate: Date = null;
  maxDateFinal: Date = null;
  es: any;
  range: string;
  id_estado_estudio_finalizado = 2;
  copyAutocomplete: string;
  //hace falta definir acceso a constantes en servicio

  constructor(private academicEducationService: AcademicEducationService,
              private citiesServices: CitiesServices,
              private studyLevelServices: StudyLevelServices,
              private studyAreaServices: StudyAreaServices,
              private studyStateServices: StudyStateServices,
              private studyTypeServices: StudyTypeServices,
              private confirmationService: ConfirmationService,
              private studyIntensityServices: StudyIntensityServices,
              private router: Router,
              private location: Location,
              private _nav:NavService) {
  }

  ngOnInit() {
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
    this.maxDate.setFullYear(year, month);
    this.minDate = new Date();
    this.minDate.setFullYear(lastYear, month);
    this.maxDateFinal = new Date();
    this.maxDateFinal.setMonth(month);
    this.maxDateFinal.setFullYear(year);
    this.range = `${lastYear}:${year}`;

    this.studyLevelServices.getAll().subscribe(studyLevelList => this.studyLevelList = studyLevelList);
    this.studyAreaServices.getAll().subscribe(studyAreaList => this.studyAreaList = studyAreaList);
    this.studyStateServices.getAll().subscribe(studyStateList => this.studyStateList = studyStateList);
    this.studyTypeServices.getAll().subscribe(studyTypeList => this.studyTypeList = studyTypeList);
    this.studyIntensityServices.getAll().subscribe(studyIntensityList => this.studyIntensityList = studyIntensityList);
  }

  onSubmit(value: string) {
    if(this.copyAutocomplete != this.nfstudy.ciudad.label){
      this.nfstudy.ciudad = {value:null, label:''};
    }else {
      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});
      this.academicEducationService.addNoFormal(this.nfstudy)
        .subscribe(
          data => {
            this._nav.setTab(3);
            this.location.back();
          });
    }
  }


  citySearch(event:any) {
    this.citiesServices.getAllCities(event.query).subscribe(
      cities => this.cityList = cities
    );
  }

  captureCityId(event:any) {
    this.nfstudy.ciudad = event;
    this.copyAutocomplete = event.label
  }

  onSelectBegin(event:any) {
    let d = new Date(Date.parse(event));
    this.nfstudy.ingreso = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    this.minDate.setFullYear(d.getFullYear(),d.getMonth(),d.getDate()+1);
  }

  onSelectEnd(event:any) {
    let d = new Date(Date.parse(event));
    this.nfstudy.finalizacion = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    this.maxDate.setFullYear(d.getFullYear(),d.getMonth(),d.getDate()-1);
  }

  updateEnd():void {
    if (this.nfstudy.estadoEstudio.value !== this.id_estado_estudio_finalizado) {
      this.nfstudy.finalizacion = undefined;
    }
  }

  goBack(): void {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea Cancelar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this._nav.setTab(3);
        this.location.back();
        //this.router.navigate(['/employees-no-formal-studies']);
      }
    });
  }
}


