import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeEstate } from '../_models/employee-estate';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { EmployeeEstateService } from '../_services/employee-estate.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { NavService } from '../_services/_nav.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { PermissionsEmployees } from '../_models/permissionsEmployees';

@Component( {
               moduleId: module.id,
               selector: 'employees-estate',
               templateUrl: 'employee-estate-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class EmployeesEstateAddComponent implements OnInit {
   @Input() employeeEstate: EmployeeEstate = new EmployeeEstate();
   header: string = 'Agregando Inmueble';

   listTypeEstate: SelectItem[] = [];
   listTypeConstruction: SelectItem[] = [];
   listStratum: SelectItem[] = [];
   listClassEstate: SelectItem[] = [];
   msgs: Message[] = [];
   year: Number;
   anioNotValid: boolean = false;
   idTercero: number;

   constructor( private employeesEsatesService: EmployeeEstateService,
      private router: Router,
      private route: ActivatedRoute,
      private listaService: ListaService,
      private location: Location,
      private listEmployeesService: ListEmployeesService,
      private confirmationService: ConfirmationService,
      private _nav: NavService, ) {

   }

   ngOnInit() {
      let today = new Date();
      let year = today.getFullYear();
      this.year = year;

      this.route.params.subscribe( ( params: Params ) => {
         this.employeeEstate.idTercero = Number( +params[ 'tercero' ] );
         this.idTercero = Number( +params[ 'tercero' ] );
      } );

      this.listaService.getMasterDetails( 'ListasTiposViviendas' ).subscribe( res => {
         this.listTypeEstate.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeEstate.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasClasesViviendas' ).subscribe( res => {
         this.listClassEstate.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listClassEstate.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasTiposConstruccionViviendas' ).subscribe( res => {
         this.listTypeConstruction.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeConstruction.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasEstratos' ).subscribe( res => {
         this.listStratum.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listStratum.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

   }

   onSubmit() {
      this.employeeEstate.idTercero = this.idTercero;
      this.employeesEsatesService.add( this.employeeEstate )
      .subscribe( data => {
         // 1:add 2:update 3:error
         this._nav.setMesage( 1, this.msgs );
         this._nav.setTab( 5 );
         this.location.back();
      }, error => {
         // 1:add 2:update 3:error
         this._nav.setMesage( 3, this.msgs );
      } );
   }

   inputNumber( event: any ) {
      let input = event.target.value;
      event.target.value = input.toUpperCase().replace( /[^0-9]/g, '' );
      let anio = Number( event.target.value );
      if ( anio > 1000 ) {
         if ( this.year >= anio ) {
            this.anioNotValid = false;
         } else {
            this.anioNotValid = true;
         }
      }
   }

   inputNumberPisos() {
      let piso = this.employeeEstate.numeroPisos + '';
      if ( this.employeeEstate.numeroPisos !== null ) {
         this.employeeEstate.numeroPisos = Number( piso.replace( /[^0-9]/g, '' ) );
         if ( this.employeeEstate.numeroPisos == 0 ) {
            this.employeeEstate.numeroPisos = null;
         }
      }
   }

   inputNumberSotanos() {
      let sotano = this.employeeEstate.numeroSotanos + '';
      if ( this.employeeEstate.numeroSotanos !== null ) {
         if ( sotano.length > 3 ) {
            sotano = sotano.substring( 0, 3 );
         }
         this.employeeEstate.numeroSotanos = Number( sotano.replace( /[^0-9]/g, '' ) );
      }
   }

   anioValidate() {
      // let anio = this.employeeEstate.anioConstruccion;
      // if ( anio < this.year ) {
      //    this.anioNotValid = true;
      // } else {
      //    this.anioNotValid = false;
      // }
   }

   goBack( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this._nav.setTab( 5 );
                                                 this.location.back();
                                              }
                                           } );
      } else {
         this._nav.setTab( 5 );
         this.location.back();
      }
   }

}
