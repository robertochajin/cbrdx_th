/**
 * Created by Angel on 16/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Noformalstudies} from './no-formal-studies';
import {AcademicEducationService} from './academic-education.service';
import {Observable} from 'rxjs/Observable';

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
    selector: 'academic-education-no-formal'
})
export class NoFormalStudiesComponent {

    study: Noformalstudies = new constructorNoFormal();
    nfstudies: Noformalstudies[];

    constructor(private academicEducationService: AcademicEducationService, private router: Router) {}

    ngOnInit() {
        this.academicEducationService.getAllNoFormal().subscribe(
            nfstudies => this.nfstudies = nfstudies
        );
        let prue = this.nfstudies;
    }

    delete(f: Noformalstudies) {
        this.academicEducationService.deleteNoFormal(f);
        this.nfstudies.splice(this.nfstudies.indexOf(f), 1);
        f = null;
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
