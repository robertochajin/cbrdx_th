import {Component, AfterViewInit} from '@angular/core';
import { TreeNode } from "primeng/components/common/api";
import { MenuManager } from "../../_models/menuManager";
import { MenuManagerService } from "../../_services/menuManager.service";
import {AuthenticationService} from "../../_services/authentication.service";
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
   listModulos: MenuManager[];
   listmenu: MenuManager[];
   treeMenu: TreeNode[] = [];
   constructor(
      private menuManagerService: MenuManagerService,
      private authService: AuthenticationService
   ) {
      authService.loginAnnounced$.subscribe(
         token => {
            if(token){
               // this.reloadNav();
            }
         }
      );

      authService.logoutAnnounced$.subscribe(
         token => {
            if (token == null){
               this.destroitNav();
            }
         }
      );
   }

   ngAfterViewInit() {
      this.reloadNav();

   }

   reloadNav() {
      this.menuManagerService.getByPadre(0).subscribe( mod => {
         this.listModulos = mod;
         this.listModulos.sort(function (a, b) {
            //return a.menu.localeCompare(b.menu);
            return a.secuencia - b.secuencia;
         });
         this.menuManagerService.getMenusSession().subscribe( men => {
            this.listmenu = men;
            this.listmenu.sort(function (a, b) {
               //return a.menu.localeCompare(b.menu);
               return a.secuencia - b.secuencia;
            });
            for ( let p of this.listModulos.filter( t => t.idPadre == 0 || t.idPadre == null ) ) {
               let chilNodes: TreeNode[] = [];
               for ( let c of this.listmenu.filter( t => t.idPadre == p.idMenu ) ) {
                  chilNodes.push( {
                     "label": c.menu,
                     "data": c,
                     "parent": p,
                  } );
               }
               let companyNode = {
                  "label": p.menu,
                  "data": p,
                  "children": chilNodes,
               };
               if(chilNodes.length > 0){
                  this.treeMenu.push( companyNode );
               }
            }
         } );
      } );
   }

   destroitNav(){
      this.treeMenu = [];
   }
}
