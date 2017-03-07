import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit, } from '@angular/core';
import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {constructorFamilyInformation} from './family-information.construct';
import {SelectItem, ConfirmationService, Message} from 'primeng/primeng';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import * as moment from 'moment/moment';
import {NavService}                 from '../_services/_nav.service';

@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: 'family-information-form.component.html',
    providers:  [ConfirmationService]
})

export class FamilyInformationUpdateComponent implements OnInit{
    @Input()
    familyInformation:  FamilyInformation = new constructorFamilyInformation;
    header: string = 'Editando Familiar';
    documentTypes: SelectItem[] = [];
    relationship: SelectItem[] = [];
    selectedDocument: any;
    selectedRelationship: any;
    msgs: Message[] = [];
    familyform: FormGroup;
    submitted: boolean;
    maxDate:Date = null;
    minDate:Date = null;
    es: any;
    range: string;

    constructor(
        private familyInformationService: FamilyInformationService,
        private route: ActivatedRoute,
        private location: Location,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private _nav:NavService

    ) {}
    ngOnInit(): void {
      this.es = {
        firstDayOfWeek: 1,
        dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        dayNamesMin: [ "D","L","M","X","J","V","S" ],
        monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
      };
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let last18Year = year-18;
        let lastYear = year-100;
        this.maxDate = new Date();
        this.maxDate.setMonth(month);
      this.maxDate.setFullYear(year);
      this.minDate = new Date();
      this.minDate.setMonth(1);
      this.minDate.setFullYear(lastYear);
      this.range = `${lastYear}:${year}`;

        this.familyform = this.fb.group({
          'tipoDeDocumento': new FormControl('', Validators.required),
          'numeroDeDocumento': new FormControl('', Validators.required),
          'primerNombre': new FormControl('', Validators.required),
          'segundoNombre': new FormControl(''),
          'primerApellido': new FormControl('', Validators.required),
          'segundoApellido': new FormControl(''),
          'fechadeNacimiento': new FormControl('', Validators.compose([Validators.required])),
          'correoElectronico': new FormControl('', Validators.compose([Validators.required])),
          'parentesco': new FormControl('', Validators.required),
          'telefono1': new FormControl('', Validators.required),
          'telefono2': new FormControl(''),
          'direccionDeResidencia': new FormControl('', Validators.required),
          'convive': new FormControl('')
        });
        this.familyInformationService.getDocumentType().subscribe(
            documentTypes => this.documentTypes = documentTypes
        );
        this.familyInformationService.getRelationship().subscribe(
            relationship => this.relationship = relationship
        );
        this.route.params
            .switchMap((params: Params) => this.familyInformationService.get(+params['id']))
            .subscribe(
                familyInformation => {
                    this.familyInformation = familyInformation;
                    this.selectedDocument = this.familyInformation.tipoDeDocumento.value;
                    this.selectedRelationship = this.familyInformation.parentesco.value;
                    if(this.selectedDocument==1 || this.selectedDocument == 2){
                      this.maxDate.setFullYear(last18Year);
                      this.range = `${lastYear}:${last18Year}`;
                    }

                });
        this.focusUP();

    }

    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});
        this.familyform.value.idFamiliar = this.familyInformation.idFamiliar;
        this.familyform.value.primerNombre = this.capitalizeSave(this.familyform.value.primerNombre);
        this.familyform.value.segundoNombre = this.capitalizeSave(this.familyform.value.segundoNombre);
        this.familyform.value.primerApellido = this.capitalizeSave(this.familyform.value.primerApellido);
        this.familyform.value.segundoApellido = this.capitalizeSave(this.familyform.value.segundoApellido);

        this.familyInformationService.update(this.familyform.value)
          .subscribe(
            data => {
              this._nav.setTab(1);
              this.location.back();
            },
            error => {
            });
    }


    goBack(): void {
        this.confirmationService.confirm({
            message: ` ¿Esta seguro que desea Cancelar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
                this._nav.setTab(1);
                this.location.back();
            },
            reject: () => {
            }
        });
    }

  onSelectMethod(event:any) {
    let d = new Date(Date.parse(event));
    this.familyInformation.fechadeNacimiento = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
  }

  // onBlurMethod(event) {
  //   let inp = event.target.value;
  //   inp = this.strToDate(inp);
  //
  //   if(inp!= "" && inp != null && !isNaN(inp)) {
  //     let d = new Date(inp);
  //     this.familyInformation.fechadeNacimiento = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  //   }else{
  //     this.familyInformation.fechadeNacimiento = '';
  //   }
  // }

  onChangeMethod(event:any) {

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prev18Year =  year - 18;
    let prev20Year =  year - 20;
    let lastYear =  prev18Year - 80;
    this.maxDate = new Date();
    this.maxDate.setMonth(month);

    if(event.value ==1 || event.value == 2){
      this.maxDate.setFullYear(prev18Year);
      this.range = `${lastYear}:${prev18Year}`;
    }else{
      this.maxDate.setFullYear(year);
      this.range = `${prev20Year}:${year}`;
    }

    if((this.familyInformation.fechadeNacimiento)== null || (this.familyInformation.fechadeNacimiento)== "" ){
      //this.familyInformation.fechadeNacimiento = `${this.maxDate.getMonth()+1}/${this.maxDate.getDate()}/${this.maxDate.getFullYear()}`
    }else{
      let timestamp2 = new Date(this.maxDate).getTime();
      let timestamp1 = new Date(this.familyInformation.fechadeNacimiento).getTime();
      let timeDiff = Math.round(timestamp2 - timestamp1);
      if(timeDiff< 0){
        this.familyInformation.fechadeNacimiento = "";
      }
    }

  }

  strToDate(newDateString: string): Date {
    if (newDateString) {
      let mom: moment.Moment = moment(newDateString, 'MM/DD/YYYY');
      if (mom.isValid()) {
        return mom.toDate();
      }
    }
    return null;
  }

  capitalize(event:any) {
    let input = event.target.value;
    event.target.value = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
  }

  capitalizeSave(input :any) {
    return input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
  }
  focusUP(){
    const element = document.querySelector("#formulario");
    if (element) { element.scrollIntoView(element); }
  }

}
