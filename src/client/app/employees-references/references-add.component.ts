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
import {SelectItem} from 'primeng/primeng';

//Constructor
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
    header: string = 'Agregando Referencia';

    cities: SelectItem[];

    selectedCar: string = 'Paris';

    constructor (
        private referencesService: ReferencesService,
        private router: Router,
        private location: Location

    ) {
        this.cities = [];
        this.cities.push({label:'Select City', value:null});
        this.cities.push({label:'New York', value:{id:1, name: 'New York', code: 'NY'}});
        this.cities.push({label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}});
        this.cities.push({label:'London', value:{id:3, name: 'London', code: 'LDN'}});
        this.cities.push({label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}});
        this.cities.push({label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}});

        //this.selectedCar = '1'
       // this.cities.push({label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}});
    }

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


