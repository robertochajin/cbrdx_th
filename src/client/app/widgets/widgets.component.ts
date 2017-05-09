import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { Widgets } from '../_models/widgets';
import { WidgetServices } from '../_services/widget.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'widgets.component.html',
               selector: 'widgets-list',
               providers: [ ConfirmationService ]
            } )
export class WidgetsComponent implements OnInit {
   widgets: Widgets = new Widgets();
   listWidgets: Widgets [];

   constructor( private router: Router,
      private widgetServices: WidgetServices,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.widgetServices.getAll().subscribe( res => {
         this.listWidgets = res;
         this.listWidgets.sort( function ( a, b ) {
            return b.idWidget - a.idWidget;
         } );
      } );
   }

   update( c: Widgets ) {
      this.router.navigate( [ 'widgets/update/' + c.idWidget ] );
   }

   add() {
      this.router.navigate( [ 'widgets/add' ] );
   }

}
