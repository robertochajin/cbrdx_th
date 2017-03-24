import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import {References} from './references';
import {ReferencesService} from './references.service';
import {SelectItem, Message, ConfirmDialog, ConfirmationService } from 'primeng/primeng';

import { ReferencesTypesService } from '../_services/references-type.service';
import { CitiesServices } from '../_services/cities.service';
import {NavService}                 from '../_services/_nav.service';
import {Localizaciones} from "../_models/localizaciones";


@Component({
    moduleId: module.id,
    selector: 'references',
    templateUrl: 'references-form.component.html',
    providers:  [ConfirmationService]
})

export class ReferencesAddComponent implements OnInit  {
    @Input()
    reference: References = new References();

    localizacion: Localizaciones = new Localizaciones();
    header: string = 'Agregando Referencia';
    referencesTypes: SelectItem[] = [];
    cityList: any;
    submitted: boolean;
    msgs: Message[] = [];
    uploadedFiles: any[] = [];
    copyAutocomplete: string;
    addinglocation: boolean = true;

    constructor (
        private referencesService: ReferencesService,
        private router: Router,
        private location: Location,
        private citiesServices: CitiesServices,
        private referencesTypesServices: ReferencesTypesService,
        private confirmationService: ConfirmationService,
        private _nav:NavService

    ) {}

    ngOnInit () {
        this.referencesTypesServices.getAll().subscribe(referencesTypes => {
          this.referencesTypes.unshift({label:'seleccione', value:2});
          referencesTypes.forEach((x:any) => {
            this.referencesTypes.push({label:x.nombreListaTipoReferencias, value: x.codigoListaTipoReferencias});
          });
        });
        this.focusUP();
    }
    onSubmit() {
      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Guardando'});

      this.reference.primerNombre = this.capitalizeSave(this.reference.primerNombre);
      this.reference.segundoNombre = this.capitalizeSave(this.reference.segundoNombre);
      this.reference.primerApellido = this.capitalizeSave(this.reference.primerApellido);
      this.reference.segundoApellido = this.capitalizeSave(this.reference.segundoApellido);

      this.referencesService.add(this.reference)
        .subscribe(
          data => {
            this._nav.setTab(5);
            this.location.back();
          });
    }

    citySearch(event:any) {
      this.citiesServices.getAllCities(event.query).subscribe(
        cities => this.cityList = cities
      );
    }

    captureCityId(event:any) {
      this.copyAutocomplete = event.label
    }

    goBack(): void {
      this.confirmationService.confirm({
        message: ` ¿Esta seguro que desea Cancelar?`,
        header: 'Corfirmación',
        icon: 'fa fa-question-circle',
        accept: () => {
          this._nav.setTab(5);
          this.location.back();
        },
        reject: () => {
        }
      });
    }

    focusUP(){
      const element = document.querySelector("#formulario");
      if (element) { element.scrollIntoView(element); }
    }

    capitalize(event:any) {
      let input = event.target.value;
      event.target.value = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
    }

    capitalizeSave(input:any) {
      return input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
    }
    onUpload(event:any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    bindLocation(event: any){
      this.localizacion = event;
      this.reference.direccion = event.direccion;
      this.toggleform();
    }

    toggleform(){
      this.addinglocation = !this.addinglocation;
    }
}


