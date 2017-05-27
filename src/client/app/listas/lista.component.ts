/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 25/02/2017.
 */
import { Component } from '@angular/core';
import { Lista } from '../_models/lista';
import { ListaService } from '../_services/lista.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
import { JwtHelper } from 'angular2-jwt';
import { UsuariosService } from '../_services/usuarios.service';
import { RolesService } from '../_services/roles.service';
@Component( {
               moduleId: module.id,
               templateUrl: 'lista.component.html'
            } )
export class ListaComponent {
   listadoListas: Lista[];
   busqueda: string;
   usuarioLogueado: any;
   idRol: number;
   jwtHelper: JwtHelper = new JwtHelper();

   constructor( private listaService: ListaService,
      private router: Router,
      private navService: NavService,
      private rolesService: RolesService,
      private usuariosService: UsuariosService ) {
      this.busqueda = this.navService.getSearch( 'listas.component' );
      listaService.getMasterList().subscribe( res => {
         this.listadoListas = res;
         let token = localStorage.getItem( 'token' );
         if ( token !== null ) {
            this.usuarioLogueado = this.jwtHelper.decodeToken( token );
         }
         this.rolesService.listRoles().subscribe( res => {
            if ( this.usuarioLogueado.authorities.length > 0 ) {
               for ( let r of res ) {
                  if ( r.rol === this.usuarioLogueado.authorities[ 0 ].authority ) {
                     this.idRol = r.idRol;
                  }
               }
            }
         } );

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
