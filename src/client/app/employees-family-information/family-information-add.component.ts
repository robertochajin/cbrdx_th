/**
 * Created by TracesMaker on 08/02/2017.
 */
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {date} from "gulp-util";
import {modelGroupProvider} from "@angular/forms/src/directives/ng_model_group";

class constructorFamilyInformation implements FamilyInformation {
    constructor(
        public idFamiliar?,
        public tipoDeDocumento?,
        public numeroDeDocumento?,
        public primerNombre?,
        public segundoNombre?,
        public primerApellido?,
        public segundoApellido?,
        public fechadeNacimiento?,
        public parentesco?,
        public correoElectronico?,
        public telefono1?,
        public telefono2?,
        public direccionDeResidencia?,
        public convive?
    ) {}
}


@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: './family-information-add.component.html',
})

export class FamilyInformationAddComponent {
    @Input()
    familyInformation: FamilyInformation = new constructorFamilyInformation();
    model: any = {};
    const titulo = 'Agregando Familiar';

    constructor(
        private familyInformationService: FamilyInformationService,
        private router: Router
    ) {}

    add() {

        this.familyInformationService.add(this.familyInformation)
            .subscribe(
                data => {
                    this.router.navigate(['/employees-family-information']);
                },
                error => {
                });
    }

    goBack(): void {
        this.router.navigate(['/employees-family-information']);
    }
}