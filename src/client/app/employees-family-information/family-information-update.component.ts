import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit, } from '@angular/core';
import {FamilyInformation} from './family-information';
import {FamilyInformationService} from './family-information.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import {constructorFamilyInformation} from './family-information.construct';
import {SelectItem, ConfirmationService, Message} from 'primeng/primeng';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

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
    es: any;
    range: string;

    constructor(
        private familyInformationService: FamilyInformationService,
        private route: ActivatedRoute,
        private location: Location,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder

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
        let lastYear = year-50;
        this.maxDate = new Date();
        this.maxDate.setMonth(month);
        this.maxDate.setFullYear(year);
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

    }

    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});
        let pruena = this.familyform.value;
        this.familyform.value.idFamiliar = this.familyInformation.idFamiliar;
        this.familyInformationService.update(this.familyform.value)
          .subscribe(
            data => {
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
                this.location.back();
            },
            reject: () => {
            }
        });
    }

  onSelectMethod(event) {
    let d = new Date(Date.parse(event));
    this.familyInformation.fechadeNacimiento = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
  }

  onBlurMethod(event) {
    let inp = event.target.value;
    try{
      inp = Date.parse(inp);
    }catch (err){
      inp = "";
    }

    if(inp!= "" && inp != null && !isNaN(inp)) {
      let d = new Date(inp);
      this.familyInformation.fechadeNacimiento = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
    }else{
      this.familyInformation.fechadeNacimiento = '';
    }
  }

  onChangeMethod(event) {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prev18Year =  year - 18;
    let lastYear =  prev18Year - 50;
    this.maxDate = new Date();


    if(event.value==1 || event.value == 2){
      this.maxDate.setMonth(month);
      this.maxDate.setFullYear(prev18Year);
      this.range = `${lastYear}:${prev18Year}`;
    }else{
      this.maxDate.setMonth(month);
      this.maxDate.setFullYear(year);
      this.range = `${prev18Year}:${year}`;
    }
    if((this.familyInformation.fechadeNacimiento)== null || (this.familyInformation.fechadeNacimiento)== "" ){
      this.familyInformation.fechadeNacimiento = `${this.maxDate.getMonth()+1}/${this.maxDate.getDate()}/${this.maxDate.getFullYear()}`
    }

  }
  keyPressOnForm(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

}
