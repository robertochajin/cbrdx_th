/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
import { Component } from '@angular/core';
import { CentroCostos } from '../_models/centroCostos';
import { CentroCostosService } from '../_services/centroCostos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component( {
               moduleId: module.id,
               templateUrl: 'centroCostos-detail.component.html',
               selector: 'centroCostos-detail'
            } )
export class CentroCostosDetailComponent {

   centroCostos: CentroCostos = new CentroCostos();
   habilitado: string;

   constructor( private centroCostosService: CentroCostosService, private router: Router, private route: ActivatedRoute ) {
      route.params.switchMap( ( params: Params ) => centroCostosService.viewCentroCostos( +params[ 'id' ] ) )
      .subscribe( data => {
         this.centroCostos = data;
         this.habilitado = data.indicadorHabilitado ? 'Si' : 'No';
      } );
   }

   goBack(): void {
      this.router.navigate( [ 'centroCostos' ] );
   }
}
