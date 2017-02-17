/**
 * Created by TracesMaker on 08/02/2017.
 */
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesLocation } from './employees-location';
import { LocationService } from './location.service';
import { Location } from '@angular/common';
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

    principalNomenclatureList = ['Carrera','Calle','Diagonal','Avenida'];
    selectedPrincipalNomenclature: String;
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

    citySearch(event:any) {
        this.locationService.getAllCities(event.query).subscribe(
            cities => this.cityList = cities
        );
    }

    captureId(event:any) {
        return;
    }

    composeAddress():void {
        this.finalAddress = this.selectedPrincipalNomenclature + ' ' +
                            this.principalNomenclature + ' # ' +
                            this.numberOne + ' - ' +
                            this.numberTwo;
    }
}