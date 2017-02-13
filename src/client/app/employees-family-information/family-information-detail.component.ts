/**
 * Created by TracesMaker on 07/02/2017.
 */


import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';

import 'rxjs/add/operator/switchMap';

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
    templateUrl: './family-information-detail.component.html',
})


export class FamilyInformationDetailComponent implements OnInit   {
    @Input()

    familyInformation: FamilyInformation = new constructorFamilyInformation();

    constructor(
        private familyInformationService: FamilyInformationService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.familyInformationService.get(+params['id']));
        este$.subscribe(familyInformation => this.familyInformation = familyInformation);
    }

    goBack(): void {
        this.location.back();
    }
}

