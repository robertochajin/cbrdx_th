import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { AcademicEducationService } from './academic-education.service';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { FormalStudies } from './formal-studies';
import { SelectItem, Message, ConfirmDialog, ConfirmationService } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

import { StudyLevelServices } from '../_services/study-level.service';
import { StudyAreaServices } from '../_services/study-area.service';
import { CitiesServices } from '../_services/cities.service';
import { StudyStateServices } from '../_services/study-state.service';
import { InstituteServices } from '../_services/institute.service';

@Component({
    moduleId: module.id,
    selector: 'academic-education-formal',
    templateUrl: 'formal-studies-form.component.html',
    providers:  [ConfirmationService]
})

export class FormalStudiesAddComponent implements OnInit {
    @Input()
    cityList: any;
    fstudy: FormalStudies = new FormalStudies();
    header: string = 'Agregando Estudio Formal';
    submitted: boolean;
    msgs: Message[] = [];
    studyLevelList: any;
    studyAreaList: any;
    studyStateList: any;
    instituteList: any;
    minDate:Date = null;
    maxDate:Date = null;
    maxDateFinal:Date = null;
    es: any;
    range: string;
    yeison: any;
    id_estado_estudio_finalizado = 2; //hace falta definir acceso a constantes en servicio

    constructor (
        private academicEducationService: AcademicEducationService,
        private citiesServices: CitiesServices,
        private instituteServices: InstituteServices,
        private studyLevelServices: StudyLevelServices,
        private studyAreaServices: StudyAreaServices,
        private studyStateServices: StudyStateServices,
        private router: Router,
        private location: Location,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit () {
      this.yeison = JSON;
      this.es = {
        firstDayOfWeek: 1,
        dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        dayNamesMin: [ "D","L","M","X","J","V","S" ],
        monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
      };
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let last18Year = year-18;
      let lastYear = year-100;
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
    }

    onSubmit(value: string) {
      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});
      this.academicEducationService.addFormal(this.fstudy)
          .subscribe(
              data => {
                this.router.navigate(['/employees-formal-studies']);
          });
    }

    citySearch(event:any) {
      this.citiesServices.getAllCities(event.query).subscribe(
        cities => this.cityList = cities
      );
    }

    captureCityId(event:any) {
      this.fstudy.ciudad.value = event.value;
    }

    instituteSearch(event:any) {
      this.instituteServices.getByWildCard(event.query).subscribe(
        instituteList => this.instituteList = instituteList
      );
    }

    captureInstituteId(event:any) {
      this.fstudy.institucion.value = event.value;
    }

    onSelectBegin(event:any) {
      let d = new Date(Date.parse(event));
      this.fstudy.ingreso = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;

      this.minDate.setFullYear(d.getFullYear(),d.getMonth(),d.getDate());
    }

    onSelectEnd(event:any) {
      let d = new Date(Date.parse(event));
      this.fstudy.finalizacion = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;

      this.maxDate.setFullYear(d.getFullYear(),d.getMonth(),d.getDate());
    }

    updateEnd():void {
      if (this.fstudy.estadoEstudio.value !== this.id_estado_estudio_finalizado){
        this.fstudy.finalizacion = undefined;
      }
    }

    goBack(): void {
      this.confirmationService.confirm({
        message: ` ¿Esta seguro que desea Cancelar?`,
        header: 'Corfirmación',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.router.navigate(['/employees-formal-studies']);
        },
        reject: () => {
        }
      });
    }
}


