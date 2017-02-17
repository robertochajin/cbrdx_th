/**
 * Created by Angel on 14/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {References} from './references';
import {ReferencesService} from './references.service';
import {Observable} from 'rxjs/Observable';

class constructorReferences implements References {
    constructor(
        public  idReferencia?,
        public	tipodeReferencia?,
        public	empresa?,
        public  nombreCompleto
        public	numeroContacto?,
        public	ciudad?
    ) {}
}

@Component({
    moduleId: module.id,
    templateUrl: 'references.component.html',
    selector: 'references'
})
export class ReferencesComponent {

    reference: References = new constructorReferences();

    references: References[];

    constructor(private referencesService: ReferencesService, private router: Router) {}

    ngOnInit() {
        this.referencesService.getAll().subscribe(
            references => this.references = references
        );
    }

    delete(f: References) {
        this.referencesService.delete(f);
        this.references.splice(this.references.indexOf(f), 1);
        f = null;
    }

    detail(f: References) {
        this.router.navigate(['employees-references/detail/'+f.idReferencia]);
    }

    add() {
        this.router.navigate(['employees-references/add']);
    }

    update(f: References) {
        this.router.navigate(['employees-references/update/'+f.idReferencia]);
    }
}
