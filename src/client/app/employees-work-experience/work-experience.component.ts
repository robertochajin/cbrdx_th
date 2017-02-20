/**
 * Created by Angel on 14/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';
import {Observable} from 'rxjs/Observable';
import {ConfirmationService} from 'primeng/primeng';

class constructorExperience implements Workexperience {
    constructor(
        public 	idEstudio?,
        public 	idColaborador?,
        public  empresa?,
        public  cargo?,
        public 	ingreso?,
        public 	finalizacion?,
        public 	ciudad?,
    ) {}
}

@Component({
    moduleId: module.id,
    templateUrl: 'work-experience.component.html',
    selector: 'work-experience',
    providers:  [ConfirmationService]
})
export class WorkExperienceComponent {

    experience: Workexperience = new constructorExperience();
    dialogObjet: Workexperience = new constructorExperience();
    experiences: Workexperience[];

    constructor(private workExperienceService: WorkExperienceService,
                private router: Router,
                private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.workExperienceService.getAll().subscribe(
            fstudies => this.experiences = fstudies
        );
    }

    delete(f: Workexperience) {
        this.dialogObjet = f;
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que lo desea eliminar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.workExperienceService.delete( this.dialogObjet);
                this.experiences.splice(this.experiences.indexOf( this.dialogObjet), 1);
                this.dialogObjet = null;
            },
            reject: () => {
                this.dialogObjet = null;
            }
        });
    }

    detail(f: Workexperience) {
        this.router.navigate(['employees-work-experience/detail/'+f.idExperiencia]);
    }

    add() {
        this.router.navigate(['employees-work-experience/add']);
    }

    update(f: Workexperience) {
        this.router.navigate(['employees-work-experience/update/'+f.idExperiencia]);
    }
}
