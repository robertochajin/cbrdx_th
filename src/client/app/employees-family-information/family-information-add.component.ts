import 'rxjs/add/operator/switchMap';
import {Component, Input,OnInit } from '@angular/core';
import {FamilyInformationService} from './family-information.service';
import {constructorFamilyInformation} from './family-information.construct';
import {SelectItem, ConfirmationService, Message} from 'primeng/primeng';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import {Router}  from '@angular/router';
import {Location}  from '@angular/common';
import * as moment from 'moment/moment';

@Component({
    moduleId: module.id,
    selector: 'family-information',
    templateUrl: 'family-information-form.component.html',
    providers:  [ConfirmationService]
})

export class FamilyInformationAddComponent implements OnInit {
    @Input()

    familyInformation: constructorFamilyInformation = new constructorFamilyInformation();
    header:String = 'Agregando Familiar';
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
        private router: Router,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private location: Location
    ) {}

    ngOnInit() {

      this.es = {
        firstDayOfWeek: 1,
        dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        dayNamesMin: [ "D","L","M","X","J","V","S" ],
        monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ]
      };
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
        this.familyInformation.segundoApellido = this.familyInformation.segundoNombre = '';

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let lasYear = year-80;
        this.maxDate = new Date();
        this.maxDate.setMonth(month);
        this.maxDate.setFullYear(year);
        this.range = `${lasYear}:${year}`;
        this.focusMe();

    }

    onSubmit(value: string) {
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Success', detail:'Guardando'});

        this.familyform.value.primerNombre = this.capitalizeSave(this.familyform.value.primerNombre);
        this.familyform.value.segundoNombre = this.capitalizeSave(this.familyform.value.segundoNombre);
        this.familyform.value.primerApellido = this.capitalizeSave(this.familyform.value.primerApellido);
        this.familyform.value.segundoApellido = this.capitalizeSave(this.familyform.value.segundoApellido);

        this.familyInformationService.add(this.familyform.value)
            .subscribe(
                data => {
                    this.location.back();
                    //this.router.navigate(['/employees-family-information']);
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
                this.router.navigate(['/employees-family-information']);
                //this.location.back();
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


      if(event.value==1 || event.value == 2){
          this.maxDate.setMonth(month);
          this.maxDate.setFullYear(prev18Year);
          this.range = `${lastYear}:${prev18Year}`;
      }else{
        this.maxDate.setMonth(month);
        this.maxDate.setFullYear(year);
        this.range = `${prev20Year}:${year}`;
      }

      if((this.familyInformation.fechadeNacimiento)== null || (this.familyInformation.fechadeNacimiento)== "" ){
        this.familyInformation.fechadeNacimiento = `${this.maxDate.getMonth()+1}/${this.maxDate.getDate()}/${this.maxDate.getFullYear()}`
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

  dateToStr(newDate: Date, format?: string): string {
    if (newDate && moment(newDate).isValid()) {
      if (format) {
        return moment(newDate).format(format);
      }
      return moment(newDate).format('MM/DD/YYYY');
    }
    // date vide ou incorrecte
    return '';
  }

  capitalize(event:any) {
    let input = event.target.value;
    event.target.value = input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
  }

  capitalizeSave(input:any) {
    return input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
  }
  focusMe(){
    const element = document.querySelector("#formulario");
    if (element) { element.scrollIntoView(element); }
  }

}
