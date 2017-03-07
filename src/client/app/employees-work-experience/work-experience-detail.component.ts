

import {Workexperience} from './work-experience';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {Workexperience} from './work-experience';
import {WorkExperienceService} from './work-experience.service';

import {CompanySectorService} from "../_services/company-sector.service";
import {CompanySubSectorService} from "../_services/company-sub-sector.service";
import {CitiesServices} from "../_services/cities.service";

import 'rxjs/add/operator/switchMap';



@Component({
    moduleId: module.id,
    selector: 'work-experience',
    templateUrl: 'work-experience-detail.component.html',
})


export class WorkExperienceDetailComponent implements OnInit   {
    @Input()

    experience: Workexperience = new Workexperience();
  private companySectorList: any;
  private companySubSectorList: any;
  private cityList: any;

    constructor(
        private workExperienceService: WorkExperienceService,
        private route: ActivatedRoute,
        private location: Location,
        private companySectorService: CompanySectorService,
        private companySubSectorService: CompanySubSectorService,
        private citiesServices: CitiesServices,
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

