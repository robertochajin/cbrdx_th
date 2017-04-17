import 'rxjs/add/operator/switchMap';
import {Component, Input, OnInit} from '@angular/core';
import {FamilyInformationService} from './family-information.service';
import {ConstructorFamilyInformation} from './family-information.construct';
import {SelectItem, ConfirmationService, Message} from 'primeng/primeng';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import * as moment from 'moment/moment';
import {NavService} from '../_services/_nav.service';
import {Localizaciones} from "../_models/localizaciones";
import {LocateService} from "../_services/locate.service";
import {ListEmployeesService} from "../_services/lists-employees.service";
import {RelationTypeServices} from "../_services/relation-type.service";
import {Employee} from "../_models/employees";
import {EmployeesService} from "../_services/employees.service";

@Component({
  moduleId: module.id,
  selector: 'family-information',
  templateUrl: 'family-information-form.component.html',
  providers: [ConfirmationService]
})

export class FamilyInformationAddComponent implements OnInit {
  @Input()

  familyInformation: ConstructorFamilyInformation = new ConstructorFamilyInformation();
  localizacion: Localizaciones = new Localizaciones();
  terceroFamiliar: Employee = new Employee();
  header: String = 'Agregando Familiar';
  documentTypes: SelectItem[] = [];
  relationship: SelectItem[] = [];
  selectedDocument: any;
  selectedRelationship: any;
  idTercero: number;
  msgs: Message[] = [];
  convive: boolean;
  submitted: boolean;
  maxDate: Date = null;
  es: any;
  range: string;
  addinglocation: boolean = true;
  repeatedDocument: boolean = false;
  idTipoTercero: number;

  constructor(private familyInformationService: FamilyInformationService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private locateService: LocateService,
              private employeesService: EmployeesService,
              private relationTypeServices: RelationTypeServices,
              private listEmployeesService: ListEmployeesService,
              private confirmationService: ConfirmationService,
              private location: Location,
              private _nav: NavService) {
  }

  ngOnInit() {

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    };

    this.listEmployeesService.getDocumentTypes().subscribe(
      documentTypes => {
        this.documentTypes.push({label: 'Seleccione', value: null});
        documentTypes.map((s: any) => {
          this.documentTypes.push({label: s.nombreListaTipoDocumento, value: s.idListaTipoDocumento});
        });
      }
    );

    this.relationTypeServices.getAllEnabled().subscribe(
      relationship => {
        this.relationship.unshift({label: 'Seleccione', value: null});
        relationship.map((s: any) => {
          this.relationship.push({label: s.nombreListaParentesco, value: s.idListaParentesco});
        });
      }
    );

    this.familyInformation.idConvivencia = 0;
    this.route.params.subscribe((params: Params) => {
      this.idTercero = params['tercero'];
    });

    this.listEmployeesService.getTerType("TERFAM").subscribe(
      res => {
        this.idTipoTercero = res.idListaTipoTercero
      });

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let lasYear = year - 80;
    this.maxDate = new Date();
    this.maxDate.setMonth(month);
    this.maxDate.setFullYear(year);
    this.range = `${lasYear}:${year}`;
    this.focusUP();

  }

  onSubmit() {
    this.msgs = [];
    if (this.familyInformation.direccion !== '') {
      this.submitted = true;
      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Guardando'});

      this.locateService.add(this.localizacion).subscribe(
        data => {
          if (data.idLocalizacion) {

            this.terceroFamiliar.idTipoDocumento = this.selectedDocument;
            this.terceroFamiliar.numeroDocumento = this.familyInformation.numeroDocumento;
            this.terceroFamiliar.correoElectronico = this.familyInformation.correoElectronico;
            this.terceroFamiliar.telefonoFijo = this.familyInformation.telefonoFijo;
            this.terceroFamiliar.telefonoCelular = this.familyInformation.telefonoCelular;
            this.terceroFamiliar.primerNombre = this.capitalizeSave(this.familyInformation.primerNombre);
            this.terceroFamiliar.segundoNombre = this.capitalizeSave(this.familyInformation.segundoNombre);
            this.terceroFamiliar.primerApellido = this.capitalizeSave(this.familyInformation.primerApellido);
            this.terceroFamiliar.segundoApellido = this.capitalizeSave(this.familyInformation.segundoApellido);
            let mom: moment.Moment = moment(this.familyInformation.fechaNacimiento, 'MM/DD/YYYY');
            this.terceroFamiliar.fechaNacimiento = mom.format('YYYY-MM-DD');
            this.terceroFamiliar.indicadorHabilitado = true;
            this.terceroFamiliar.idTipoTercero = this.idTipoTercero;

            this.employeesService.add(this.terceroFamiliar)
              .subscribe(data2 => {

                this.familyInformation.idLocalizacion = data.idLocalizacion;
                this.familyInformation.idFamiliar = data2.idTercero;
                this.familyInformation.idTercero = this.idTercero;
                this.familyInformation.indicadorHabilitado = true;
                this.familyInformation.idParentesco = this.selectedRelationship;
                this.familyInformation.idConvivencia = this.convive ? 1: 0;

                this.familyInformationService.add(this.familyInformation)
                  .subscribe(
                    data => {

                      this.msgs.push({severity: 'info', summary: 'Success', detail: 'Guardando'});
                      this._nav.setTab(3);
                      this.location.back();
                    });
              });
          }
        });


    } else {
      this.focusUP();
      this.msgs.push({
        severity: 'error',
        summary: 'Dirección invalida',
        detail: 'Es necesario agregar una dirección válida'
      });
    }
  }

  goBack(): void {
    this.confirmationService.confirm({
      message: ` ¿Esta seguro que desea Cancelar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',
      accept: () => {
        this._nav.setTab(3);
        this.location.back();
      }
    });
  }

  onSelectMethod(event: any) {
    let d = new Date(Date.parse(event));
    this.familyInformation.fechaNacimiento = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

  onChangeMethod(event: any) {

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prev18Year = year - 18;
    let prev20Year = year - 20;
    let lastYear = prev18Year - 80;
    this.maxDate = new Date();


    if (this.selectedDocument === 1) {
      this.maxDate.setFullYear(prev18Year);
      this.range = `${lastYear}:${prev18Year}`;
    } else if (this.selectedDocument === 2) {
      this.range = `${prev18Year}:${year}`;
      this.maxDate.setFullYear(year);
      // this.minDate.setFullYear(last18Year);
    } else {
      this.maxDate.setFullYear(year);
      this.range = `${prev18Year}:${year}`;
    }

    if ((this.familyInformation.fechaNacimiento) === null || (this.familyInformation.fechaNacimiento) === '') {
      this.familyInformation.fechaNacimiento = `${this.maxDate.getMonth() + 1}/${this.maxDate.getDate()}/${this.maxDate.getFullYear()}`;
    } else {
      let timestamp2 = new Date(this.maxDate).getTime();
      let timestamp1 = new Date(this.familyInformation.fechaNacimiento).getTime();
      let timeDiff = Math.round(timestamp2 - timestamp1);
      if (timeDiff < 0) {
        this.familyInformation.fechaNacimiento = '';
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

  capitalize(event: any) {
    let input = event.target.value;
    event.target.value = input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
  }

  capitalizeSave(input: any) {
    if(input !== undefined){
      return input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
    } else {
      return ''
    }
  }

  bindLocation(event: any) {
    this.localizacion = event;
    this.familyInformation.direccion = event.direccion;
    this.toggleform();
  }

  toggleform() {
    this.addinglocation = !this.addinglocation;
  }

  focusUP() {
    const element = document.querySelector("#formulario");
    if (element) {
      element.scrollIntoView(element);
    }
  }

   validateDocument() {
      if(this.familyInformation.numeroDocumento !="" && this.familyInformation.numeroDocumento != null && this.selectedDocument != null){
         this.employeesService.validateDocument(this.familyInformation.numeroDocumento, this.selectedDocument).subscribe(res => {
            if(res.idTercero > 0) {
               this.repeatedDocument = true;
               this.familyInformation.numeroDocumento = '';
            }
         });
      }
   }
}
