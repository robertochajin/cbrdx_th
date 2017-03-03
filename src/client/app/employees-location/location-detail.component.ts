import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { EmployeesLocation } from './employees-location';
import { LocationService } from './location.service';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: 'location-detail.component.html',
})


export class LocationDetailComponent implements OnInit   {
    @Input()
    employeeLocation: EmployeesLocation = new EmployeesLocation();

    constructor(
        private locationService: LocationService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.locationService.get(+params['id']))
            .subscribe(este => this.employeeLocation = este);
    }

    goBack(): void {
        this.location.back();
    }
}
