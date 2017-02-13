/**
 * Created by Angel on 10/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';
import {Observable} from 'rxjs/Observable';

class constructorFamilyInformation implements FamilyInformation {
    constructor(
        public idFamiliar?,
        public tipoDeDocumento?,
        public nombreCompleto?,
        public numeroDeDocumento?,
        public primerNombre?,
        public segundoNombre?,
        public primerApellido?,
        public segundoApellido?,
        public fechadeNacimiento?,
        public edad?,
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
    templateUrl: 'family-information.component.html',
    selector: 'familyinformation'
})
export class FamilyInformationComponent {

    displayDialog: boolean;

    familyInformation: FamilyInformation = new constructorFamilyInformation();

    familyInformations: FamilyInformation[];

    constructor(private familyInformationService: FamilyInformationService, private router: Router) {}

    ngOnInit() {
        this.familyInformationService.getAll().subscribe(
            familyInformations => this.familyInformations = familyInformations
        );
    }

    delete(f: FamilyInformation) {
        this.familyInformationService.delete(f);
        this.familyInformations.splice(this.familyInformations.indexOf(f), 1);
        f = null;
    }

    detail(f: FamilyInformation) {
        this.router.navigate(['employees-family-information/detail/'+f.idFamiliar]);
    }

    add() {
        this.router.navigate(['employees-family-information/add']);
    }

    update(f: FamilyInformation) {
        this.router.navigate(['employees-family-information/update/'+f.idFamiliar]);
    }
}
