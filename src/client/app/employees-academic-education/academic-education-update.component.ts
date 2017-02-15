/**
 * Created by Angel on 14/02/2017.
 */
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {References} from './no-formal-studies';
import {ReferencesService} from './academic-education.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

class constructorReferences implements References {
    constructor(
        public  idReferencia?,
        public	tipodeReferencia?,
        public	empresa?,
        public	primerNombre?,
        public	segundoNombre?,
        public	primerApellido?,
        public	segundoApellido?,
        public	ciudad?,
        public	telefono?,
        public	celular?,
        public	direccion?
    ) {}
}

@Component({
    moduleId: module.id,
    selector: 'reference',
    templateUrl: 'academic-education-form.component.html',
})

export class ReferencesUpdateComponent implements OnInit{
    reference: constructorReferences;
    const titulo = 'Editanto Familiar';

    constructor(
        private referencesService: ReferencesService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.referencesService.get(+params['id']))
            .subscribe(reference => this.reference = reference);
    }

    save() {

        this.referencesService.update(this.reference)
            .subscribe(
                data => {
                    //this.router.navigate(['/reference']);
                    this.location.back();
                },
                error => {
                });
    }
    goBack(): void {
        this.location.back();
    }

}
