/**
 * Created by Angel on 14/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';
import {Observable} from 'rxjs/Observable';

class constructorFormal implements Workexperience {
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
    templateUrl: 'work-experience.component.html',
    selector: 'academic-education-formal'
})
export class WorkExperienceComponent {

    fstudy: Workexperience = new constructorFormal();
    fstudies: Workexperience[];

    constructor(private workExperienceService: WorkExperienceService, private router: Router) {}

    ngOnInit() {
        this.workExperienceService.getAll().subscribe(
            fstudies => this.fstudies = fstudies
        );
    }

    delete(f: Workexperience) {
        this.workExperienceService.delete(f);
        this.fstudies.splice(this.fstudies.indexOf(f), 1);
        f = null;
    }

    detail(f: Workexperience) {
        this.router.navigate(['employees-work-experience/detail/'+f.idEstudio]);
    }

    add() {
        this.router.navigate(['employees-work-experience/add']);
    }

    update(f: Workexperience) {
        this.router.navigate(['employees-work-experience/update/'+f.idEstudio]);
    }
}
