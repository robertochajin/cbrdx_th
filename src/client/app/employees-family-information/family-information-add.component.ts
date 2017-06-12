import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { FamilyInformationService } from './family-information.service';
import { ConstructorFamilyInformation } from './family-information.construct';
import { SelectItem, ConfirmationService, Message } from 'primeng/primeng';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment/moment';
import { NavService } from '../_services/_nav.service';
import { Localizaciones } from '../_models/localizaciones';
import { LocateService } from '../_services/locate.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { Employee } from '../_models/employees';
import { EmployeesService } from '../_services/employees.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               selector: 'family-information',
               templateUrl: 'family-information-form.component.html',
               providers: [ ConfirmationService ]
            } )

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
   cel: boolean = false;
   tel: boolean = false;

   constructor( private familyInformationService: FamilyInformationService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private locateService: LocateService,
      private employeesService: EmployeesService,
      private listEmployeesService: ListEmployeesService,
      private confirmationService: ConfirmationService,
      private listaService: ListaService,
      private location: Location,
      private _nav: NavService ) {
   }

   ngOnInit() {

      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre',
            'diciembre'
         ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };

      this.listaService.getMasterDetails( 'ListasTiposDocumentos' ).subscribe( res => {
         this.documentTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.documentTypes.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasParentescos' ).subscribe( res => {
         this.relationship.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.relationship.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.familyInformation.idConvivencia = 0;
      this.route.params.subscribe( ( params: Params ) => {
         this.idTercero = params[ 'tercero' ];
      } );

      this.listaService.getMasterDetailsByCode( 'ListasTiposTerceros', 'TERFAM' ).subscribe( res => {
         this.idTipoTercero = res.idLista;
      } );

      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let lasYear = year - 80;
      this.maxDate = new Date();
      this.maxDate.setMonth( month );
      this.maxDate.setFullYear( year );
      this.range = `${lasYear}:${year}`;
      this.focusUP();

   }

   onSubmit() {
      this.msgs = [];
      if ( this.familyInformation.direccion !== '' ) {
         this.submitted = true;
         this.locateService.add( this.localizacion ).subscribe(
            data => {
               if ( data.idLocalizacion ) {

                  this.terceroFamiliar.idTipoDocumento = this.selectedDocument;
                  this.terceroFamiliar.numeroDocumento = this.familyInformation.numeroDocumento;
                  this.terceroFamiliar.correoElectronico = this.familyInformation.correoElectronico;
                  this.terceroFamiliar.telefonoFijo = this.familyInformation.telefonoFijo;
                  this.terceroFamiliar.telefonoCelular = this.familyInformation.telefonoCelular;
                  this.terceroFamiliar.primerNombre = this.capitalizeSave( this.familyInformation.primerNombre );
                  this.terceroFamiliar.segundoNombre = this.capitalizeSave( this.familyInformation.segundoNombre );
                  this.terceroFamiliar.primerApellido = this.capitalizeSave( this.familyInformation.primerApellido );
                  this.terceroFamiliar.segundoApellido = this.capitalizeSave( this.familyInformation.segundoApellido );
                  this.terceroFamiliar.fechaNacimiento = this.familyInformation.fechaNacimiento;
                  this.terceroFamiliar.indicadorHabilitado = true;
                  this.terceroFamiliar.idTipoTercero = this.idTipoTercero;

                  this.employeesService.add( this.terceroFamiliar )
                  .subscribe( data2 => {

                     this.familyInformation.idLocalizacion = data.idLocalizacion;
                     this.familyInformation.idFamiliar = data2.idTercero;
                     this.familyInformation.idTercero = this.idTercero;
                     this.familyInformation.indicadorHabilitado = true;
                     this.familyInformation.idParentesco = this.selectedRelationship;
                     this.familyInformation.idConvivencia = this.convive ? 1 : 0;

                     this.familyInformationService.add( this.familyInformation )
                     .subscribe(
                        data => {
                           // 1:add 2:update 3:error
                           this._nav.setMesage( 1, this.msgs );
                           this._nav.setTab( 3 );
                           this.location.back();
                        } );
                  } );
               }
            } );

      } else {
         this.focusUP();
         this.msgs.push( {
                            severity: 'error',
                            summary: 'Dirección invalida',
                            detail: 'Es necesario agregar una dirección válida'
                         } );
      }
   }

   goBack( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Esta seguro que desea salir sin guardar?`,
                                              header: 'Corfirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this._nav.setTab( 3 );
                                                 this.location.back();
                                              }
                                           } );
      } else {
         this._nav.setTab( 3 );
         this.location.back();
      }

   }

   onChangeMethod( event: any ) {

      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prev18Year = year - 18;
      let prev20Year = year - 20;
      let lastYear = prev18Year - 80;
      this.maxDate = new Date();

      if ( this.selectedDocument === 1 ) {
         this.maxDate.setFullYear( prev18Year );
         this.range = `${lastYear}:${prev18Year}`;
      } else if ( this.selectedDocument === 2 ) {
         this.range = `${prev18Year}:${year}`;
         this.maxDate.setFullYear( year );
      } else {
         this.maxDate.setFullYear( year );
         this.range = `${prev18Year}:${year}`;
      }

   }

   strToDate( newDateString: string ): Date {
      if ( newDateString ) {
         let mom: moment.Moment = moment( newDateString, 'MM/DD/YYYY' );
         if ( mom.isValid() ) {
            return mom.toDate();
         }
      }
      return null;
   }

   dateToStr( newDate: Date, format?: string ): string {
      if ( newDate && moment( newDate ).isValid() ) {
         if ( format ) {
            return moment( newDate ).format( format );
         }
         return moment( newDate ).format( 'MM/DD/YYYY' );
      }
      // date vide ou incorrecte
      return '';
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   capitalizeSave( input: any ) {
      if ( input !== undefined ) {
         return input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      } else {
         return '';
      }
   }

   bindLocation( event: any ) {
      this.localizacion = event;
      this.familyInformation.direccion = event.direccion;
      this.toggleform();
   }

   toggleform() {
      this.addinglocation = !this.addinglocation;
   }

   focusUP() {
      jQuery( 'body' ).animate( { scrollTop: 0 }, 'fast' );
   }

   validateDocument() {
      if ( this.familyInformation.numeroDocumento !== '' &&
           this.familyInformation.numeroDocumento !== null &&
           this.selectedDocument !== null ) {
         this.employeesService.validateDocument( this.familyInformation.numeroDocumento, this.selectedDocument ).subscribe( res => {
            if ( res !== undefined && res.idTercero > 0 ) {
               this.confirmationService.confirm( {
                                                    message: `El tercero ya existe, desea relacionarlo como familiar?`,
                                                    header: 'Confirmación',
                                                    icon: 'fa fa-question-circle',
                                                    accept: () => {
                                                       this.familyInformation.primerNombre = res.primerNombre;
                                                       this.familyInformation.primerApellido = res.primerApellido;
                                                       this.familyInformation.segundoNombre = res.segundoNombre;
                                                       this.familyInformation.segundoApellido = res.segundoApellido;
                                                       this.familyInformation.fechaNacimiento = res.fechaNacimiento;
                                                       this.familyInformation.correoElectronico = res.correoElectronico;
                                                       this.familyInformation.telefonoFijo = res.telefonoFijo;
                                                       this.familyInformation.telefonoCelular = res.telefonoCelular;
                                                    },
                                                    reject: () => {
                                                       this.familyInformation.numeroDocumento = '';
                                                    }
                                                 } );
            }
         } );
      }
   }

   childInputCleanUp( value: string ) {
      this.familyInformation.telefonoFijo = value.toUpperCase().replace( /[^0-9]/g, '' ).replace( ' ', '' ).trim();
   }

   childInputCleanUp1( value: string ) {

      this.familyInformation.telefonoCelular = value.toUpperCase().replace( /[^0-9]/g, '' ).replace( ' ', '' ).trim();
   }

   inputCorreo() {
      if ( this.familyInformation.correoElectronico!==null && this.familyInformation.correoElectronico!== undefined) {
         this.familyInformation.correoElectronico= this.familyInformation.correoElectronico.toLowerCase();
      }
   }
}
