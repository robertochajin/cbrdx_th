/**
 * Created by Angel on 17/02/2017.
 */


import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';

import 'rxjs/add/operator/switchMap';

class constructorExperience implements constructorExperience {
    constructor(
        public 	idExperiencia?,
        public 	idColaborador?,
        public  empresa?,
        public  cargo?,
        public 	ingreso?,
        public 	finalizacion?,
        public 	ciudad?,
        public  telefonoEmpresa?,
        public  sectorEmpresa?,
        public  subsectorEmpresa?,
        public  nivelCargo?,
        public  areaCargo?,
        public  jefeInmediato?,
        public  tiempoExperiencia?,
        public  actualmente?,
    ) {}
}


@Component({
    moduleId: module.id,
    selector: 'work-experience',
    template: 'work-experience-detail.component.html',
})


export class WorkExperienceDetailComponent implements OnInit   {
    @Input()

    experience: Workexperience = new constructorExperience();

    constructor(
        private workExperienceService: WorkExperienceService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.workExperienceService.get(+params['id']));
        este$.subscribe(experience => this.experience = experience);
    }

    goBack(): void {
        this.location.back();
    }
}

