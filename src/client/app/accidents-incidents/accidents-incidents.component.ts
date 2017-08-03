import { Component, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { EmployeeEventuality } from '../_models/employeeEventuality';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'accidents-incidents.component.html',
               selector: 'accidents-incidents',
               providers: [ ConfirmationService ]
            } )
export class AccidentIncidentComponent {

   msg: Message;
   busqueda: string;
   listAccidentesIncidents: EmployeeEventuality[] = [];

   ListaEstados: SelectItem[] = [];
   ListaAreas: SelectItem[] = [];
   ListaTipos: SelectItem[] = [];

   constructor( private router: Router,
      private navService: NavService,
      private confirmationService: ConfirmationService,
      private employeeEventualitiesService: EmployeeEventualitiesService
   ) {
      this.busqueda = navService.getSearch( 'accidents-incidents.component' );
   }

   ngOnInit() {
      this.employeeEventualitiesService.getAllAccidents( ).subscribe(
         accidents => {
            this.listAccidentesIncidents = accidents;
            this.getFilters();
         }
      );
   }

   detail( c: EmployeeEventuality ) {
      this.router.navigate( [ 'accidents-incidents/plan/' + c.idTerceroNovedad ] );
   }

   setSearch() {
      this.navService.setSearch( 'accidents-incidents.component', this.busqueda );
   }

   getFilters() {
      this.ListaEstados = [];
      this.ListaAreas = [];
      this.ListaTipos = [];

      this.ListaEstados.push( { label: 'Seleccione', value: null } );
      this.ListaAreas.push( { label: 'Seleccione', value: null } );
      this.ListaTipos.push( { label: 'Seleccione', value: null } );

      this.listAccidentesIncidents.map( obj => {
         if ( this.ListaEstados.filter( s => s.value === obj.estadoNovedad ).length === 0 ) {
            this.ListaEstados.push( { label: obj.estadoNovedad, value: obj.estadoNovedad } );
         }
         if ( this.ListaAreas.filter( s => s.value === obj.estructuraArea ).length === 0 ) {
            this.ListaAreas.push( { label: obj.estructuraArea, value: obj.estructuraArea } );
         }
         if ( this.ListaTipos.filter( s => s.value === obj.tipoNovedad ).length === 0 ) {
            this.ListaTipos.push( { label: obj.tipoNovedad, value: obj.tipoNovedad } );
         }
      } );
   }

}
