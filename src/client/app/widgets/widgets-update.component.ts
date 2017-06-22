import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { Widgets } from '../_models/widgets';
import { WidgetServices } from '../_services/widget.service';
import { Location } from '@angular/common';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'widgets-form.component.html',
               selector: 'widgets-form',
               providers: [ ConfirmationService ]
            } )
export class WidgetsUpdateComponent implements OnInit {

   widgets: Widgets = new Widgets();
   listWidgets: Widgets[];
   codExists: boolean = false;
   msgs: Message[] = [];

   constructor( private router: Router,
      private location: Location,
      private route: ActivatedRoute,
      private widgetServices: WidgetServices,
      private confirmationService: ConfirmationService,
      private _nav: NavService
   ) {

   }

   ngOnInit() {
      this.route.params.switchMap( ( params: Params ) => this.widgetServices.getById( +params[ 'id' ] ) )
      .subscribe( data => {
         this.widgets = data;
      } );
      this.widgetServices.getAll().subscribe( res => {
         this.listWidgets = res;
      } );
   }

   onSubmit() {
      this.msgs = [];
      this.widgetServices.update( this.widgets ).subscribe( data => {
         // this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         this._nav.setMesage(0, {severity: 'success', summary: 'Exito', detail: 'Registro guardado correctamente.'});
         this.location.back();
      }, error => {
         // this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         this._nav.setMesage(0,{severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
      } );
   }

   inputCleanUp( value: string ) {
      this.widgets.codigoWidget = value.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
   }

   validateCode() {
      this.codExists = this.listWidgets.filter( t => t.codigoWidget === this.widgets.codigoWidget ).length > 0;
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   inputURL() {
      let url = this.widgets.descripcion;
      if ( this.widgets.descripcion !== null ) {
         this.widgets.descripcion = url.replace( ' ', '' );
      }
   }

   goBack(fDirty:boolean): void {

      if(fDirty){
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.location.back();
                                              }
                                           } );
      }else{
         this.location.back();
      }

   }
}
