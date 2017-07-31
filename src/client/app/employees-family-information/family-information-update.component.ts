import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { FamilyInformationService } from './family-information.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ConstructorFamilyInformation } from './family-information.construct';
import { SelectItem, ConfirmationService, Message } from 'primeng/primeng';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment/moment';
import { NavService } from '../_services/_nav.service';
import { Localizaciones } from '../_models/localizaciones';
import { LocateService } from '../_services/locate.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { Employee } from '../_models/employees';
import { EmployeesService } from '../_services/employees.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { ConstanteService } from '../_services/constante.service';
import { LocationsNomenclaturesServices } from '../_services/locationsNomenclatures.service';

@Component( {
               moduleId: module.id,
               selector: 'family-information-update',
               templateUrl: 'family-information-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class FamilyInformationUpdateComponent implements OnInit {
   @Input()

   familyInformation: ConstructorFamilyInformation = new ConstructorFamilyInformation();
   localizacion: Localizaciones = new Localizaciones();
   terceroFamiliar: Employee = new Employee();
   header: string = 'Editando Familiar';
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
   idMayorDeEdad: number = 1;
   cel: boolean = false;
   tel: boolean = false;
   // Es necesario crear la constante y consultarla
   tiposdoc: string[] = [];
   mayeda: number = 0;
   listTypeDoc: ListaItem[] = [];

   constructor( private familyInformationService: FamilyInformationService,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private locateService: LocateService,
      private constanteService: ConstanteService,
      private employeesService: EmployeesService,
      private listEmployeesService: ListEmployeesService,
      private confirmationService: ConfirmationService,
      private politicalDivisionService: PoliticalDivisionService,
      private locationsNomenclaturesServices: LocationsNomenclaturesServices,
      private location: Location,
      private _nav: NavService ) {
   }

   ngOnInit(): void {
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
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let last18Year = year - 18;
      let lastYear = year - 100;
      this.maxDate = new Date();
      this.maxDate.setMonth( month );
      this.maxDate.setFullYear( year );
      this.range = `${lastYear}:${year}`;

      this.listaService.getMasterDetails( 'ListasTiposDocumentos' ).subscribe( res => {
         this.listTypeDoc = res;
         this.documentTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.documentTypes.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasParentescos' ).subscribe( res => {
         this.relationship.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.relationship.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetailsByCode( 'ListasTiposTerceros', 'TERFAM' ).subscribe(
         res => {
            this.idTipoTercero = res.idLista;
         } );
      // this.listEmployeesService.getTerType('TERFAM').subscribe(
      //   res => {
      //     this.idTipoTercero = res.idListaTipoTercero
      //   });

      this.familyInformation.idConvivencia = 0;
      this.route.params.subscribe( ( params: Params ) => {
         this.idTercero = params[ 'tercero' ];
      } );

      this.route.params.subscribe( ( params: Params ) => {
         this.idTercero = params[ 'tercero' ];
         this.familyInformationService.get( +params[ 'id' ] ).subscribe(
            familyInformation => {
               this.familyInformation = familyInformation;
               this.selectedDocument = this.familyInformation.idTipoDocumento;
               this.selectedRelationship = this.familyInformation.idParentesco;
               this.convive = this.familyInformation.idConvivencia === 1 ? true : false;
               if ( this.familyInformation.telefonoFijo !== null || this.familyInformation.telefonoFijo !== '' ) {
                  this.cel = true;
               } else {
                  this.cel = false;
               }
               if ( this.familyInformation.telefonoCelular !== null || this.familyInformation.telefonoCelular !== '' ) {
                  this.tel = true;
               } else {
                  this.tel = false;
               }

               if ( this.selectedDocument === this.idMayorDeEdad ) {
                  this.maxDate.setFullYear( last18Year );
                  this.range = `${lastYear}:${last18Year}`;
               } else {
                  this.range = `${last18Year}:${year}`;
                  this.maxDate.setFullYear( year );
               }

               this.employeesService.get( this.familyInformation.idFamiliar )
               .subscribe( terceroFamiliar => this.terceroFamiliar = terceroFamiliar );

               this.locateService.getById( this.familyInformation.idLocalizacion ).subscribe( localizacion => {
                  this.localizacion = localizacion;
                  this.familyInformation.direccion = localizacion.direccion;
                  this.localizacion.locacion = { camino: '', idDivisionPolitica: null };
                  this.politicalDivisionService.getLocation( localizacion.idDivisionPolitica ).subscribe( ciudad => {
                     this.localizacion.locacion.camino = ciudad.camino;
                     this.localizacion.locacion.idDivisionPolitica = ciudad.idDivisionPolitica;
                  } );
                  this.locationsNomenclaturesServices.getAllByLocalizacion( this.localizacion.idLocalizacion ).subscribe( lns => {
                     this.localizacion.listLN = lns;
                  } );
               } );

            } );
      } );

      this.focusUP();

      this.constanteService.getByCode( 'DOCMYE' ).subscribe( data => {
         if ( data.valor ) {
            for ( let c of data.valor.split( ',' ) ) {
               this.tiposdoc.push( c );
            }
         }
      } );
      this.constanteService.getByCode( 'MAYEDA' ).subscribe( data => {
         if ( data.valor ) {
            this.mayeda = Number( data.valor );
         }
      } );

   }

   onSubmit( value: string ) {
      this.submitted = true;
      this.msgs = [];
      if ( this.familyInformation.direccion !== '' ) {
         this.submitted = true;
         this.locateService.update( this.localizacion ).subscribe(
            data => {

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

               this.employeesService.update( this.terceroFamiliar )
               .subscribe( data2 => {

                  this.familyInformation.idTercero = this.idTercero;
                  this.familyInformation.indicadorHabilitado = true;
                  this.familyInformation.idParentesco = this.selectedRelationship;
                  this.familyInformation.idConvivencia = this.convive ? 1 : 0;
                  this.familyInformation.auditoriaFecha = '';
                  this.familyInformation.auditoriaUsuario = 1;

                  this.familyInformationService.update( this.familyInformation )
                  .subscribe(
                     data => {
                        // 1:add 2:update 3:error
                        this._nav.setMesage( 2, this.msgs );
                        this._nav.setTab( 3 );
                        this.location.back();
                     } );
               } );
            } );

      } else {
         this.focusUP();
         /* this.msgs.push( {
          severity: 'error',
          summary: 'Dirección invalida',
          detail: 'Es necesario agregar una dirección válida'
          } ); */
         this._nav.setMesage( 0,
                              { severity: 'error', summary: 'Dirección invalida', detail: 'Es necesario agregar una dirección válida' } );
      }
   }

   goBack( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
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

      this.familyInformation.fechaNacimiento = null;
      let tipodocfamili = this.listTypeDoc.find( x => x.idLista === this.selectedDocument );
      let codigo: string = '';
      if ( tipodocfamili ) {
         codigo = tipodocfamili.codigo;
      }
      let tipo = this.tiposdoc.find( t => t === codigo ); // buscar tipo documento elegido

      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prev18Year = year - this.mayeda;
      let prev20Year = year - 20;
      let lastYear = prev18Year - 80;
      this.maxDate = new Date();
      this.maxDate.setMonth( month );

      if ( tipo ) {
         this.maxDate.setFullYear( prev18Year );
         this.range = `${lastYear}:${prev18Year}`;
      } else {
         this.range = `${prev18Year}:${year}`;
         this.maxDate.setFullYear( year );
      }

      if ( (this.familyInformation.fechaNacimiento) !== null && (this.familyInformation.fechaNacimiento) !== undefined ) {
         let timestamp2 = new Date( this.maxDate ).getTime();
         let timestamp1 = new Date( this.familyInformation.fechaNacimiento ).getTime();
         let timeDiff = Math.round( timestamp2 - timestamp1 );
         if ( timeDiff < 0 ) {
            this.familyInformation.fechaNacimiento = null;
         }
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
      const element = document.querySelector( '#formulario' );
      if ( element ) {
         element.scrollIntoView( element );
      }
   }

   validateDocument() {
      if ( this.familyInformation.numeroDocumento !== '' &&
           this.familyInformation.numeroDocumento !== null &&
           this.selectedDocument !== null ) {
         this.employeesService.validateDocument( this.familyInformation.numeroDocumento, this.selectedDocument ).subscribe( res => {
            if ( res.idTercero > 0 ) {
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
      if ( this.familyInformation.correoElectronico !== null && this.familyInformation.correoElectronico !== undefined ) {
         this.familyInformation.correoElectronico = this.familyInformation.correoElectronico.toLowerCase();
      }
   }
}
