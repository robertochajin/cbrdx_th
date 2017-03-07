import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { Location }                 from '@angular/common';
import {References} from './references';
import {ReferencesService} from './references.service';
import {SelectItem, Message, ConfirmDialog, ConfirmationService } from 'primeng/primeng';

import { ReferencesTypesServices } from '../_services/references-type.service';
import { CitiesServices } from '../_services/cities.service';
import {NavService}                 from '../_services/_nav.service';

@Component({
  moduleId: module.id,
  selector: 'references',
  templateUrl: 'references-form.component.html',
  providers:  [ConfirmationService]
})

export class ReferencesUpdateComponent implements OnInit  {
  @Input()

  reference: References = new References();
  header: string = 'Editanto Referencia';
  referencesTypes: SelectItem[] = [];
  cityList: any;
  submitted: boolean;
  copyAutocomplete: string;
  msgs: Message[] = [];

  constructor (
    private referencesService: ReferencesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private citiesServices: CitiesServices,
    private referencesTypesServices: ReferencesTypesServices,
    private confirmationService: ConfirmationService,
    private _nav:NavService

  ) {}

  ngOnInit () {
    this.referencesTypesServices.getAll().subscribe(referencesTypes => this.referencesTypes = referencesTypes);
    this.route.params
      .switchMap((params: Params) => this.referencesService.get(+params['id']))
      .subscribe(reference => {
        this.reference = reference;
        this.copyAutocomplete = this.reference.ciudad.label;

      });
    this.focusUP();
  }
  onSubmit() {

    if(this.copyAutocomplete != this.reference.ciudad.label){
      this.reference.ciudad = {value:null, label:''};
    }else{
      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});
      this.reference.primerNombre = this.capitalizeSave(this.reference.primerNombre);
      this.reference.segundoNombre = this.capitalizeSave(this.reference.segundoNombre);
      this.reference.primerApellido = this.capitalizeSave(this.reference.primerApellido);
      this.reference.segundoApellido = this.capitalizeSave(this.reference.segundoApellido);

      this.referencesService.update(this.reference)
        .subscribe(
          data => {
            this._nav.setTab(5);
            this.location.back();
          });
    }
  }

  citySearch(event:any) {
    this.citiesServices.getAllCities(event.query).subscribe(
      cities => this.cityList = cities
    );
  }

  captureCityId(event:any) {
    this.reference.ciudad.value = event.value;
    this.reference.ciudad.label = event.label;
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
}


