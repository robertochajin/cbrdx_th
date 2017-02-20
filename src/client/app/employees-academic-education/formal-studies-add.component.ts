/**
 * Created by Angel on 15/02/2017.
 */
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Formalstudies} from './formal-studies';
import {AcademicEducationService} from './academic-education.service';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
//import {date} from "gulp-util";
//import {modelGroupProvider} from "@angular/forms/src/directives/ng_model_group";
//import {SelectItem} from 'primeng/primeng';

class constructorFormal implements Formalstudies {
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
        public  estadoEstudio?
    ) {}
}


@Component({
    moduleId: module.id,
    selector: 'academic-education-formal',
    templateUrl: 'formal-studies-form.component.html',
})

export class FormalStudiesAddComponent {
    @Input()

    fstudy: Formalstudies = new constructorFormal();
    header: string = 'Agregando Estudio Formal';

    constructor (
        private academicEducationService: AcademicEducationService,
        private router: Router,
        private location: Location

    ) {}

    save() {

        this.academicEducationService.addFormal(this.fstudy)
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


