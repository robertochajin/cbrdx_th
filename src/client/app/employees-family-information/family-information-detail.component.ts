import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FamilyInformationService } from './family-information.service';
import { ConstructorFamilyInformation } from './family-information.construct';
import { NavService } from '../_services/_nav.service';
import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: './family-information-detail.component.html',
})


export class FamilyInformationDetailComponent implements OnInit   {
    @Input()

    familyInformation: ConstructorFamilyInformation = new ConstructorFamilyInformation();

    constructor(
        private familyInformationService: FamilyInformationService,
        private route: ActivatedRoute,
        private location: Location,
        private _nav:NavService
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.familyInformationService.get(+params['id']))
            .subscribe(familyInformation => { this.familyInformation = familyInformation });
    }

    goBack(): void {
        this._nav.setTab(1);
        this.location.back();
    }
}

