import { Component } from '@angular/core';
import { Rol } from '../_models/rol';
import { RolesService } from '../_services/roles.service';
import { Router } from '@angular/router';
import { NavService } from '../_services/_nav.service';
@Component( {
               moduleId: module.id,
               templateUrl: 'roles.component.html'
            } )
export class RolesComponent {

   roles: Rol[];
   busqueda: string;
   constructor( private rolesService: RolesService, private router: Router, private navService:NavService ) {
      this.busqueda = this.navService.getSearch( 'roles.component' );
      rolesService.listRoles().subscribe( res => {
         this.roles = res;
      } );
   }

   add() {
      this.router.navigate( [ 'roles/add' ] );
   }

   update( r: Rol ) {
      this.router.navigate( [ 'roles/update/' + r.idRol ] );
   }
   setSearch() {
      this.navService.setSearch( 'roles.component', this.busqueda );
   }
}
