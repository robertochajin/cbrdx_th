/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
import { Component } from '@angular/core';
import { GruposGestion } from '../_models/gruposGestion';
import { GruposGestionService } from '../_services/grupoGestion.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component( {
               moduleId: module.id,
               templateUrl: 'gruposGestion-detail.component.html',
               selector: 'gruposgestion-detail'
            } )
export class GruposGestionDetailComponent {

   grupoGestion: GruposGestion = new GruposGestion();
   habilitado: string;

   constructor( private gruposGestionService: GruposGestionService, private router: Router, private route: ActivatedRoute ) {
      route.params.switchMap( ( params: Params ) => gruposGestionService.viewGruposGestion( +params[ 'id' ] ) )
      .subscribe( data => {
         this.grupoGestion = data;
         this.habilitado = data.indicadorHabilitado ? 'Si' : 'No';
      } );
   }

   goBack(): void {
      this.router.navigate( [ 'gruposGestion' ] );
   }
}
