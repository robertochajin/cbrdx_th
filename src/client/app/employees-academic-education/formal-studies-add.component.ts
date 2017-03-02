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
                  this.location.back();
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
    }

    onSelectEnd(event:any) {
      let d = new Date(Date.parse(event));
      this.fstudy.finalizacion = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
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


