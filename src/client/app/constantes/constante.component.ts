import { Component, OnInit } from '@angular/core';
import { VConstante } from '../_models/vconstante';
import { ConstanteService } from '../_services/constante.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
@Component( {
               moduleId: module.id,
               templateUrl: 'constante.component.html',
               selector: 'constante-list'
            } )
export class ConstanteComponent implements OnInit {

   listadoConstantes: VConstante[];
   busqueda: string;

   constructor( private constanteService: ConstanteService, private router: Router, private navService: NavService ) {
      this.busqueda = this.navService.getSearch( 'constante.component' );
   }

   ngOnInit(): void {
      this.constanteService.listConstants().subscribe( res => this.listadoConstantes = res );
   }

   addConstant() {
      this.router.navigate( [ 'constantes/add' ] );
   }

   editConstant( constanData: VConstante ) {
      this.router.navigate( [ 'constantes/edit/', constanData.idConstante ] );
   }

   viewConstant( constanData: VConstante ) {
      this.router.navigate( [ 'constantes/detail/', constanData.idConstante ] );
   }

   setSearch() {
      this.navService.setSearch( 'constante.component', this.busqueda );
   }
}
