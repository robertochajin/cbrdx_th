import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { EmployeesLocation } from './employees-location';
import { LocationService } from './location.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location } from '@angular/common';

class ConstructorLocation implements EmployeesLocation {
    constructor(
        public idFamiliar?,
        public tipoDeDocumento?,
        public numeroDeDocumento?,
        public primerNombre?,
        public segundoNombre?,
        public primerApellido?,
        public segundoApellido?,
        public fechadeNacimiento?,
        public parentesco?,
        public correoElectronico?,
        public telefono1?,
        public telefono2?,
        public direccionDeResidencia?,
        public convive?
    ) {}
}

@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: 'location-form.component.html',
})

export class LocationUpdateComponent implements OnInit{
    location: ConstructorLocation;
    titulo = 'Editanto Familiar';

    constructor(
        private locationService: LocationService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.locationService.get(+params['id']))
            .subscribe(location => this.location = location);
    }

    save() {

        this.locationService.update(this.location)
            .subscribe(
                data => {
                    //this.router.navigate(['/employees-family-information']);
                    this.location.back();
                },
                error => {
                });
    }
    goBack(): void {
        this.location.back();
    }

}
