

import {Workexperience} from './work-experience';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';

import 'rxjs/add/operator/switchMap';



@Component({
    moduleId: module.id,
    selector: 'work-experience',
    templateUrl: 'work-experience-detail.component.html',
})


export class WorkExperienceDetailComponent implements OnInit   {
    @Input()

    experience: Workexperience = new Workexperience();

    constructor(
        private workExperienceService: WorkExperienceService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.workExperienceService.get(+params['id']));
        este$.subscribe(experience => this.experience = experience);
    }

    goBack(): void {
        this.location.back();
    }
}

