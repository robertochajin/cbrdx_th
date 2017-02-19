/**
 * Created by Angel on 10/02/2017.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {EmployeesLocation} from './employees-location';
import {LocationService} from './location.service';

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
    templateUrl: 'location.component.html',
    selector: 'employees-locations'
})
export class LocationComponent implements OnInit {

    employeesLocation: EmployeesLocation = new ConstructorEmployeesLocation();
    employeesLocations: EmployeesLocation[];

    constructor(private locationService: LocationService, private router: Router) {}

    ngOnInit() {
        this.locationService.getAll().subscribe(
            employeesLocations => this.employeesLocations = employeesLocations
        );
    }

    delete(l: EmployeesLocation) {
        this.locationService.delete(l);
        this.employeesLocations.splice(this.employeesLocations.indexOf(l), 1);
        l = null;
    }

    detail(l: EmployeesLocation) {
        this.router.navigate(['employees-employeeLocation/detail/'+l.idUbicacion]);
    }

    add() {
        this.router.navigate(['employees-employeeLocation/add']);
    }

    update(l: EmployeesLocation) {
        this.router.navigate(['employees-employeeLocation/update/'+l.idUbicacion]);
    }
}
