import 'rxjs/add/operator/switchMap';
import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Localizaciones } from '../_models/localizaciones';
import { SelectItem, ConfirmationService, Message, InputTextareaModule } from 'primeng/primeng';
import { Location } from '@angular/common';
import { PoliticalDivisionServices } from '../_services/political-division.service';
import { LocationService } from '../_services/employee-location.service';

declare let google: any;

@Component({
  moduleId: module.id,
  selector: 'locations',
  templateUrl: 'locations-form.component.html',
  providers: [PoliticalDivisionServices, ConfirmationService]
})

export class LocationsComponent implements OnInit {

  @Input()
  localizacion: Localizaciones = new Localizaciones();

  @Input()
  parentTitle: string;

  @Output()
  create: EventEmitter<Localizaciones> = new EventEmitter<Localizaciones>();

  tipoDireccion: {value: null, label: string};
  barrio: any;
  header = 'Agregando Ubicación';

  principalNomenclatureList: any;
  complementaryNomenclatureList: any;
  addressTypeList: any;
  lista: SelectItem[];
  listaTipoDireccion: SelectItem[];
  listaComplementary: SelectItem[];
  selectedPrincipalNomenclature: any;
  selectedAddressType: SelectItem[] = [];
  labelPrincipalNomenclature: string;
  copyAutocomplete: string;

  principalNomenclature: string;
  numberOne: string;
  numberTwo: string;

  complementaries: any;
  finalAddress: string;
  cityList: any;
  hoodList: any;
  map: any;

  submitted: boolean;
  msgs: Message[] = [];

  constructor(
    private location: Location,
    private politicalDivisionServices: PoliticalDivisionServices,
    private locationService: LocationService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute
  ) {
    this.complementaries = [{ tipo: null, detalle: '' }];
  }

  ngOnInit() {
    this.locationService.getPrincipalNomenclatureList().subscribe(
      principalNomenclatureList => {
        this.principalNomenclatureList = principalNomenclatureList;
        this.principalNomenclatureList.unshift({label:  'Seleccione', value:null});
      });
    this.locationService.getComplementaryNomenclatureList().subscribe(
      complementaryNomenclatureList => {
        this.complementaryNomenclatureList = complementaryNomenclatureList;
        this.complementaryNomenclatureList.unshift({label:  'Seleccione', value:null});
      });
    this.locationService.getAddressTypeList().subscribe(
      addressTypeList => {
        this.addressTypeList = addressTypeList;
        this.addressTypeList.unshift({label:  'Seleccione', value:null});
      });
    this.barrio = {value: null, label: ''};
  }

  onSubmit() {
    this.create.emit(this.localizacion);
    // this.submitted = true;
    // this.msgs = [];
    // this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Guardando' });
    // this.localizacion.direccion = this.finalAddress;
  }

  createLocation(){
    this.localizacion.direccion = this.finalAddress;
    this.create.emit(this.localizacion);
  }

  hoodSearch(event: any) {
    this.politicalDivisionServices.getHoodsByWildCard(event.query).subscribe(
      hoods => this.hoodList = hoods
    );
  }

  captureHoodId(event: any) {
    this.barrio.value = event.idDivisionPolitica;
    this.barrio.label = event.descripcionDivisionPolitica;
  }

  capturePrincipalNomenclature(label: any) {
    this.labelPrincipalNomenclature = label;
    this.composeAddress();
  }

  captureTipoDireccion(event: any) {
    this.tipoDireccion = event;
  }

  composeAddress(): void {

    this.finalAddress = '';
    this.finalAddress += this.labelPrincipalNomenclature === undefined ? '' : this.labelPrincipalNomenclature + ' ';
    this.finalAddress += this.principalNomenclature === undefined ? '' : this.principalNomenclature + ' # ';
    this.finalAddress += this.numberOne === undefined ? '' : this.numberOne + ' - ';
    this.finalAddress += this.numberTwo === undefined ? '' : this.numberTwo + ' ';

    if (this.finalAddress !== '' && this.barrio.label !== '' && this.barrio.label !== undefined) {
      //console.log(this.finalAddress + ' ' + this.barrio.label);
      let geocoder = new google.maps.Geocoder();

      const assingLocation = (l: any, t: any) => {
        this.localizacion.latitud = l;
        this.localizacion.longitud = t;
      };
      geocoder.geocode({ 'address': this.finalAddress + ' ' + this.barrio.label },
        function (results: any, status: any) {
          if (status === google.maps.GeocoderStatus.OK) {
            let latitude = results[0].geometry.location.lat();
            let longitude = results[0].geometry.location.lng();

            let latLng = new google.maps.LatLng(latitude, longitude);
            let mapOptions = {
              center: latLng,
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            let map = new google.maps.Map(document.getElementById('ubicacionColaborador'), mapOptions);
            let marker = new google.maps.Marker({ position: latLng, map: map });

            assingLocation(latitude, longitude);
          } else {
            console.log('Error : ' + status);
          }
        });

    }


    for (let c of this.complementaries) {
      if (c.tipo !== null) {
        switch (c.tipo) {
          case 1:
            this.finalAddress += ' Casa' + ' ' + c.detalle + ' ';
            break;
          case 2:
            this.finalAddress += ' Bloque' + ' ' + c.detalle + ' ';
            break;
          case 3:
            this.finalAddress += ' Apartamento' + ' ' + c.detalle + ' ';
            break;
        }
      }
    }

  }
  addComplementary(): void {
    let complementary = { 'tipo': 0, 'detalle': '' };
    this.complementaries.push(complementary);
  }

  removeComplementary(id: any): void {
    //console.log(id);
    this.complementaries.splice(id, 1);
  }

  goBack(): void {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea Cancelar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
      },
      reject: () => {
      }
    });
  }

  focusUP() {
    const element = document.querySelector("#formulario");
    if (element) { element.scrollIntoView(element); }
  }
}
