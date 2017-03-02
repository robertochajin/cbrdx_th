/**
 * Created by Angel on 10/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {FamilyInformationService} from './family-information.service';
import {constructorFamilyInformation} from './family-information.construct';
import {ConfirmationService} from 'primeng/primeng';
import * as moment from 'moment/moment';

@Component({
    moduleId: module.id,
    templateUrl: 'family-information.component.html',
    selector: 'familyinformation',
    providers:  [ConfirmationService]
})
export class FamilyInformationComponent {

    familyInformation: constructorFamilyInformation = new constructorFamilyInformation();
    dialogObjet: constructorFamilyInformation = new constructorFamilyInformation();
    familyInformations: constructorFamilyInformation[];


    constructor(
        private familyInformationService: FamilyInformationService,
        private router: Router,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.familyInformationService.getAll().subscribe(
            familyInformations => {
                this.familyInformations = familyInformations;
                this.familyInformations.forEach(function(obj, index){
                    obj.nombreCompleto = obj.primerNombre+' '+obj.segundoNombre+' '+obj.primerApellido+' '+obj.segundoApellido;
                    let then = moment(obj.fechadeNacimiento,'MM/DD/YYYY').toNow(true);
                    obj.edad = then.toString();
                });
            }
        );
    }

    del(f: constructorFamilyInformation) {
        this.dialogObjet = f;
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que desea eliminar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            // ok:'Si',
            // cancel: "NO",
            accept: () => {
                this.familyInformationService.delete(this.dialogObjet);
                this.familyInformations.splice(this.familyInformations.indexOf(this.dialogObjet), 1);
                this.dialogObjet = null;
            },
            reject: () => {

            }
        });
    }

    detail(f: constructorFamilyInformation) {
        return this.router.navigate(['employees-family-information/detail/'+f.idFamiliar]);
    }

    add() {
        return this.router.navigate(['employees-family-information/add']);
    }

    update(f: constructorFamilyInformation) {
        return this.router.navigate(['employees-family-information/update/'+f.idFamiliar]);
    }

}
