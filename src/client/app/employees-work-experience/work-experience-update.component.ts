/**
 * Created by Angel on 17/02/2017.
 */
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';

class constructorExperience implements Workexperience {
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
    templateUrl: 'work-experience-form.component.html',
})

export class WorkExperienceUpdateComponent implements OnInit{


    experience: constructorExperience;
    header:String = 'Editando Experiencia';

    constructor(
        private workExperienceService: WorkExperienceService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.workExperienceService.get(+params['id']))
            .subscribe(experience => this.experience = experience);
    }

    save() {

        this.workExperienceService.update(this.experience)
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
