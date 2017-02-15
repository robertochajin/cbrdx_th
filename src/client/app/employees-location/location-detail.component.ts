/**
 * Created by TracesMaker on 07/02/2017.
 */


import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { EmployeesLocation } from './employees-location';
import { LocationService } from './location.service';

import 'rxjs/add/operator/switchMap';

class ConstructorLocation implements EmployeesLocation {
    constructor(
        public idUbicacion,
        public NombreCiudad,
        public NombreDepartamento,
        public NombrePais,
        public Direccion,
        public Ciudad,
        public TipoDireccion,
        public TipoDireccionLabel,
        public Barrio,
        public CorreoElectronico,
        public Longitud,
        public Latitud,
        public ComoLlegar,
        public Celular,
        public Telefono
    ) {}
}


@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: 'location-detail.component.html',
})


export class LocationDetailComponent implements OnInit   {
    @Input()

    location: EmployeesLocation = new ConstructorLocation();

    constructor(
        private locationService: LocationService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        let este$ = this.route.params
            .switchMap((params: Params) => this.locationService.get(+params['id']));
        este$.subscribe(location => this.location = location);
    }

    goBack(): void {
        this.location.back();
    }
}

