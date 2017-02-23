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

//Costructor
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
    selector: 'work-experience-formal',
    templateUrl: 'work-experience-form.component.html',
})

export class WorkExperienceAddComponent {
    @Input()

    experience: Workexperience = new constructorExperience();
    header:String = 'Agregando Experiencia';

    constructor (
        private academicEducationService: WorkExperienceService,
        private router: Router,
        private location: Location

    ) {}

    save() {

        this.academicEducationService.add(this.experience)
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


