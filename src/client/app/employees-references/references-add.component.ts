/**
 * Created by Angel on 14/02/2017.
 */
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {References} from './references';
import {ReferencesService} from './references.service';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import {date} from "gulp-util";
import {modelGroupProvider} from "@angular/forms/src/directives/ng_model_group";

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
    selector: 'references',
    templateUrl: 'references-form.component.html',
})

export class ReferencesAddComponent {
    @Input()
    reference: References = new constructorReferences();
    model: any = {};
    const titulo = 'Agregando Referencia';

    constructor(
        private referencesService: ReferencesService,
        private router: Router,
        private location: Location
    ) {}

    save() {

        this.referencesService.add(this.reference)
            .subscribe(
                data => {
                    //this.router.navigate(['/employees-family-information']);
                    this.location.back();
                },
                error => {
                });
    }

    goBack(): void {
        this.location.back();
    }
}