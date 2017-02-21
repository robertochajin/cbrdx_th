/**
 * Created by Angel on 14/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Formalstudies} from './formal-studies';
import {AcademicEducationService} from './academic-education.service';
import {Observable} from 'rxjs/Observable';
import {ConfirmationService} from 'primeng/primeng';

class constructorFormal implements Formalstudies {
    constructor(
        public 	idEstudio?,
        public 	titulo?,
        public 	ingreso?,
        public 	finalizacion?,
        public 	ciudad?,
        public 	institucion?,
        public 	confirmada?,
    ) {}
}

@Component({
    moduleId: module.id,
    templateUrl: 'formal-studies.component.html',
    selector: 'academic-education-formal',
    providers:  [ConfirmationService]
})
export class FormalStudiesComponent {

    fstudy: Formalstudies = new constructorFormal();
    dialogObjet: Formalstudies = new constructorFormal();
    fstudies: Formalstudies[];

    constructor(
        private academicEducationService: AcademicEducationService,
        private router: Router,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.academicEducationService.getAllFormal().subscribe(
            fstudies => this.fstudies = fstudies
        );
    }

    delete(f: Formalstudies) {
        this.dialogObjet = f;
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que lo desea eliminar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.academicEducationService.deleteFormal( this.dialogObjet);
                this.fstudies.splice(this.fstudies.indexOf( this.dialogObjet), 1);
                this.dialogObjet = null;
            },
            reject: () => {
                this.dialogObjet = null;
            }
        });
    }

    detail(f: Formalstudies) {
        this.router.navigate(['employees-formal-studies/detail/'+f.idEstudio]);
    }

    add() {
        this.router.navigate(['employees-formal-studies/add']);
    }

    update(f: Formalstudies) {
        this.router.navigate(['employees-formal-studies/update/'+f.idEstudio]);
    }
}
