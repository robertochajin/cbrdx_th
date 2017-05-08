import { Component, OnInit } from '@angular/core';
import { TipoDeArea } from '../_models/tipoDeArea';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';
import { Router } from '@angular/router';

/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 28/02/2017.
 */

@Component( {
               moduleId: module.id,
               templateUrl: 'tipoDeArea.component.html',
               selector: 'tipoDeArea'
            } )
export class TipoDeAreaComponent implements OnInit {

   listadoAreas: TipoDeArea[];

   constructor( private tipoDeAreaService: TipoDeAreaService, private router: Router ) {
      tipoDeAreaService.listAreas().subscribe( res => {
         this.listadoAreas = res;
      } );
   }

   ngOnInit(): void {

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
}


