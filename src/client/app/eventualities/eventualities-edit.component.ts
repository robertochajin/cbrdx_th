import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { Location } from '@angular/common';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { RolesService } from '../_services/roles.service';
import { ListaItem } from '../_models/listaItem';
import { EventualityServices } from '../_services/eventuality.service';
import { Eventuality } from '../_models/eventuality';
import { Rol } from '../_models/rol';

@Component( {
               moduleId: module.id,
               selector: 'eventualities-edit',
               templateUrl: 'eventualities-edit.component.html'
            } )
export class EventualitiesEditComponent implements OnInit {

   private eventuality: Eventuality;
   public eventualityTypes: SelectItem[] = [];
   public thirdStates: SelectItem[] = [];
   public affectationTypes: SelectItem[] = [];
   public eventualityStates: SelectItem[] = [];
   public roles: SelectItem[] = [];

   constructor( private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private rolesService: RolesService,
      private location: Location,
      private confirmationService: ConfirmationService,
      private eventualityServices: EventualityServices,
      private _nav: NavService ) {
   }

   ngOnInit() {

      this.rolesService.listRoles().subscribe( res => {
         this.roles.push( { label: 'Seleccione', value: null } );
         res.map( ( s: Rol ) => this.roles.push( { label: s.codigoRol + ' ' + s.descripcion, value: s.idRol } ) );
      } );

      this.listaService.getMasterDetails( 'ListasTiposNovedades' ).subscribe( res => {
         this.eventualityTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.eventualityTypes.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasEstadosTerceros' ).subscribe( res => {
         this.thirdStates.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.thirdStates.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasTiposAfectaciones' ).subscribe( res => {
         this.affectationTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.affectationTypes.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.listaService.getMasterDetails( 'ListasEstadosNovedades' ).subscribe( res => {
         this.eventualityStates.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.eventualityStates.push( { label: s.nombre, value: s.idLista } ) );
      } );

      this.route.params.subscribe( ( params: Params ) => {
         if ( params[ 'idEventuality' ] ) {
            this.eventualityServices.get( +params[ 'idEventuality' ] ).subscribe( obj => {
               this.eventuality = obj;
            } );
         } else {
            this.eventuality = new Eventuality();
         }
      } );
   }

   goBack( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.router.navigate( [ 'eventualities' ] );
                                              }
                                           } );
      } else {
         this.router.navigate( [ 'eventualities' ] );
      }
   }
}