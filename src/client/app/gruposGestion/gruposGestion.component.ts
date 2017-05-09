import { Component, OnInit } from '@angular/core';
import { GruposGestion } from '../_models/gruposGestion';
import { GruposGestionService } from '../_services/grupoGestion.service';
import { Router } from '@angular/router';
/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
@Component( {
               moduleId: module.id,
               templateUrl: 'gruposGestion.component.html',
               selector: 'gruposGestion-list'
            } )
export class GruposGestionComponent {

   gruposGestion: GruposGestion[];

   constructor( private gruposGestionService: GruposGestionService, private router: Router ) {
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
}
