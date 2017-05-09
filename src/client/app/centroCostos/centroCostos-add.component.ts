/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
import { Component } from '@angular/core';
import { CentroCostos } from '../_models/centroCostos';
import { CentroCostosService } from '../_services/centroCostos.service';
import { Router } from '@angular/router';

@Component( {
               moduleId: module.id,
               templateUrl: 'centroCostos-add.component.html',
               selector: 'centroCostos-add'
            } )
export class CentroCostosAddComponent {

   centroCostos: CentroCostos = new CentroCostos();
   centrosExistentes: CentroCostos[];
   codeExists: boolean = false;
   displayDialog:boolean;

   constructor( private centroCostosService: CentroCostosService, private router: Router ) {
      centroCostosService.listCentroCostos().subscribe( res => {
         this.centrosExistentes = res;
      } );
   }

   createGruposGestion() {
      this.centroCostosService.addCentroCostos( this.centroCostos ).then( data => {
         this.router.navigate( [ 'centroCostos' ] );
      } );
   }

   validateCode() {
      this.codeExists = this.centrosExistentes.filter( t => t.codigoCentroCostos === this.centroCostos.codigoCentroCostos ).length > 0;
   }

   inputCleanUp( value: string ) {
      this.centroCostos.codigoCentroCostos = value.toUpperCase().replace( /[^A-Z0-9]/, '' ).trim();
   }

   goBack(): void {
      this.router.navigate( [ 'centroCostos' ] );
   }

   capitalize() {
      let input = this.centroCostos.centroCostos;
      this.centroCostos.centroCostos = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }
}
