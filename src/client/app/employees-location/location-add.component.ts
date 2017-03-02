import 'rxjs/add/operator/switchMap';
import {Component, Input,OnInit } from '@angular/core';
import {LocationService} from './location.service';
import {ConstructorEmployeesLocation} from './employees-location.constructor';
import {SelectItem, ConfirmationService, Message} from 'primeng/primeng';
import {Router}  from '@angular/router';
import {Location}  from '@angular/common';
declare let google: any;

@Component({
    moduleId: module.id,
    selector: 'add-location',
    templateUrl: 'location-form.component.html',
    providers:  [ConfirmationService]
})

export class LocationAddComponent implements  OnInit {

    @Input()
    employLocation :ConstructorEmployeesLocation= new ConstructorEmployeesLocation();
    header = 'Agregando Ubicación';

    principalNomenclatureList: any;
    complementaryNomenclatureList: any;
    addressTypeList: any;

    //selectedTipoDireccion: SelectItem[] = [];
    selectedPrincipalNomenclature: SelectItem[] = [];
    labelPrincipalNomenclature: String;
    //selectedCity: any[] = [{value: null, label : ''}];

    principalNomenclature: String;
    numberOne: String;
    numberTwo: String;

    complementaries:any;
    finalAddress: String;
    cityList: any;
    map: any;

    submitted: boolean;
    msgs: Message[] = [];

    constructor(
                private locationService: LocationService,
                private router: Router,
                private location: Location,
                private confirmationService: ConfirmationService
            ) {
        this.complementaries = [{tipo: null, detalle: ''}];
        this.employLocation.tipoDireccion.value
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
    }
    onSubmit(value: string) {
      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});

      this.employLocation.direccion = this.finalAddress;
      //this.employLocation.tipoDireccion.idTipoDireccion = this.selectedTipoDireccion;
      this.locationService.add(this.employLocation)
        .subscribe(
          data => {
            this.location.back();
          });
    }

    citySearch(event:any) {
      this.locationService.getAllCities(event.query).subscribe(
        cities => this.cityList = cities
      );
    }

    captureId(event:any) {
      this.employLocation.ciudad.value = event.value;
      this.employLocation.ciudad.label = event.label;
      this.composeAddress();
    }
    capturePrincipalNomenclature(event:any) {
      this.labelPrincipalNomenclature = event.originalEvent.srcElement.innerText.trim();
      this.composeAddress();
    }

    composeAddress():void {

      this.finalAddress = '';
      this.finalAddress += this.labelPrincipalNomenclature  === undefined ? '': this.labelPrincipalNomenclature  + ' ';
      this.finalAddress += this.principalNomenclature  === undefined ? '': this.principalNomenclature  + ' # ';
      this.finalAddress += this.numberOne  === undefined ? '': this.numberOne  + ' - ';
      this.finalAddress += this.numberTwo === undefined ? '': this.numberTwo + ' ';

      if (this.finalAddress !== '' && this.employLocation.ciudad.label !== '' && this.employLocation.ciudad.label !== undefined ) {
        //console.log(this.finalAddress + ' ' + this.employLocation.ciudad.label);
        let geocoder = new google.maps.Geocoder();

        const assingLocation = (l:any ,t:any) => {
          this.employLocation.latitud = l;
          this.employLocation.longitud = t;
        };
        geocoder.geocode({'address': this.finalAddress + ' ' + this.employLocation.ciudad.label},
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
      //console.log(id);
      this.complementaries.splice(id,1);
    }

    goBack(): void {
        this.location.back();
    }


}
