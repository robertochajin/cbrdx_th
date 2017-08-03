import { Component, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'accidents-incidents.component.html',
               selector: 'accidents-incidents',
               providers: [ ConfirmationService ]
            } )
export class AccidentIncidentComponent {

   msg: Message;
   listUsers: SelectItem [] = [];
   busqueda: string;
   idUsuario: number;
   listAccidentIncident: any[];

   constructor( private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = _nav.getSearch( 'accidents-incidents' );
   }

   ngOnInit() {

   }

   changeUser() {

   }

   add() {
      this.router.navigate( [ 'supplies-projection/add' ] );
   }

}
