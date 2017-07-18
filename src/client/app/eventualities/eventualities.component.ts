import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaService } from '../_services/lista.service';
import { UsuariosService } from '../_services/usuarios.service';
import { ConstanteService } from '../_services/constante.service';
import { NavService } from '../_services/_nav.service';
import { Eventuality } from '../_models/eventuality';
import { EventualityServices } from '../_services/eventuality.service';

@Component( {
               moduleId: module.id,
               selector: 'novelties-adm',
               templateUrl: 'eventualities.component.html'
            } )
export class EventualitiesComponent implements OnInit {

   public eventualities: Eventuality[];
   public busqueda: string;

   constructor( private router: Router,
      private navService: NavService,
      private eventualityServices: EventualityServices,
      private constanteService: ConstanteService,
      private usuariosService: UsuariosService,
      private listaService: ListaService ) {
      this.busqueda = this.navService.getSearch( 'eventualities.component' );
   }

   ngOnInit() {
      this.eventualityServices.getAllEnabled().subscribe(res => {
         this.eventualities = res;
      });
   }

   add( r: Eventuality ) {
      this.router.navigate( [ 'eventualities/add/' + r.idNovedad ] );
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
