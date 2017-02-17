/**
 * Created by TracesMaker on 08/02/2017.
 */
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesLocation } from './employees-location';
import { LocationService } from './location.service';
import { Location } from '@angular/common';
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

class ComplementaryNomenclature {
    public tipoNomenclatura = ['Casa', 'Edificio', 'Manzana', 'Torre'];
    public detalle : String;
}

@Component({
    moduleId: module.id,
    selector: 'add-location',
    templateUrl: 'location-form.component.html',
})

export class LocationAddComponent {
    @Input()
    employLocation: EmployeesLocation;
    model: any = {};
    header = 'Agregando Ubicación';

    tipoNomenclaturaPrincipal = ['Carrera','Calle','Diagonal','Avenida'];
    principalNomenclature: String;
    numberOne: String;
    numberTwo: String;
    complementary: ComplementaryNomenclature;
    complementaries: ComplementaryNomenclature[];
    suburb: String;
    latitude: number;
    longitude: number;
    howToGetThere: String;
    finalAddress: String;

    cityList: any;

    constructor(private locationService: LocationService,
                private router: Router,
                private location: Location) {
    }

    save() {

        this.locationService.add(this.employLocation)
            .subscribe(
                data => {
                    this.location.back();
                },
                error => {
                });
    }

    goBack(): void {
        this.location.back();
    }

    citySearch(event){
        this.locationService.getAllCities(event.query).subscribe(
            cities => this.cityList = cities
        );
    }

    captureId(event){

    }
}