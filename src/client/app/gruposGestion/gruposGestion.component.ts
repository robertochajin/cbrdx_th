import { Component } from '@angular/core';
import { GruposGestion } from '../_models/gruposGestion';
import { GruposGestionService } from '../_services/grupoGestion.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
@Component( {
               moduleId: module.id,
               templateUrl: 'gruposGestion.component.html',
               selector: 'gruposgestion-list'
            } )
export class GruposGestionComponent {

   gruposGestion: GruposGestion[];
   busqueda:string;
   constructor( private gruposGestionService: GruposGestionService, private router: Router, private navService:NavService) {
      this.busqueda = this.navService.getSearch( 'gruposGestion.component' );
      gruposGestionService.listGruposGestion().subscribe( res => {
         this.gruposGestion = res;
      } );
   }

   addGrupoGestion() {
      this.router.navigate( [ 'gruposGestion/add' ] );
   }

   editGrupoGestion( grupoGestionData: GruposGestion ) {
      this.router.navigate( [ 'gruposGestion/edit/', grupoGestionData.idGrupoGestion ] );
   }

   viewGrupoGestion( grupoGestionData: GruposGestion ) {
      this.router.navigate( [ 'gruposGestion/detail/', grupoGestionData.idGrupoGestion ] );
   }

   setSearch() {
      this.navService.setSearch( 'gruposGestion.component', this.busqueda );
   }
}
