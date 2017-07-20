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
   listEventualities: EmployeeEventuality [];
   busqueda: string;

   constructor( private employeeEventualitiesService: EmployeeEventualitiesService,
      private listaService: ListaService,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = _nav.getSearch( 'tray-eventualities' );
   }

   ngOnInit() {
      this.employeeEventualitiesService.getAll().subscribe( data => {
         this.listEventualities = data;
      } );
   }

   add() {
      this.router.navigate( [ 'trayEventualities/add' ] );
   }

   detail( c: EmployeeEventuality ) {
      this.router.navigate( [ 'trayEventualities/update/' + c.idTerceroNovedad ] );
   }

   setSearch() {
      this._nav.setSearch( 'tray-eventualities', this.busqueda );
   }
}
