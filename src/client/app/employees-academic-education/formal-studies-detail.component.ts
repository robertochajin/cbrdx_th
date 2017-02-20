/**
 * Created by Angel on 15/02/2017.
 */


import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {Formalstudies} from './formal-studies';
import {AcademicEducationService} from './academic-education.service';

import 'rxjs/add/operator/switchMap';

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
    selector: 'academic-education',
    templateUrl: 'formal-studies-detail.component.html',
})


export class FormalStudiesDetailComponent implements OnInit   {
    @Input()

    study: Formalstudies = new constructorFormal();

    constructor(
        private academicEducationService: AcademicEducationService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.academicEducationService.getFormal(+params['id']));
        este$.subscribe(study => this.study = study);
    }

    goBack(): void {
        this.location.back();
    }
}

