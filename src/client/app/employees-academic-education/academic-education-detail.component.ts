/**
 * Created by Angel on 15/02/2017.
 */


import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {References} from './no-formal-studies';
import {ReferencesService} from './academic-education.service';

import 'rxjs/add/operator/switchMap';

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
    selector: 'academic-education',
    template: 'academic-education-detail.component.html',
})


export class ReferencesDetailComponent implements OnInit   {
    @Input()

    reference: References = new constructorReferences();

    constructor(
        private referencesService: ReferencesService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.referencesService.get(+params['id']));
        este$.subscribe(reference => this.reference = reference);
    }

    goBack(): void {
        this.location.back();
    }
}

