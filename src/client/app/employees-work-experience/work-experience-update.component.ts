/**
 * Created by Angel on 17/02/2017.
 */
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';

class constructorFormal implements Workexperience {
    constructor(
        public 	idEstudio?,
        public 	titulo?,
        public 	ingreso?,
        public 	finalizacion?,
        public 	ciudad?,
        public 	institucion?,
        public 	confirmada?,
    ) {}
}

@Component({
    moduleId: module.id,
    selector: 'work-experience',
    templateUrl: 'work-experience-form.component.html',
})

export class WorkExperienceUpdateComponent implements OnInit{


    fstudy: constructorFormal;
    const header = 'Editando Estudio';

    constructor(
        private workExperienceService: WorkExperienceService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.workExperienceService.get(+params['id']))
            .subscribe(fstudy => this.fstudy = fstudy);
    }

    save() {

        this.workExperienceService.update(this.fstudy)
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
