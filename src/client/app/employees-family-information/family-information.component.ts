/**
 * Created by Angel on 10/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';
import {Observable} from 'rxjs/Observable';
import {ConfirmationService} from 'primeng/primeng';
import {ConfirmationService} from 'primeng/primeng';

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
    selector: 'familyinformation',
    providers:  [ConfirmationService]
})
export class FamilyInformationComponent {

    familyInformation: FamilyInformation = new constructorFamilyInformation();
    dialogObjet: FamilyInformation = new constructorFamilyInformation();
    familyInformations: FamilyInformation[];

    constructor(
        private familyInformationService: FamilyInformationService,
        private router: Router,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.familyInformationService.getAll().subscribe(
            familyInformations => this.familyInformations = familyInformations
        );
    }

    delete(f: FamilyInformation) {
        this.dialogObjet = f;
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que desea eliminar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.familyInformationService.delete(this.dialogObjet);
                this.familyInformations.splice(this.familyInformations.indexOf(this.dialogObjet), 1);
                this.dialogObjet = null;
            },
            reject: () => {

            }
        });
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
