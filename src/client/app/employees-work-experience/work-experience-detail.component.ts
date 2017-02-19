/**
 * Created by Angel on 15/02/2017.
 */


import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {WorkExperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';

import 'rxjs/add/operator/switchMap';

class constructorFormal implements WorkExperience {
    constructor(
        public 	idEstudio?,
        public 	titulo?,
        public 	ingreso?,
        public 	finalizacion?,
        public 	ciudad?,
        public 	institucion?,
        public 	confirmada?
    ) {}
}


@Component({
    moduleId: module.id,
    selector: 'work-experience',
    template: 'work-experience-detail.component.html',
})


export class WorkExperienceDetailComponent implements OnInit   {
    @Input()

    study: WorkExperience = new constructorFormal();

    constructor(
        private workExperienceService: WorkExperienceService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.workExperienceService.get(+params['id']));
        este$.subscribe(study => this.study = study);
    }

    goBack(): void {
        this.location.back();
    }
}

