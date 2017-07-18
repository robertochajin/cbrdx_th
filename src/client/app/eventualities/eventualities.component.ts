import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaService } from '../_services/lista.service';
import { UsuariosService } from '../_services/usuarios.service';
import { ConstanteService } from '../_services/constante.service';
import { SelectItem } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Eventuality } from '../_models/eventuality';
import { EventualityServices } from '../_services/eventuality.service';
import { ListaItem } from '../_models/listaItem';

@Component( {
               moduleId: module.id,
               selector: 'novelties-adm',
               templateUrl: 'eventualities.component.html'
            } )
export class EventualitiesComponent implements OnInit {

   public eventualities: Eventuality[];
   public busqueda: string;
   public typeFilter: string;
   public eventualityTypes: SelectItem[] = [];

   constructor( private router: Router,
      private navService: NavService,
      private eventualityServices: EventualityServices,
      private listaService: ListaService ) {
      this.busqueda = this.navService.getSearch( 'eventualities.component' );
   }

   ngOnInit() {

      this.listaService.getMasterDetails( 'ListasTiposNovedades' ).subscribe( res => {
         this.eventualityTypes.push( { label: '- -', value: null } );
         res.map( ( s: ListaItem ) => this.eventualityTypes.push( { label: s.nombre, value: s.nombre } ) );
         this.eventualityServices.getAll().subscribe( res => {
            this.eventualities = res;
         } );
      } );
   }

   add() {
      this.router.navigate( [ 'eventualities/add/' ] );
   }

   detail( r: Eventuality ) {
      this.router.navigate( [ 'eventualities/detail/' + r.idNovedad ] );
   }

   update( r: Eventuality ) {
      this.router.navigate( [ 'eventualities/update/' + r.idNovedad ] );
   }

   setSearch() {
      this.navService.setSearch( 'eventualities.component', this.busqueda );
   }
}
