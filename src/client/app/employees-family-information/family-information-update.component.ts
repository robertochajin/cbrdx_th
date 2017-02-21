import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import {FamilyInformationService} from './family-information.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {constructorFamilyInformation} from './family-information.construct';
import {SelectItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: 'family-information-form.component.html',
})

export class FamilyInformationUpdateComponent implements OnInit{
    familyInformation: constructorFamilyInformation;
    header: string = 'Editanto Familiar';
    documentTypes: SelectItem[] = [];
    selectedDocument: any;

    constructor(
        private familyInformationService: FamilyInformationService,
        private route: ActivatedRoute,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.familyInformationService.getDocumentType().subscribe(
            documentTypes => this.documentTypes = documentTypes
        );
        this.route.params
            .switchMap((params: Params) => this.familyInformationService.get(+params['id']))
            .subscribe(familyInformation => this.familyInformation = familyInformation);
    }

    save() {

        this.familyInformationService.update(this.familyInformation)
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
