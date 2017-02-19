/**
 * Created by Angel on 15/02/2017.
 */
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
//import {date} from "gulp-util";
//import {modelGroupProvider} from "@angular/forms/src/directives/ng_model_group";
//import {SelectItem} from 'primeng/primeng';

class constructorFormal implements Workexperience {
    constructor(
        public 	idEstudio?,
        public 	titulo?,
        public 	ingreso?,
        public 	finalizacion?,
        public 	ciudad?,
        public 	institucion?,
        public 	confirmada?,
        public  nivelEstudio?,
        public  areaEstudio?,
        public  otraInstitucion?,
        public  estadoEstudio?,
    ) {}
}


@Component({
    moduleId: module.id,
    selector: 'work-experience-formal',
    templateUrl: 'work-experience-form.component.html',
})

export class WorkExperienceAddComponent {
    @Input()

    fstudy: Workexperience = new constructorFormal();
    const header = 'Agregando Estudio Formal';

    constructor (
        private academicEducationService: WorkExperienceService,
        private router: Router,
        private location: Location

    ) {}

    save() {

        this.academicEducationService.add(this.fstudy)
            .subscribe(
                data => {
                    this.location.back();
                },
                error => {
                });
    }

    goBack(): void {
        this.location.back();
    }
}


