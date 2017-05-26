import { Component } from '@angular/core';
import { TipoDeArea } from '../_models/tipoDeArea';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';

/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 28/02/2017.
 */

@Component( {
               moduleId: module.id,
               templateUrl: 'tipoDeArea.component.html',
               selector: 'tipodearea-list'
            } )
export class TipoDeAreaComponent {

   listadoAreas: TipoDeArea[];
   busqueda: string;
   constructor( private tipoDeAreaService: TipoDeAreaService, private router: Router,  private navService:NavService ) {
      this.busqueda = this.navService.getSearch( 'roles.component' );
      tipoDeAreaService.listAreas().subscribe( res => {
         this.listadoAreas = res;
      } );
   }

   addArea() {
      this.router.navigate( [ 'tipoArea/add' ] );
   }

   editArea( areaData: TipoDeArea ) {
      this.router.navigate( [ 'tipoArea/edit/', areaData.idEstructuraArea ] );
   }

   viewArea( areaData: TipoDeArea ) {
      this.router.navigate( [ 'tipoArea/detail/', areaData.idEstructuraArea ] );
   }
   setSearch() {
      this.navService.setSearch( 'roles.component', this.busqueda );
   }
}


