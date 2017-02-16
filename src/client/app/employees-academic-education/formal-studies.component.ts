/**
 * Created by Angel on 14/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Formalstudies} from './formal-studies';
import {AcademicEducationService} from './academic-education.service';
import {Observable} from 'rxjs/Observable';

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
    selector: 'academic-education-formal'
})
export class FormalStudiesComponent {

    fstudy: Formalstudies = new constructorFormal();
    fstudies: Formalstudies[];

    constructor(private academicEducationService: AcademicEducationService, private router: Router) {}

    ngOnInit() {
        this.academicEducationService.getAllFormal().subscribe(
            fstudies => this.fstudies = fstudies
        );
    }

    delete(f: Formalstudies) {
        this.academicEducationService.deleteFormal(f);
        this.fstudies.splice(this.fstudies.indexOf(f), 1);
        f = null;
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
