/**
 * Created by Angel on 16/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Noformalstudies} from './no-formal-studies';
import {AcademicEducationService} from './academic-education.service';
import {Observable} from 'rxjs/Observable';
import {ConfirmationService} from 'primeng/primeng';

class constructorNoFormal implements Noformalstudies {
    constructor(
        public 	idEstudio?,
        public 	titulo?,
        public 	ingreso?,
        public 	finalizacion?,
        public 	ciudad?,
        public 	institucion?,
        public 	confirmada?
    ) {}
}

@Component({
    moduleId: module.id,
    templateUrl: 'no-formal-studies.component.html',
    selector: 'academic-education-no-formal',
    providers:  [ConfirmationService]
})
export class NoFormalStudiesComponent {

    study: Noformalstudies = new constructorNoFormal();
    dialogObjet: Noformalstudies = new constructorNoFormal();
    nfstudies: Noformalstudies[];

    constructor(private academicEducationService: AcademicEducationService,
                private router: Router,
                private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.academicEducationService.getAllNoFormal().subscribe(
            nfstudies => this.nfstudies = nfstudies
        );
        let prue = this.nfstudies;
    }

    delete(f: Noformalstudies) {
        this.dialogObjet = f;
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que lo desea eliminar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.academicEducationService.deleteNoFormal( this.dialogObjet);
                this.nfstudies.splice(this.nfstudies.indexOf( this.dialogObjet), 1);
                this.dialogObjet = null;
            },
            reject: () => {
                this.dialogObjet = null;
            }
        });
    }

    detail(f: Noformalstudies) {
        this.router.navigate(['employees-no-formal-studies/detail/'+f.idEstudio]);
    }

    add() {
        this.router.navigate(['employees-no-formal-studies/add']);
    }

    update(f: Noformalstudies) {
        this.router.navigate(['employees-no-formal-studies/update/'+f.idEstudio]);
    }
}
