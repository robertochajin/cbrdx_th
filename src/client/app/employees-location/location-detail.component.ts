/**
 * Created by TracesMaker on 07/02/2017.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { EmployeesLocation } from './employees-location';
import { LocationService } from './location.service';

import 'rxjs/add/operator/switchMap';

class ConstructorEmployeesLocation implements EmployeesLocation {
    constructor(
        public idUbicacion? : String,
        public nombreCiudad? : String,
        public nombreDepartamento? : String,
        public nombrePais? : String,
        public direccion? : String,
        public ciudad? : String,
        public tipoDireccion? : String,
        public tipoDireccionLabel? : String,
        public barrio? : String,
        public correoElectronico? : String,
        public longitud? : String,
        public latitud? : String,
        public comoLlegar? : String,
        public celular? : String,
        public telefono? : String
    ) {}
}


@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: 'location-detail.component.html',
})


export class LocationDetailComponent implements OnInit   {
    @Input()

    employeeLocation: EmployeesLocation = new ConstructorEmployeesLocation();

    constructor(
        private locationService: LocationService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.locationService.get(+params['id']));
        este$.subscribe(location => this.employeeLocation = location);
    }

    goBack(): void {
        this.location.back();
    }
}

