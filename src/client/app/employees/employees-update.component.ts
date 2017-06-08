import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../_models/employees';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { EmployeesService } from '../_services/employees.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { NavService } from '../_services/_nav.service';
import { Ocupaciones } from '../_models/ocupaciones';
import { OcupacionesService } from '../_services/ocupaciones.service';
import { ActividadEconomica } from '../_models/actividadEconomica';
import { ActividadEconomicaService } from '../_services/actividadEconomica.service';
import * as moment from 'moment/moment';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               selector: 'employees-form',
               templateUrl: 'employees-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class EmployeesUpdateComponent implements OnInit {
   @Input()
   employee: Employee = new Employee();
   header: string = 'Agregando Colaborador';

   personTypes: SelectItem[] = [];
   documentTypes: SelectItem[] = [];
   resultExpeditionCity: DivisionPolitica[];
   resultBirthPlace: DivisionPolitica[] = [];
   ciudadExpDocumento: string;
   backupCiudadExpDocumento: string;
   ciudadNacimiento: string;
   backupCiudadNacimiento: string;
   genderTypes: SelectItem[] = [];
   maritalStatusTypes: SelectItem[] = [];
   rhRactorTypes: SelectItem[] = [];
   healthTypes: SelectItem[] = [];
   occupationsTypes: SelectItem[] = [];
   academicLevelTypes: SelectItem[] = [];
   affiliationTypes: SelectItem[] = [];
   juridicos: SelectItem[] = [];
   sector: SelectItem[] = [];
   activities: SelectItem[] = [];
   occupations: SelectItem[] = [];
   legalStatusTypes: SelectItem[] = [];
   listadoOcupaciones: Ocupaciones[];
   listadoActividadEconomica: ActividadEconomica[];
   msgs: Message[] = [];
   today: Date = null;
   maxDate: Date = null;
   maxDateDocumento: Date = null;
   range: string;
   es: any;
   expeditionDate: string;
   birthDate: string;
   deathDate: string;
   idTipoTercero: number;

   constructor( private employeesService: EmployeesService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private listaService: ListaService,
      private listEmployeesService: ListEmployeesService,
      private politicalDivisionService: PoliticalDivisionService,
      private actividadEconomicaService: ActividadEconomicaService,
      private ocupacionesService: OcupacionesService,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {

      listaService.getMasterDetails( 'ListasTiposPersonas' ).subscribe( res => {
         this.personTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.personTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasEstadosJuridicos' ).subscribe( res => {
         this.juridicos.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.juridicos.push( { label: s.nombre, value: s.idLista } );
         } );
         this.employee.idTipoDocumento = null;
      } );

      this.listaService.getMasterDetails( 'ListasGeneros' ).subscribe( res => {
         this.genderTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.genderTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasEstadosCiviles' ).subscribe( res => {
         this.maritalStatusTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.maritalStatusTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasFactoresRH' ).subscribe( res => {
         this.rhRactorTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.rhRactorTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasCoberturasSalud' ).subscribe( res => {
         this.healthTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.healthTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasTiposOcupaciones' ).subscribe( res => {
         this.occupationsTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.occupationsTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasNivelesEstudios' ).subscribe( res => {
         this.academicLevelTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.academicLevelTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasTiposAfiliacion' ).subscribe( res => {
         this.affiliationTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.affiliationTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.actividadEconomicaService.listByPadre( 0 ).subscribe( res => {
         this.sector.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.sector.push( {
                                 label: dp.actividadEconomica,
                                 value: dp.idActividadEconomica
                              } );
         }
      } );

      this.ocupacionesService.listByNivel( 4 ).subscribe( res => {
         this.occupations.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.occupations.push( {
                                      label: dp.ocupacion,
                                      value: dp.idOcupacion
                                   } );
         }
      } );

      this.listaService.getMasterDetailsByCode( 'ListasTiposTerceros', 'TERCOL' ).subscribe(
         res => {
            this.idTipoTercero = res.idLista;
         } );

   }

   ngOnInit() {
      this.listaService.getMasterDetails( 'ListasTiposDocumentos' ).subscribe( res => {
         this.documentTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.documentTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.route.params
      .switchMap( ( params: Params ) => this.employeesService.get( +params[ 'id' ] ) )
      .subscribe( employee => {
         this.employee = employee;
         this.updateActivities( this.employee.idSectorEconomico );

         this.ciudadExpDocumento = this.employee.ciudadExpDocumento;
         this.backupCiudadExpDocumento = this.employee.ciudadExpDocumento;
         this.ciudadNacimiento = this.employee.ciudadNacimiento;
         this.backupCiudadNacimiento = this.employee.ciudadNacimiento;
      } );

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
      let lasYear = year - 80;
      this.maxDate = new Date();
      this.maxDate.setMonth( month );
      this.maxDate.setFullYear( year );
      this.today = new Date();
      this.today.setMonth( month );
      this.today.setFullYear( year );
      this.maxDateDocumento = new Date();
      this.maxDateDocumento.setMonth( month );
      this.maxDateDocumento.setFullYear( year );
      this.employee.indicadorHabilitado = true;
      this.employee.indicadorVivo = true;
      this.employee.idTipoOcupacion = 1;
      this.range = `${lasYear}:${year}`;
      this.focusUP();
   }

   onSubmit() {
      this.focusUP();
      if ( this.ciudadExpDocumento !== this.backupCiudadExpDocumento ) {
         this.ciudadExpDocumento = '';
         this.employee.ciudadExpDocumento = '';
      }
      if ( this.ciudadNacimiento !== this.backupCiudadNacimiento ) {
         this.ciudadNacimiento = '';
         this.employee.ciudadNacimiento = '';
      }
      if ( this.ciudadExpDocumento === this.backupCiudadExpDocumento && this.ciudadNacimiento === this.backupCiudadNacimiento ) {
         this.msgs = [];
         this.employee.primerNombre = this.capitalizeSave( this.employee.primerNombre );
         this.employee.segundoNombre = this.capitalizeSave( this.employee.segundoNombre );
         this.employee.primerApellido = this.capitalizeSave( this.employee.primerApellido );
         this.employee.segundoApellido = this.capitalizeSave( this.employee.segundoApellido );

         this.employee.idTipoTercero = this.idTipoTercero;

         this.employeesService.update( this.employee )
         .subscribe( data => {
            this._nav.setMesage( 2, this.msgs );
            this.location.back();
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      }
   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this._nav.setTab( 0 );
                                              this.location.back();
                                           }
                                        } );
   }

   searchExpeditionCity( event: any ) {
      this.politicalDivisionService.getAllCities( event.query ).subscribe(
         lis => this.resultExpeditionCity = lis
      );
   }

   captureExpeditionCity( event: any ) {
      this.employee.idCiudadExpDocumento = event.idDivisionPolitica;
      this.ciudadExpDocumento = event.camino;
      this.backupCiudadExpDocumento = event.camino;
   }

   searchBirthPlace( event: any ) {
      this.politicalDivisionService.getAllCities( event.query ).subscribe(
         lis => this.resultBirthPlace = lis
      );
   }

   captureBirthPlace( event: any ) {
      this.employee.idCiudadNacimiento = event.idDivisionPolitica;
      this.ciudadNacimiento = event.camino;
      this.backupCiudadNacimiento = event.camino;
   }

   focusUP() {
      const element = document.querySelector( '#formulario' );
      if ( element ) {
         element.scrollIntoView( element );
      }
   }

   updateDate() {

      let tipo = this.employee.idTipoDocumento;
      let exp = this.expeditionDate;
      let dateExpo = new Date( exp );

      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prev18Year = year - 18;
      let prev20Year = year - 20;
      let lastYear = prev18Year - 80;
      this.maxDate = new Date();
      this.maxDate.setMonth( month );

      if ( tipo === 1 ) {
         this.maxDate.setFullYear( prev18Year );
      } else if ( tipo === 2 ) {
         this.maxDate.setFullYear( year );
      } else {
         this.maxDate.setFullYear( year );
      }
      if ( this.maxDate > dateExpo ) {
         this.maxDate = dateExpo;
      }

      if ( (this.employee.fechaNacimiento) !== null && (this.employee.fechaNacimiento) !== null ) {
         let timestamp2 = new Date( this.maxDate ).getTime();
         let timestamp1 = new Date( this.employee.fechaNacimiento ).getTime();
         let timeDiff = Math.round( timestamp2 - timestamp1 );
         if ( timeDiff < 0 ) {
            this.employee.fechaNacimiento = null;
         }
      }
      this.validateDocument();

   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   capitalizeSave( input: any ) {
      return input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   onExpeditionDate( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.expeditionDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.updateDate();
   }

   onBirthDate( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.birthDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
   }

   onDeathDate( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.deathDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
   }

   updateActivities( value: number ) {
      if ( value !== null ) {
         this.activities = [];
         this.actividadEconomicaService.listLastChild( value ).subscribe( res => {
            this.activities.push( { label: 'Seleccione', value: null } );
            for ( let dp of res ) {
               this.activities.push( {
                                        label: dp.actividadEconomica,
                                        value: dp.idActividadEconomica
                                     } );
            }
         } );
      }
   }

   validateDocument() {
      if ( this.employee.numeroDocumento !== '' && this.employee.numeroDocumento !== null ) {
         this.employeesService.validateDocument( this.employee.numeroDocumento, this.employee.idTipoDocumento ).subscribe( res => {
            if ( res.idTercero > 0 && this.employee.idTercero !== res.idTercero ) {
               this.confirmationService.confirm( {
                                                    message: ` ¿La cedula que ha ingresado ya existe, desea ver el colaborador existente?`,
                                                    header: 'Confirmación',
                                                    icon: 'fa fa-question-circle',
                                                    accept: () => {
                                                       this.router.navigate( [ '/employees/update/' + res.idTercero ] );
                                                    },
                                                    reject: () => {
                                                       this.employee.numeroDocumento = '';
                                                    }
                                                 } );
            }
         } );
      }
   }

   inputCleanUp( value: string ) {
      this.employee.numeroDocumento = value.toUpperCase().replace( ' ', '' ).trim();
   }

}
