import { Component } from '@angular/core';
import { CentroCostos } from '../_models/centroCostos';
import { CentroCostosService } from '../_services/centroCostos.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
@Component( {
               moduleId: module.id,
               templateUrl: 'centroCostos.component.html',
               selector: 'centrocostos-list'
            } )
export class CentroCostosComponent {

   listadoCentroCostos: CentroCostos[];
   busqueda: string;

   constructor( private centroCostosService: CentroCostosService, private router: Router, private navService:NavService ) {
      this.busqueda = this.navService.getSearch( 'centroCostos.component' );
      centroCostosService.listCentroCostos().subscribe( res => {
         this.listadoCentroCostos = res;
      } );
   }

   addCentroCostos() {
      this.router.navigate( [ 'centroCostos/add' ] );
   }

   editCentroCostos( centroCostosData: CentroCostos ) {
      this.router.navigate( [ 'centroCostos/edit/', centroCostosData.idCentroCostos ] );
   }

   viewCentroCostos( centroCostosData: CentroCostos ) {
      this.router.navigate( [ 'centroCostos/detail/', centroCostosData.idCentroCostos ] );
   }
   setSearch() {
      this.navService.setSearch( 'centroCostos.component', this.busqueda );
   }
}
