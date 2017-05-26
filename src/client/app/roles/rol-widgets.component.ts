import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Rol } from '../_models/rol';
import { Widgets } from '../_models/widgets';
import { WidgetServices } from '../_services/widget.service';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { RolWidgets } from '../_models/rolWidgets';
import { RolWidgetsServices } from '../_services/rolWidgets.service';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'rol-widgets.component.html',
               selector: 'rol-widges',
               providers: [ ConfirmationService ]
            } )
export class RolWidgetsComponent implements OnInit {

   @Input() rol: Rol;

   rolWidget: RolWidgets = new RolWidgets();
   lfrolWidget: RolWidgets = new RolWidgets();
   dialogObjet: RolWidgets = new RolWidgets();
   rolWidgets: RolWidgets[];
   showForm: boolean = false;
   msgs: Message[] = [];
   widgets: SelectItem[] = [];
   listWidgets: Widgets[] = [];
   idRol: number;
   isUpdating: boolean = false;

   constructor( private rolWidgetsServices: RolWidgetsServices,
      private router: Router,
      private route: ActivatedRoute,
      private _nav: NavService,
      private confirmationService: ConfirmationService,
      private widgetServices: WidgetServices, ) {

   }

   ngOnInit() {
      this.idRol = this.rol.idRol;
      this.rolWidgetsServices.getAllByRol( this.rol.idRol ).subscribe( rolWidgets => {
         this.rolWidgets = rolWidgets;
         this.widgetServices.getAllEnabled().subscribe(
            widgets => {
               this.widgets.unshift( { label: 'Seleccione', value: null } );
               widgets.map( ( s: any ) => {
                  if ( this.rolWidgets.filter( w => w.idWidget === s.idWidget ).length === 0 ) {
                     this.widgets.push( { label: s.widget, value: s.idWidget } );
                  }
               } );
            }
         );
      } );

   }

   onSubmit() {
      this.msgs = [];
      this.showForm = false;

      if ( this.rolWidget.idRolWidget === null ||
           this.rolWidget.idRolWidget === 0 ||
           this.rolWidget.idRolWidget === undefined ) {
         this.rolWidget.idRol = this.idRol;
         this.rolWidgetsServices.add( this.rolWidget )
         .subscribe( data => {
            this.widgets.splice( this.widgets.indexOf( this.widgets.find( m => m.value === this.rolWidget.idWidget ) ), 1 );
            this._nav.setMesage( 1, this.msgs );
            this.rolWidgetsServices.getAllByRol( this.idRol ).subscribe(
               rolWidgets => this.rolWidgets = rolWidgets
            );
         }, error => {
            this.showForm = true;
            this._nav.setMesage( 3, this.msgs );
         } );
      } else {
         this.isUpdating = false;
         this.rolWidgetsServices.update( this.rolWidget )
         .subscribe( data => {
            this.isUpdating = false;
            this.widgets.splice( 0, 1 );
            this._nav.setMesage( 2, this.msgs );
            this.rolWidgetsServices.getAllByRol( this.idRol ).subscribe(
               rolWidgets => this.rolWidgets = rolWidgets
            );
         }, error => {
            this.showForm = true;
            this._nav.setMesage( 3, this.msgs );
         } );
      }

   }

   add() {
      this.msgs = [];
      this.rol = new Rol();
      this.showForm = true;
   }

   update( f: RolWidgets ) {
      this.msgs = [];
      this.rolWidget = f;
      this.showForm = true;
      this.isUpdating = true;
      this.widgets.unshift( { label: f.widget, value: f.idWidget } );

   }

   goBackUpdate() {
      this.msgs = [];
      this.showForm = false;
      if ( this.isUpdating === true ) {
         this.isUpdating = false;
         this.widgets.splice( 0, 1 );
      }
   }

}
