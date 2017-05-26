import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { Widgets } from '../_models/widgets';
import { WidgetServices } from '../_services/widget.service';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'widgets.component.html',
               selector: 'widgets-list',
               providers: [ ConfirmationService ]
            } )
export class WidgetsComponent implements OnInit {
   widgets: Widgets = new Widgets();
   listWidgets: Widgets [];
   busqueda: string;

   constructor( private router: Router,
      private widgetServices: WidgetServices,
      private navService:NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = this.navService.getSearch( 'widgets.component' );
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
   setSearch() {
      this.navService.setSearch( 'widgets.component', this.busqueda );
   }

}
