import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormalStudies } from './formal-studies';
import { AcademicEducationService } from './academic-education.service';

import 'rxjs/add/operator/switchMap';


@Component({
    moduleId: module.id,
    selector: 'academic-education',
    templateUrl: 'formal-studies-detail.component.html',
})


export class FormalStudiesDetailComponent implements OnInit   {
    @Input()

    study: FormalStudies = new FormalStudies();

    constructor(
        private academicEducationService: AcademicEducationService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.academicEducationService.getFormal(+params['id']));
        este$.subscribe(study => this.study = study);
    }

    goBack(): void {
        this.location.back();
    }
}

