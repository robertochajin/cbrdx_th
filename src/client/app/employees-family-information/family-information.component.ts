import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { FamilyInformationService } from './family-information.service';
import { ConstructorFamilyInformation } from './family-information.construct';
import { ConfirmationService } from 'primeng/primeng';
import { Employee } from '../employees/employees';
import * as moment from 'moment/moment';

@Component({
    moduleId: module.id,
    templateUrl: 'family-information.component.html',
    selector: 'family-information',
    providers:  [ConfirmationService]
})
export class FamilyInformationComponent implements OnInit {
    @Input() employee:Employee;
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
        //this.familyInformationService.getAllByEmployee(this.employee.idTercero).subscribe(
            familyInformations => {
              this.familyInformations = familyInformations;
              this.familyInformations.forEach(e => {
                e.nombreCompleto = e.primerNombre+' '+e.segundoNombre+' '+e.primerApellido+' '+e.segundoApellido;
                e.edad = moment(e.fechaNacimiento,'YYYY-MM-DD').toNow(true).toString();
              });
            }
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
        return this.router.navigate(['employees-family-information/add/'+this.employee.idTercero]);
    }

    update(f: ConstructorFamilyInformation) {
        return this.router.navigate(['employees-family-information/update/'+f.idTerceroFamiliar+'/'+f.idTercero]);
    }

}
