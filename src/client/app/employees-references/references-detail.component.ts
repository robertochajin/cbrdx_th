import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {References} from './references';
import {ReferencesService} from './references.service';

import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'references',
    templateUrl: './references-detail.component.html',
})


export class ReferencesDetailComponent implements OnInit   {
    @Input()

    reference: References = new References();

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

