/**
 * Created by Angel on 14/02/2017.
 */
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import {Formalstudies} from './formal-studies';
import {AcademicEducationService} from './academic-education.service';

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
        public  estadoEstudio?,
    ) {}
}

@Component({
    moduleId: module.id,
    selector: 'academic-education-noformal',
    templateUrl: 'formal-studies-form.component.html',
})

export class FormalStudiesUpdateComponent implements OnInit{


    fstudy: constructorFormal;
    const header = 'Editando Estudio';

    constructor(
        private academicEducationService: AcademicEducationService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.academicEducationService.getFormal(+params['id']))
            .subscribe(fstudy => this.fstudy = fstudy);
    }

    save() {

        this.academicEducationService.updateFormal(this.fstudy)
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
