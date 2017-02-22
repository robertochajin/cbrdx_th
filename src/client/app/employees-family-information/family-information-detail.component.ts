
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';
import {constructorFamilyInformation} from './family-information.construct';
import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: './family-information-detail.component.html',
})


export class FamilyInformationDetailComponent implements OnInit   {
    @Input()

    familyInformation: FamilyInformation = new constructorFamilyInformation();
    selectedDocument: string = "";
    selectedRelationship: string = "";
    este: string = "";

    constructor(
        private familyInformationService: FamilyInformationService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.familyInformationService.get(+params['id']));
        este$.subscribe(familyInformation => {
            this.familyInformation = familyInformation;
            this.selectedDocument = this.familyInformation.tipoDeDocumento.label;
            this.selectedRelationship = this.familyInformation.parentesco.label;

        });
    }

    goBack(): void {
        this.location.back();
    }
}

