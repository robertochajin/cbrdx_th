/**
 * Created by Angel on 14/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Noformalstudies} from './no-formal-studies';
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
class constructorNoformal implements Noformalstudies {
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
    template: 'academic-education.component.html',
    selector: 'academic-education'
})
export class AcademicEducationComponent {

    festudy: Formalstudies = new constructorFormal();
    nfestudy: Noformalstudies = new constructorNoformal();

    festudies: Formalstudies[];
    nfestudies: Noformalstudies[];

    constructor(private academiceducationService: AcademicEducationService, private router: Router) {}

    ngOnInit() {
        this.academiceducationService.getAll().subscribe(
            festudies => this.festudies = festudies
        );
        this.academiceducationService.getAll().subscribe(
            nfestudies => this.nfestudies = nfestudies
        );
    }

    delete(f: Formalstudies) {
        this.academiceducationService.delete(f);
        this.festudies.splice(this.festudies.indexOf(f), 1);
        f = null;
    }

    detail(f: Formalstudies) {
        this.router.navigate(['employees-references/detail/'+f.idEstudio]);
    }

    add() {
        this.router.navigate(['employees-references/add']);
    }

    update(f: Formalstudies) {
        this.router.navigate(['employees-references/update/'+f.idEstudio]);
    }
}
