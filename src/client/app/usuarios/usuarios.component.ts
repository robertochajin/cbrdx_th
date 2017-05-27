import { Component } from '@angular/core';
import { Usuario } from '../_models/usuario';
import { UsuariosService } from '../_services/usuarios.service';
import { Router } from '@angular/router';
import { VUsuario } from '../_models/vUsuario';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: './usuarios.component.html',
               selector: 'usuarios-component'
            } )
export class UsuariosComponent {

   usuario: Usuario = new Usuario();
   usuarios: VUsuario[];
   usuariosFull = false;
   busqueda: string;

   constructor( private UsuariosService: UsuariosService,
      private router: Router,
      private navService: NavService) {
      this.busqueda = this.navService.getSearch( 'usuarios.component' );
      this.showData( this.busqueda );
   }

   addUser() {
      this.router.navigate( [ 'usuarios/add' ] );
   }

   editUser( c: number ) {
      this.router.navigate( [ 'usuarios/edit', c ] );
   }

   viewUser( c: number ) {
      this.router.navigate( [ 'usuarios/detail', c ] );
   }

   showData( s: any ) {
      if ( s.length > 0 ) {
         this.UsuariosService.listVUsers().subscribe(
            usuarios => {
               this.usuarios = usuarios.filter( t => t.nombre !== null && t.nombre.toLowerCase()
               .includes( s.toLowerCase() ) || t.usuario !== null && t.usuario.toLowerCase()
               .includes( s.toLowerCase() ) || t.documento !== null && t.documento.includes( s ) );
               if(this.usuarios.length>0){
                  this.usuariosFull = true;
               }else{
                  this.usuariosFull = false;
               }
            } );
      } else {
         this.usuarios = [];
         this.usuariosFull = false;
      }
   }
   setSearch() {
      this.navService.setSearch( 'usuarios.component', this.busqueda );
   }
}
