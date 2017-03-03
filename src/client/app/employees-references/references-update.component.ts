import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { Location }                 from '@angular/common';
import {References} from './references';
import {ReferencesService} from './references.service';
import {SelectItem, Message, ConfirmDialog, ConfirmationService } from 'primeng/primeng';

import { ReferencesTypesServices } from '../_services/references-type.service';
import { CitiesServices } from '../_services/cities.service';

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
  msgs: Message[] = [];

  constructor (
    private referencesService: ReferencesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private citiesServices: CitiesServices,
    private referencesTypesServices: ReferencesTypesServices,
    private confirmationService: ConfirmationService,

  ) {}

  ngOnInit () {
    this.referencesTypesServices.getAll().subscribe(referencesTypes => this.referencesTypes = referencesTypes);
    this.route.params
      .switchMap((params: Params) => this.referencesService.get(+params['id']))
      .subscribe(reference => this.reference = reference);
  }
  onSubmit() {

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
          this.location.back();
        });
  }

  citySearch(event:any) {
    this.citiesServices.getAllCities(event.query).subscribe(
      cities => this.cityList = cities
    );
  }

  captureCityId(event:any) {
    this.reference.ciudad.value = event.value;
    this.reference.ciudad.label = event.label;
  }

  goBack(): void {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea Cancelar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
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

  capitalize(event) {
    let input = event.target.value;
    event.target.value = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
  }

  capitalizeSave(input) {
    return input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
  }
}


