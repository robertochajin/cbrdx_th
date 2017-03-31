import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Localizaciones } from '../_models/localizaciones';
import { SelectItem, ConfirmationService, Message, InputTextareaModule } from 'primeng/primeng';
import { Location } from '@angular/common';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { LocationService } from '../_services/employee-location.service';

declare let google: any;

@Component({
  moduleId: module.id,
  selector: 'locations',
  templateUrl: 'locations-form.component.html',
  providers: [PoliticalDivisionService, ConfirmationService]
})

export class LocationsComponent implements OnInit {

  @Input()
  localizacion: Localizaciones = new Localizaciones();

  @Input()
  parentTitle: string;

  @Output()
  create: EventEmitter<Localizaciones> = new EventEmitter<Localizaciones>();

  @Output()
  dismiss: EventEmitter<number> = new EventEmitter<number>();

  tipoDireccion: { value: null, label: string };
  principalNomenclatureList: any;
  complementaryNomenclatureList: any;
  addressTypeList: any;
  selectedPrincipalNomenclature: number;
  selectedAddressType: number;
  labelPrincipalNomenclature: string;
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
  badSelect: boolean = true;

  constructor(
    private location: Location,
    private politicalDivisionServices: PoliticalDivisionService,
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
        this.principalNomenclatureList.unshift({ label: 'Seleccione', value: null });
      });
    this.locationService.getComplementaryNomenclatureList().subscribe(
      complementaryNomenclatureList => {
        this.complementaryNomenclatureList = complementaryNomenclatureList;
        this.complementaryNomenclatureList.map((cn: any) => {
          cn.value = cn.label;
        });
        this.complementaryNomenclatureList.unshift({ label: 'Seleccione', value: null });
      });
    this.locationService.getAddressTypeList().subscribe(
      addressTypeList => {
        this.addressTypeList = addressTypeList;
        this.addressTypeList.unshift({ label: 'Seleccione', value: null });
      });

    this.finalAddress = this.localizacion.direccion;
    this.selectedAddressType = this.localizacion.idTipoDireccion;
    this.selectedPrincipalNomenclature = this.localizacion.nomenclaturaPrincipal;
  }

  createLocation() {
    this.localizacion.direccion = this.finalAddress;
    this.localizacion.idTipoDireccion = this.selectedAddressType;
    this.localizacion.nomenclaturaPrincipal = this.selectedPrincipalNomenclature;
    if(this.localizacion.locacion.idDivisionPolitica !== undefined){
      this.localizacion.idDivisionPolitica = this.localizacion.locacion.idDivisionPolitica;
      this.create.emit(this.localizacion);
    } else {
      this.badSelect = true;
      this.localizacion.locacion = null;
    }
  }

  hoodSearch(event: any) {
    this.politicalDivisionServices.getHoodsByWildCard(event.query).subscribe(
      hoods => this.hoodList = hoods
    );
  }

  captureHoodId(event: any) {
    this.localizacion.locacion.idDivisionPolitica = event.idDivisionPolitica;
    this.localizacion.locacion.camino = event.camino;
    this.localizacion.idDivisionPolitica = event.idDivisionPolitica;
    this.badSelect = false;
    this.composeAddress();
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

    if (this.finalAddress !== '' && this.localizacion.locacion != undefined && this.localizacion.locacion.camino !== '' && this.localizacion.locacion.camino !== undefined) {
      let geocoder = new google.maps.Geocoder();

      const assingLocation = (l: any, t: any) => {
        this.localizacion.latitud = l;
        this.localizacion.longitud = t;
      };

      //Asumiendo que el camino obtenido de la busqueda tiene un máximo de 4 níveles
      //Se hace el conteo de 3 comas par identificar si la selección fue de una división politica de nivel 4 (barrio/vereda)
      //para hacerle el tratamiento al string con el cual se hace la busqueda en el API de maps.google
      let strToSearch = '';
      if (((this.localizacion.locacion.camino.match(/,/g) || []).length) === 3) {
        strToSearch = this.localizacion.locacion.camino.substr(this.localizacion.locacion.camino.indexOf(','));
      } else {
        strToSearch = this.localizacion.locacion.camino;
      }
      geocoder.geocode({ 'address': this.finalAddress + ' ' + strToSearch },
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
            let map = new google.maps.Map(document.getElementById('graphMap'), mapOptions);
            let marker = new google.maps.Marker({ position: latLng, map: map });

            assingLocation(latitude, longitude);
          } else {
            document.getElementById('graphMap').innerHTML = "La busqueda no arroja ningun resultado";
            assingLocation('', '');
          }
        });
    }

    for (let c of this.complementaries) {
      if(c.detalle !== '' && c.tipo !== null){
        this.finalAddress += c.tipo + ' ' + c.detalle + ' ';
      }
    }

    if (this.localizacion.locacion !== undefined && this.localizacion.locacion.camino !== '' && this.localizacion.locacion.camino !== undefined) {
      this.finalAddress += this.localizacion.locacion.camino;
    }
  }

  addComplementary(): void {
    let complementary = { 'tipo': 0, 'detalle': '' };
    this.complementaries.push(complementary);
  }

  removeComplementary(id: any): void {
    this.complementaries.splice(id, 1);
  }

  discard(): void {
    this.dismiss.emit(1);
  }

  focusUP() {
    const element = document.querySelector("#formulario");
    if (element) { element.scrollIntoView(element); }
  }
}
