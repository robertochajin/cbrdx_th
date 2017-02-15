/**
 * Created by Angel on 10/02/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {EmployeesLocation} from './employees-location';
import {LocationService} from './location.service';

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
    templateUrl: 'location.component.html',
    selector: 'location'
})
export class LocationComponent {

    displayDialog: boolean;

    location: EmployeesLocation = new ConstructorLocation();

    locations: EmployeesLocation[];

    constructor(private locationService: LocationService, private router: Router) {}

    ngOnInit() {
        this.locationService.getAll().subscribe(
            locations => this.locations = locations
        );
    }

    delete(l: EmployeesLocation) {
        this.locationService.delete(l);
        this.locations.splice(this.locations.indexOf(l), 1);
        l = null;
    }

    detail(l: EmployeesLocation) {
        this.router.navigate(['employees-location/detail/'+l.idUbicacion]);
    }

    add() {
        this.router.navigate(['employees-location/add']);
    }

    update(l: EmployeesLocation) {
        this.router.navigate(['employees-location/update/'+l.idUbicacion]);
    }
}
