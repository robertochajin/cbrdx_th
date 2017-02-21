/**
 * Created by Angel on 15/02/2017.
 */
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Noformalstudies} from './no-formal-studies';
import {AcademicEducationService} from './academic-education.service';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';

class constructorNoFormal implements Noformalstudies {
    constructor(
        public 	idEstudio?,
        public 	titulo?,
        public 	ingreso?,
        public 	finalizacion?,
        public 	ciudad?,
        public 	institucion?,
        public 	confirmada?,
        public 	tipoEstudio?,
        public 	otroTipoEstudio?,
        public 	intensidad?,
        public 	descripcion?,
        public 	areaEstudio?,
        public 	estadoEstudio?
    ) {}
}


@Component({
    moduleId: module.id,
    selector: 'academic-education-formal',
    templateUrl: 'no-formal-studies-form.component.html',
})

export class NoFormalStudiesAddComponent {
    @Input()

    nfstudy: Noformalstudies = new constructorNoFormal();
    const header = 'Agregando Estudio Formal';

    constructor (
        private academicEducationService: AcademicEducationService,
        private router: Router,
        private location: Location

    ) {}

    save() {

        this.academicEducationService.addNoFormal(this.nfstudy)
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


