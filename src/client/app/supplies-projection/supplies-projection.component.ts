import { Component, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
import { Router } from '@angular/router';
import { Employee } from '../_models/employees';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { EmployeeEventuality } from '../_models/employeeEventuality';
import { ListaItem } from '../_models/listaItem';
import { SuppliesProjectionServices } from '../_services/suppliesProjection.service';
import { SuppliesProjection } from '../_models/suppliesProjection';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies-projection.component.html',
               selector: 'supplies-projection',
               providers: [ ConfirmationService ]
            } )
export class SuppliesProjectionComponent {

   msg: Message;
   suppliesProjection: SuppliesProjection = new SuppliesProjection();
   listSuppliesProjection: SuppliesProjection [];
   busqueda: string;

   constructor( private listaService: ListaService,
      private suppliesProjectionServices: SuppliesProjectionServices,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = _nav.getSearch( 'supplies-projection' );
   }

   ngOnInit() {
      this.suppliesProjectionServices.getAll().subscribe( data => {
         this.listSuppliesProjection = data;
      } );
   }

}
