import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { EmployeesLocation } from './employees-location';
import { LocationService } from './location.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location } from '@angular/common';

class ConstructorEmployeeLocation implements EmployeesLocation {
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
    templateUrl: 'location-form.component.html',
})

export class LocationUpdateComponent implements OnInit{
    employeeLocation: ConstructorEmployeeLocation;
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
            .subscribe(location => this.employeeLocation = location);
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
