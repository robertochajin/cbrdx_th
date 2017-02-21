/**
 * Created by Angel on 10/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';
import {constructorFamilyInformation} from './family-information.construct';
import {ConfirmationService} from 'primeng/primeng';

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

    del(f: FamilyInformation) {
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
        return this.router.navigate(['employees-family-information/detail/'+f.idFamiliar]);
    }

    add() {
        return this.router.navigate(['employees-family-information/add']);
    }

    update(f: FamilyInformation) {
        return this.router.navigate(['employees-family-information/update/'+f.idFamiliar]);
    }
}
