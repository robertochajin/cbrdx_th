import { Component, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
import { Router } from '@angular/router';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { EmployeeEventuality } from '../_models/employeeEventuality';

@Component( {
               moduleId: module.id,
               templateUrl: 'tray-eventualities.component.html',
               selector: 'tray-eventuality',
               providers: [ ConfirmationService ]
            } )
export class TrayEventualitiesComponent {

   msg: Message;
   employeeEventuality: EmployeeEventuality = new EmployeeEventuality();
   filter: EmployeeEventuality = new EmployeeEventuality();
   listEventualities: EmployeeEventuality [];
   allEventualities: EmployeeEventuality [];
   busqueda: string;

   ListaAreas: SelectItem[] = [];
   ListaOficinas: SelectItem[] = [];
   ListaEstados: SelectItem[] = [];
   ListaTipos: SelectItem[] = [];
   ListaNovedad: SelectItem[] = [];
   ListaReporta: SelectItem[] = [];
   ListaColaborador: SelectItem[] = [];
   es: any;
   fechaInicio: Date;
   fechaFin: Date;
   today: Date;

   constructor( private employeeEventualitiesService: EmployeeEventualitiesService,
      private listaService: ListaService,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = _nav.getSearch( 'tray-eventualities' );

      this.employeeEventualitiesService.getAll().subscribe( data => {
         this.allEventualities = data;
         this.listEventualities = data;
         this.getFilters();
      } );
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
      let today = new Date();
      let date = today.getDate();
      let month = today.getMonth();
      let year = today.getFullYear();
      this.today = today;
      this.fechaFin = today;
   }

   add() {
      this.router.navigate( [ 'trayEventualities/add' ] );
   }

   update( c: EmployeeEventuality ) {
      this.router.navigate( [ 'trayEventualities/update/' + c.idTerceroNovedad ] );
   }

   detail( c: EmployeeEventuality ) {
      this.router.navigate( [ 'trayEventualities/detail/' + c.idTerceroNovedad ] );
   }

   setSearch() {
      this._nav.setSearch( 'tray-eventualities', this.busqueda );
   }

   changeFilter() {
      this.employeeEventualitiesService.getAll().subscribe( data => {
         this.listEventualities = data;
      } );
   }

   getFilters() {
      this.ListaAreas = [];
      this.ListaOficinas = [];
      this.ListaEstados = [];
      this.ListaTipos = [];
      this.ListaNovedad = [];
      this.ListaReporta = [];
      this.ListaColaborador = [];

      this.ListaAreas.push( { label: 'Seleccione', value: null } );
      this.ListaOficinas.push( { label: 'Seleccione', value: null } );
      this.ListaEstados.push( { label: 'Seleccione', value: null } );
      this.ListaTipos.push( { label: 'Seleccione', value: null } );
      this.ListaNovedad.push( { label: 'Seleccione', value: null } );
      this.ListaReporta.push( { label: 'Seleccione', value: null } );
      this.ListaColaborador.push( { label: 'Seleccione', value: null } );

      this.allEventualities.map( obj => {
         if ( this.ListaAreas.filter( s => s.value === obj.estructuraArea ).length === 0 ) {
            this.ListaAreas.push( { label: obj.estructuraArea, value: obj.estructuraArea } );
         }
         if ( this.ListaOficinas.filter( s => s.value === obj.estructuraFisica ).length === 0 ) {
            this.ListaOficinas.push( { label: obj.estructuraFisica, value: obj.estructuraFisica } );
         }
         if ( this.ListaEstados.filter( s => s.value === obj.estadoNovedad ).length === 0 ) {
            this.ListaEstados.push( { label: obj.estadoNovedad, value: obj.estadoNovedad } );
         }
         if ( this.ListaTipos.filter( s => s.value === obj.tipoNovedad ).length === 0 ) {
            this.ListaTipos.push( { label: obj.tipoNovedad, value: obj.tipoNovedad } );
         }
         if ( this.ListaNovedad.filter( s => s.value === obj.novedad ).length === 0 ) {
            this.ListaNovedad.push( { label: obj.novedad, value: obj.novedad } );
         }
         if ( this.ListaReporta.filter( s => s.value === obj.nombreTerceroReporta ).length === 0 ) {
            this.ListaReporta.push( { label: obj.nombreTerceroReporta, value: obj.nombreTerceroReporta } );
         }
         if ( this.ListaColaborador.filter( s => s.value === obj.nombreTercero ).length === 0 ) {
            this.ListaColaborador.push( { label: obj.nombreTercero, value: obj.nombreTercero } );
         }
      } );
   }

   clearDate() {
      this.fechaInicio = null;
      this.fechaFin = this.today;
      this.listEventualities = this.allEventualities;
   }

   changeDate() {
      let i = new Date( this.fechaInicio );
      let f = new Date( this.fechaFin );
      let fechaInicioEnvio = `${i.getFullYear()}-${i.getMonth() + 1}-${i.getDate()}`;
      let fechaFinEnvio = `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`;

      this.employeeEventualitiesService.getByDate( fechaInicioEnvio, fechaFinEnvio ).subscribe( data => {
         this.listEventualities = data;
      } );
   }
}
