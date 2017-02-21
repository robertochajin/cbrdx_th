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
    selector: 'academic-education-noformal',
    templateUrl: 'no-formal-studies-form.component.html',
})

export class NoFormalStudiesUpdateComponent implements OnInit{


    nfstudy: constructorFormal;
    header: string = 'Editando Estudio';

    constructor(
        private academicEducationService: AcademicEducationService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.academicEducationService.getNoFormal(+params['id']))
            .subscribe(nfstudy => this.nfstudy = nfstudy);
    }

    save() {

        this.academicEducationService.updateFormal(this.nfstudy)
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
