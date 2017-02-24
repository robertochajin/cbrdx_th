import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocationService } from './location.service';
import { ConstructorEmployeesLocation } from './employees-location.constructor';


@Component({
    moduleId: module.id,
    templateUrl: 'location.component.html',
    selector: 'employees-locations'
})
export class LocationComponent implements OnInit {

    employeesLocations: ConstructorEmployeesLocation[];

    constructor(private locationService: LocationService, private router: Router) {}

    ngOnInit() {
        this.locationService.getAll().subscribe(
            employeesLocations => this.employeesLocations = employeesLocations
        );
    }

    delete(l: ConstructorEmployeesLocation) {
        this.locationService.delete(l);
        this.employeesLocations.splice(this.employeesLocations.indexOf(l), 1);
        l = null;
    }

    detail(l: ConstructorEmployeesLocation) {
        this.router.navigate(['employees-location/detail/'+l.idUbicacion]);
    }

    add() {
        this.router.navigate(['employees-location/add']);
    }

    update(l: ConstructorEmployeesLocation) {
        console.log(l);
        this.router.navigate(['employees-location/update/'+l.idUbicacion]);
    }
}
