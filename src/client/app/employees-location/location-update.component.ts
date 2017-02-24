import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ConstructorEmployeesLocation } from './employees-location.constructor';
import { LocationService } from './location.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location } from '@angular/common';
declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'update-location',
    templateUrl: 'location-form.component.html',
})

export class LocationUpdateComponent implements OnInit {
    @Input()
    employLocation: ConstructorEmployeesLocation = new ConstructorEmployeesLocation();
    titulo = 'Editanto Ubicación ';

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

    constructor(
        private locationService: LocationService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location

    ) {}
    ngOnInit(): void {
        this.locationService.getPrincipalNomenclatureList().subscribe(
            principalNomenclatureList => this.principalNomenclatureList = principalNomenclatureList
        );
        this.locationService.getComplementaryNomenclatureList().subscribe(
            complementaryNomenclatureList => this.complementaryNomenclatureList = complementaryNomenclatureList
        );
        this.locationService.getAddressTypeList().subscribe(
            addressTypeList => this.addressTypeList = addressTypeList
        );

        this.route.params
            .switchMap((params: Params) => this.locationService.get(+params['id']))
            .subscribe(employeeLocation => this.employLocation = employeeLocation);

        this.complementaries = [{tipo: null, detalle: ''}];

        this.employLocation.colaborador = 1; /*ASIGNAR VALOR QUE VENGA EN NAVECAGION */
    }

    ngAfterViewInit() {
        this.employLocation.latitud = this.employLocation.latitud === '' ? '7.125635':this.employLocation.latitud;
        this.employLocation.longitud = this.employLocation.longitud === '' ?  '-73.122056':this.employLocation.longitud;
        var mapProp = {
            center: new google.maps.LatLng(),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById('ubicacionColaborador'), mapProp);
    }


    save() {
        this.employLocation.direccion = this.finalAddress;
        this.employLocation.tipoDireccion.idTipoDireccion = this.selectedTipoDireccion;
        this.locationService.update(this.employLocation)
            .subscribe(
                data => {
                    this.location.back();
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
