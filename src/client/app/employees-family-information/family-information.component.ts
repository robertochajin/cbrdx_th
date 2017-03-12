import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyInformationService } from './family-information.service';
import { ConstructorFamilyInformation } from './family-information.construct';
import { ConfirmationService } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    templateUrl: 'family-information.component.html',
    selector: 'family-information',
    providers:  [ConfirmationService]
})
export class FamilyInformationComponent implements OnInit {

    familyInformation: ConstructorFamilyInformation = new ConstructorFamilyInformation();
    dialogObjet: ConstructorFamilyInformation = new ConstructorFamilyInformation();
    familyInformations: ConstructorFamilyInformation[];

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

    del(f: ConstructorFamilyInformation) {
        this.dialogObjet = f;
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que desea eliminar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.familyInformationService.delete(this.dialogObjet);
                this.familyInformations.splice(this.familyInformations.indexOf(this.dialogObjet), 1);
                this.dialogObjet = null;
            }
        });
    }

    detail(f: ConstructorFamilyInformation) {
        return this.router.navigate(['employees-family-information/detail/'+f.idTerceroFamiliar]);
    }

    add() {
        return this.router.navigate(['employees-family-information/add']);
    }

    update(f: ConstructorFamilyInformation) {
        return this.router.navigate(['employees-family-information/update/'+f.idTerceroFamiliar]);
    }

}
