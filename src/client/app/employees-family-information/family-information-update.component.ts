import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import {FamilyInformation} from './family-information';
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
    @Input()
    familyInformation:  FamilyInformation = new constructorFamilyInformation;
    header: string = 'Editanto Familiar';
    documentTypes: SelectItem[] = [];
    relationship: SelectItem[] = [];
    selectedDocument: any;
    selectedRelationship: any;

    constructor(
        private familyInformationService: FamilyInformationService,
        private route: ActivatedRoute,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.familyInformationService.getDocumentType().subscribe(
            documentTypes => this.documentTypes = documentTypes
        );
        this.familyInformationService.getRelationship().subscribe(
            relationship => this.relationship = relationship
        );
        this.route.params
            .switchMap((params: Params) => this.familyInformationService.get(+params['id']))
            .subscribe(
                familyInformation => {
                    this.familyInformation = familyInformation;
                    this.selectedDocument = this.familyInformation.tipoDeDocumento.value;
                    this.selectedRelationship = this.familyInformation.parentesco.value;

                });

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

    onSelectMethod(event) {
        let d = new Date(Date.parse(event));
        this.familyInformation.fechadeNacimiento = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
    }

}
