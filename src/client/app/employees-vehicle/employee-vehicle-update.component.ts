import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeVehicle } from '../_models/employee-vehicle';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { EmployeeVehicleService } from '../_services/employee-vehicles.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { NavService } from '../_services/_nav.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
@Component( {
               moduleId: module.id,
               selector: 'employees-vehicle',
               templateUrl: 'employee-vehicles-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class EmployeesVehicleUpdateComponent implements OnInit {
   @Input()
   employeeVehicle: EmployeeVehicle = new EmployeeVehicle();
   header: string = 'Agregando Vehiculo';

   listTypeVehicle: SelectItem[] = [];
   listTypeService: SelectItem[] = [];
   listBrandVehicle: SelectItem[] = [];
   msgs: Message[] = [];
   year: number;
   anioValid: boolean = false;
   ciudadPlaca: String;
   backupCiudadPlaca: String;
   resultCity: DivisionPolitica[];

   constructor( private employeeVehicleService: EmployeeVehicleService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private listaService: ListaService,
      private listEmployeesService: ListEmployeesService,
      private politicalDivisionService: PoliticalDivisionService,
      private confirmationService: ConfirmationService,
      private _nav: NavService ) {

   }

   ngOnInit() {
      this.route.params.switchMap( ( params: Params ) => this.employeeVehicleService.getById( +params[ 'id' ] ) )
      .subscribe( data => {
         this.employeeVehicle = data;
         this.ciudadPlaca = this.employeeVehicle.ciudad;
         this.backupCiudadPlaca = this.employeeVehicle.ciudad;
      } );

      let today = new Date();
      let year = today.getFullYear();
      this.year = year + 1;

      this.listaService.getMasterDetails( 'ListasTiposVehiculos' ).subscribe( res => {
         this.listTypeVehicle.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeVehicle.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasTiposServiciosVehiculos' ).subscribe( res => {
         this.listTypeService.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeService.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasMarcasVehiculos' ).subscribe( res => {
         this.listBrandVehicle.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listBrandVehicle.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

   }

   onSubmit() {
      if ( this.ciudadPlaca !== this.backupCiudadPlaca ) {
         this.ciudadPlaca = '';
         this.employeeVehicle.idCiudad = null;
      }
      if ( this.ciudadPlaca === this.backupCiudadPlaca ) {
         if ( this.employeeVehicle.modelo < 1900 ) {
            this.employeeVehicle.modelo = 1900;
         }
         this.employeeVehicleService.update( this.employeeVehicle )
         .subscribe( data => {
            // 1:add 2:update 3:error
            this._nav.setMesage( 2, this.msgs );
            this._nav.setTab( 5 );
            this.location.back();
         }, error => {
            // 1:add 2:update 3:error
            this._nav.setMesage( 3, this.msgs );
         } );
      }
   }

   inputNumber() {
      let modelo = this.employeeVehicle.modelo + '';
      if ( this.employeeVehicle.modelo !== null ) {
         this.employeeVehicle.modelo = Number( modelo.replace( /[^0-9]/g, '' ) );
         if ( this.employeeVehicle.modelo > this.year ) {
            this.employeeVehicle.modelo = this.year;
         }
         if ( this.employeeVehicle.modelo === 0 ) {
            this.employeeVehicle.modelo = 1900;
         }
         let m = this.employeeVehicle.modelo.toString();
         if ( m.length === 4 && this.employeeVehicle.modelo < 1900 ) {
            this.employeeVehicle.modelo = 1900;
         }
      }
   }

   inputPlaca() {
      let placa = this.employeeVehicle.placa;
      if ( this.employeeVehicle.placa !== null ) {
         this.employeeVehicle.placa = placa.replace( ' ', '' ).toUpperCase();
      }
   }

   goBack(fDirty : boolean): void {

      if ( fDirty ){
         this.confirmationService.confirm( {
            message: ` ¿Esta seguro que desea salir sin guardar?`,
            header: 'Corfirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
               this._nav.setTab( 0 );
               this.location.back();
            }
         } );
      }else {
         this.location.back();
      }
   }

   searchCity( event: any ) {
      this.politicalDivisionService.getAllCities( event.query ).subscribe(
         lis => this.resultCity = lis
      );
   }

   captureCity( event: any ) {
      this.employeeVehicle.idCiudad = event.idDivisionPolitica;
      this.ciudadPlaca = event.camino;
      this.backupCiudadPlaca = event.camino;
   }

}
