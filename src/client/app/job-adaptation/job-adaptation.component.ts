import { Component, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { EmployeeEventuality } from '../_models/employeeEventuality';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'job-adaptation.component.html',
               selector: 'accidents-incidents',
               providers: [ ConfirmationService ]
            } )
export class JobAdaptationComponent {

   msg: Message;
   busqueda: string;
   listAccidentesIncidents: EmployeeEventuality[] = [];

   ListaAreas: SelectItem[] = [];

   constructor( private router: Router,
      private navService: NavService,
      private confirmationService: ConfirmationService,
      private employeeEventualitiesService: EmployeeEventualitiesService ) {
      this.busqueda = navService.getSearch( 'job-adaptation.component' );
   }

   ngOnInit() {
      this.employeeEventualitiesService.getAllAccidents().subscribe(
         accidents => {
            this.listAccidentesIncidents = accidents;
            this.getFilters();
         }
      );
   }

   addExam( c: EmployeeEventuality ) {
      this.router.navigate( [ 'job-adaptation/exam/' + c.idTercero ] );
   }

   setSearch() {
      this.navService.setSearch( 'job-adaptation.component', this.busqueda );
   }

   getFilters() {
      this.ListaAreas = [];
      this.ListaAreas.push( { label: 'Seleccione', value: null } );

      this.listAccidentesIncidents.map( obj => {
         if ( this.ListaAreas.filter( s => s.value === obj.estructuraArea ).length === 0 ) {
            this.ListaAreas.push( { label: obj.estructuraArea, value: obj.estructuraArea } );
         }
      } );
   }

}
