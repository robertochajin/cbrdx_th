/**
 * Created by Angel on 14/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';
import {Observable} from 'rxjs/Observable';

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
    selector: 'academic-education-formal'
})
export class WorkExperienceComponent {

    experience: Workexperience = new constructorExperience();
    experiences: Workexperience[];

    constructor(private workExperienceService: WorkExperienceService, private router: Router) {}

    ngOnInit() {
        this.workExperienceService.getAll().subscribe(
            fstudies => this.experiences = fstudies
        );
    }

    delete(f: Workexperience) {
        this.workExperienceService.delete(f);
        this.experiences.splice(this.experiences.indexOf(f), 1);
        f = null;
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
