import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

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
    templateUrl: 'family-information-form.component.html',
})

export class FamilyInformationUpdateComponent implements OnInit{
    familyInformation: constructorFamilyInformation;
    const titulo = 'Editanto Familiar';

    constructor(
        private familyInformationService: FamilyInformationService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.familyInformationService.get(+params['id']))
            .subscribe(familyInformation => this.familyInformation = familyInformation);
    }

    save() {

        this.familyInformationService.update(this.familyInformation)
            .subscribe(
                data => {
                    //this.router.navigate(['/employees-family-information']);
                    this.location.back();
                },
                error => {
                });
    }
    goBack(): void {
        this.location.back();
    }

}
