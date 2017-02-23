import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ConstructorEmployeesLocation } from './employees-location.constructor';
import { LocationService } from './location.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location } from '@angular/common';


@Component({
    moduleId: module.id,
    selector: 'family-information',
    template: 'location-form.component.html',
})

export class LocationUpdateComponent implements OnInit {
    employeeLocation: ConstructorEmployeesLocation = new ConstructorEmployeesLocation();

    titulo = 'Editanto Ubicación ';

    constructor(
        private locationService: LocationService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.locationService.get(+params['id']))
            .subscribe(employeeLocation => this.employeeLocation = employeeLocation);
    }

    save() {

        this.locationService.update(this.employeeLocation)
            .subscribe(
                data => {
                    this.location.back();
                });
    }

    goBack(): void {
        this.location.back();
    }

}
