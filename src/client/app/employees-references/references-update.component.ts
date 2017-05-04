import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { Location } from '@angular/common';
import { References } from './references';
import { ReferencesService } from './references.service';
import { SelectItem, Message, ConfirmDialog, ConfirmationService } from 'primeng/primeng';

import { LocateService } from '../_services/locate.service';
import { NavService } from '../_services/_nav.service';
import { Localizaciones } from "../_models/localizaciones";
import {PoliticalDivisionService} from "../_services/political-division.service";
import {ListaService} from "../_services/lista.service";
import {ListaItem} from "../_models/listaItem";

@Component({
  moduleId: module.id,
  selector: 'update-references',
  templateUrl: 'references-form.component.html',
  providers:  [ConfirmationService]
})

export class ReferencesUpdateComponent implements OnInit  {
  @Input()
  reference: References = new References();
  localizacion: Localizaciones = new Localizaciones();
  header: string = 'Editanto Referencia';
  referencesTypes: SelectItem[] = [];
  submitted: boolean;
  msgs: Message[] = [];
  uploadedFiles: any[] = [];
  addinglocation: boolean = true;
  idTercero: number;

  constructor (
    private referencesService: ReferencesService,
    private route: ActivatedRoute,
    private location: Location,
    private locateService: LocateService,
    private politicalDivisionService: PoliticalDivisionService,
    private confirmationService: ConfirmationService,
    private listaService: ListaService,
    private _nav:NavService

  ) {}

  ngOnInit () {

     this.listaService.getMasterDetails('ListasTiposReferencias').subscribe(res => {
        this.referencesTypes.push({label: 'Seleccione', value: null});
        res.map((s: ListaItem) => {
           this.referencesTypes.push({label: s.nombre, value: s.idLista});
        });
     });
    this.route.params.subscribe((params: Params) => {
      this.idTercero = params['tercero'];
      this.referencesService.get(+params['id']).subscribe(reference => {
        this.reference = reference;
        this.locateService.getById(this.reference.idLocalizacion).subscribe(localizacion => {
          this.localizacion = localizacion;
          this.reference.direccion = localizacion.direccion;
          this.localizacion.locacion = {camino:'', idDivisionPolitica: null};
          this.politicalDivisionService.getLocation(localizacion.idDivisionPolitica).subscribe(ciudad => {
            this.localizacion.locacion.camino = ciudad.camino;
            this.localizacion.locacion.idDivisionPolitica = ciudad.idDivisionPolitica;
          });
        });
      });
    });
    this.focusUP();
  }
  onSubmit() {
    this.msgs = [];
    if(this.reference.direccion !== ''){
      this.submitted = true;

      this.localizacion.indicadorHabilitado = true;
      this.locateService.update(this.localizacion).subscribe(
        data => {
            this.reference.primerNombre = this.capitalizeSave(this.reference.primerNombre);
            this.reference.segundoNombre = this.capitalizeSave(this.reference.segundoNombre);
            this.reference.primerApellido = this.capitalizeSave(this.reference.primerApellido);
            this.reference.segundoApellido = this.capitalizeSave(this.reference.segundoApellido);
            this.reference.idTercero = this.idTercero;
            this.reference.indicadorHabilitado = true;
            this.referencesService.update(this.reference)
              .subscribe(
                data => {
                  this.msgs.push({severity: 'info', summary: 'Success', detail: 'Guardando'});
                  this._nav.setTab(8);
                  this.location.back();
                });
        }
      );

    } else {
      this.focusUP();
      this.msgs.push({severity: 'error', summary: 'Dirección invalida', detail: 'Es necesario agregar una dirección válida'});
    }
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


