import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from './location.service';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { ConstructorEmployeesLocation } from './employees-location.constructor';
declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'add-location',
    templateUrl: 'location-form.component.html',
})

export class LocationAddComponent implements  OnInit {

    @Input()
    employLocation :ConstructorEmployeesLocation= new ConstructorEmployeesLocation();
    header = 'Agregando Ubicación';

    principalNomenclatureList: any;
    complementaryNomenclatureList: any;
    addressTypeList: any;
    selectedPrincipalNomenclature: String;
    selectedTipoDireccion: number;
    selectedCity: any;
    principalNomenclature: String;
    numberOne: String;
    numberTwo: String;
    complementaries:any;
    finalAddress: String;
    cityList: any;
    map: any;

    constructor(private locationService: LocationService,
                private router: Router,
                private location: Location) {

        this.complementaries = [{tipo: null, detalle: ''}];
    }

    ngOnInit() {
        this.locationService.getPrincipalNomenclatureList().subscribe(
            principalNomenclatureList => this.principalNomenclatureList = principalNomenclatureList
        );
        this.locationService.getComplementaryNomenclatureList().subscribe(
            complementaryNomenclatureList => this.complementaryNomenclatureList = complementaryNomenclatureList
        );
        this.locationService.getAddressTypeList().subscribe(
            addressTypeList => this.addressTypeList = addressTypeList
        );

        this.employLocation.colaborador = 1; /*ASIGNAR VALOR QUE VENGA EN NAVECAGION */
        var mapProp = {
            center: new google.maps.LatLng(7.125635, -73.122056),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById('ubicacionColaborador'), mapProp);
    }

    save() {
        this.employLocation.direccion = this.finalAddress;
        this.employLocation.tipoDireccion.idTipoDireccion = this.selectedTipoDireccion;
        this.locationService.add(this.employLocation)
            .subscribe(
                data => {
                    //this.location.back();
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
        this.employLocation.setCiudad(
            event.idCiudad
        );
        this.composeAddress();
    }

    composeAddress():void {
        this.finalAddress = '';
        this.finalAddress += this.selectedPrincipalNomenclature  === undefined ? '': this.selectedPrincipalNomenclature  + ' ';
        this.finalAddress += this.principalNomenclature  === undefined ? '': this.principalNomenclature  + ' # ';
        this.finalAddress += this.numberOne  === undefined ? '': this.numberOne  + ' - ';
        this.finalAddress += this.numberTwo === undefined ? '': this.numberTwo + ' ';

        if (this.finalAddress !== '' && this.selectedCity.nombreCiudad !== '' && this.selectedCity.nombreCiudad !== undefined ) {
            console.log(this.finalAddress + ' ' + this.selectedCity.nombreCiudad);
            let geocoder = new google.maps.Geocoder();

            const assingLocation = (l:any ,t:any) => {
                this.employLocation.latitud = l;
                this.employLocation.longitud = t;
            };
            geocoder.geocode({'address': this.finalAddress + ' ' + this.selectedCity.nombreCiudad},
                function (results:any, status:any) {
                if (status === google.maps.GeocoderStatus.OK) {
                    let latitude = results[0].geometry.location.lat();
                    let longitude = results[0].geometry.location.lng();

                    var latLng = new google.maps.LatLng(latitude, longitude);
                    var mapOptions = {
                        center: latLng,
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById('ubicacionColaborador'), mapOptions);
                    var marker = new google.maps.Marker({position: latLng, map: map});

                    assingLocation(latitude, longitude);
                } else {
                    console.log('Error : ' + status);
                }
            });

        }


        for (var c of this.complementaries){
            if(c.tipo !== null) {
                this.finalAddress += ' ' + c.tipo + ' ' + c.detalle + ' ';
            }
        }

    }

    addComplementary(): void {
        let complementary = {'tipo': 0, 'detalle': ''};
        this.complementaries.push(complementary);
    }

    removeComplementary(id:any): void {
        console.log(id);
        this.complementaries.splice(id,1);
    }
}
