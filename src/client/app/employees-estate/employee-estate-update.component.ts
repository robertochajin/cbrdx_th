import 'rxjs/add/operator/switchMap';
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeEstate } from '../_models/employee-estate';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { EmployeeEstateService } from '../_services/employee-estate.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';

@Component( {
               moduleId: module.id,
               selector: 'employees-estate',
               templateUrl: 'employee-estate-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class EmployeesEstateUpdateComponent {
   @Input()
   employeeEstate: EmployeeEstate = new EmployeeEstate();
   header: string = 'Agregando Inmueble';

   listTypeEstate: SelectItem[] = [];
   listTypeConstruction: SelectItem[] = [];
   listStratum: SelectItem[] = [];
   listClassEstate: SelectItem[] = [];
   listLocalizacion: SelectItem[] = [];
   msgs: Message[] = [];
   year: Number;
   anioValid: boolean = false;

   constructor( private employeesEstatesService: EmployeeEstateService,
      private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private listEmployeesService: ListEmployeesService,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {

   }

   ngOnInit() {

      let today = new Date();
      let year = today.getFullYear();
      this.year = year;

      this.route.params.switchMap( ( params: Params ) => this.employeesEstatesService.getById( +params[ 'id' ] ) )
      .subscribe( data => {
         this.employeeEstate = data;
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
      this.employeesEstatesService.update( this.employeeEstate )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         this.location.back();
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }

   inputNumber() {
      var anio = this.employeeEstate.anioConstruccion + '';
      if ( this.employeeEstate.anioConstruccion !== null ) {
         this.employeeEstate.anioConstruccion = Number( anio.replace( /[^0-9]/g, '' ) );
      }
   }

   inputNumberPisos() {
      var piso = this.employeeEstate.numeroPisos + '';
      if ( this.employeeEstate.numeroPisos !== null ) {
         this.employeeEstate.numeroPisos = Number( piso.replace( /[^0-9]/g, '' ) );
      }
   }

   inputNumberSotanos() {
      var sotano = this.employeeEstate.numeroSotanos + '';
      if ( this.employeeEstate.numeroSotanos !== null ) {
         this.employeeEstate.numeroSotanos = Number( sotano.replace( /[^0-9]/g, '' ) );
      }
   }

   anioValidate() {
      var anio = this.employeeEstate.anioConstruccion;
      if ( anio > this.year ) {
         this.anioValid = true;
      } else {
         this.anioValid = false;
      }
   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              // this.router.navigate(['/employees-estate']);
                                              this._nav.setTab( 5 );
                                              this.location.back();
                                           }
                                        } );
   }

}
