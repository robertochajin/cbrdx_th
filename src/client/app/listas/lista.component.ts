/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 25/02/2017.
 */
import { Component } from '@angular/core';
import { Lista } from '../_models/lista';
import { ListaService } from '../_services/lista.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
@Component( {
               moduleId: module.id,
               templateUrl: 'lista.component.html'
            } )
export class ListaComponent {
   listadoListas: Lista[];
   busqueda:string;

   constructor( private listaService: ListaService, private router: Router, private navService:NavService ) {
      this.busqueda = this.navService.getSearch( 'listas.component' );
      listaService.getMasterList().subscribe( res => {
         this.listadoListas = res;
      } );
   }

   editList( data: Lista ) {
      this.router.navigate( [ 'listas/edit/', data.idLista ] );
   }

   viewList( data: Lista ) {
      this.router.navigate( [ 'listas/detail/', data.idLista ] );
   }

   addList() {
      this.router.navigate( [ 'listas/add' ] );
   }
   setSearch() {
      this.navService.setSearch( 'listas.component', this.busqueda );
   }
}
