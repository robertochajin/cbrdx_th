import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

export class ReferencesAddComponent implements OnInit  {
    @Input()

    reference: References = new References();
    header: string = 'Agregando Referencia';
    referencesTypes: SelectItem[] = [];
    cityList: any;
    submitted: boolean;
    msgs: Message[] = [];

    constructor (
        private referencesService: ReferencesService,
        private router: Router,
        private location: Location,
        private citiesServices: CitiesServices,
        private referencesTypesServices: ReferencesTypesServices,
        private confirmationService: ConfirmationService,

    ) {}

    ngOnInit () {
        this.referencesTypesServices.getAll().subscribe(referencesTypes => this.referencesTypes = referencesTypes);
    }
    onSubmit() {

      this.submitted = true;
      this.msgs = [];
      this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});
      this.referencesService.add(this.reference)
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
}


