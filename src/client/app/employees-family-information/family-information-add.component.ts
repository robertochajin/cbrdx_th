/**
 * Created by Angel on 10/02/2017.
 */
import { Component, Input,OnInit } from '@angular/core';
import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';
import { Location }                 from '@angular/common';
import {constructorFamilyInformation} from './family-information.construct';

import 'rxjs/add/operator/switchMap';
import {SelectItem} from 'primeng/primeng';


@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: 'family-information-form.component.html',
})

export class FamilyInformationAddComponent implements OnInit {
    @Input()
    familyInformation: FamilyInformation = new constructorFamilyInformation();
    header:String = 'Agregando Familiar';
    documentTypes: SelectItem[] = [];
    selectedDocument: any;

    constructor(
        private familyInformationService: FamilyInformationService,
        private location: Location
    ) {}

    ngOnInit() {

       this.familyInformationService.getDocumentType().subscribe(
           documentTypes => this.documentTypes = documentTypes
        );
    }

    save() {

        this.familyInformationService.add(this.familyInformation)
            .subscribe(
                data => {
                    this.location.back();
                },
                error => {
                });
    }

    goBack(): void {
        this.location.back();
    }
}