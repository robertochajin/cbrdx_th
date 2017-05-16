import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuManagerService } from '../_services/menuManager.service';
import { MenuManager } from '../_models/menuManager';
import { TreeNode } from 'primeng/components/common/api';
import { Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'menuManager.component.html',
               selector: 'menu-manager',

            } )
export class MenuManagerComponent {
   msg: Message;
   menus: MenuManager = new MenuManager();
   listmenu: MenuManager[];

   treeMenu: TreeNode[] = [];
   selectedNode: TreeNode;
   modulo = true;
   header: string;
   displayDialog = false;
   codeExists = false;
   guardando = false;

   constructor( private router: Router,
      private menuManagerService: MenuManagerService,
      private navService: NavService) {
      menuManagerService.getAll().subscribe( res => {
         this.listmenu = res;
         for ( let c of this.listmenu.filter( t => t.idPadre === 0 || t.idPadre === null ) ) {
            let companyNode = {
               'label': c.menu,
               'data': c,
               'leaf': false,
            };
            this.treeMenu.push( companyNode );
         }
         this.newModule();
      } );
   }

   validateCode() {
      if ( this.menus.codigoMenu !== '' && this.menus.codigoMenu !== null && this.menus.codigoMenu !== undefined) {
         this.codeExists = this.listmenu.filter(
               t => (t.codigoMenu === this.menus.codigoMenu && t.idMenu !== this.menus.idMenu ) ).length > 0;
      } else {
         this.codeExists = false;
      }

   }

   capitalizeCode() {
      let input = this.menus.codigoMenu;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.menus.codigoMenu = input.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
      }
   }

   capitalizeName() {
      let input = this.menus.menu;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.menus.menu = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }

   newModule() {
      this.menus = new MenuManager();
      this.header = 'Nuevo Módulo';
      this.menus.idPadre = 0;
      this.codeExists = false;
      this.modulo = true;
   }

   newMenu() {
      this.menus = new MenuManager();
      this.header = 'Nuevo menú';
      this.menus.idPadre = this.selectedNode.data.idMenu;
      this.codeExists = false;
      this.modulo = false;
   }

   nodeExpand( node: any ) {
      let chilNodes: TreeNode[] = [];
      for ( let c of this.listmenu.filter( t => t.idPadre === node.data.idMenu ) ) {
         chilNodes.push( {
                            'label': c.menu,
                            'data': c,
                            'parent': node,
                            'leaf': true,
                            'children': []
                         } );
      }
      node.children = chilNodes;

   }

   nodeSelect( node: any ) {

      if ( node.data.idPadre === 0 || node.data.idPadre === null || node.data.idPadre === undefined ) {
         this.modulo = true;
         this.header = 'Módulo';

      } else {
         this.modulo = false;
         this.header = 'Menú';
      }
      this.menuManagerService.view( node.data.idMenu ).subscribe(
         menus => {
            this.menus = menus;
            this.codeExists = false;
         } );

   }

   save() {

      if ( this.menus.idMenu === null || this.menus.idMenu === 0 || this.menus.idMenu === undefined ) {
         this.guardando = true;
         this.menuManagerService.add( this.menus ).then( data => {
            this.guardando = false;
            let typeMessage = 1; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
            let newChil: any = {
               'label': this.menus.menu,
               'data': data,
               'children': []
            };
            this.listmenu.push( data );
            if ( this.menus.idPadre === 0 || this.menus.idPadre === null || this.menus.idPadre === undefined ) {
               this.treeMenu.push( newChil );
               this.selectedNode = newChil;
               this.newModule();

            } else {
               this.selectedNode.children.push( newChil );
               this.newMenu();
            }
         }, error => {
            this.guardando = false;
            let typeMessage = 3; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
         } );
      } else {
         this.menuManagerService.update( this.menus ).then( data => {
            this.guardando = false;
            let typeMessage = 2; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
            this.selectedNode.data = this.menus;
            this.selectedNode.label = this.menus.menu;
            this.header = this.menus.menu;
            for ( let i = 0; i < this.listmenu.length; i++ ) {
               if ( this.listmenu[ i ].idMenu === this.menus.idMenu ) {
                  this.listmenu[ i ] = this.menus;
                  return;
               }
            }
         }, error => {
            this.guardando = false;
            let typeMessage = 3; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
         } );
      }
   }

   doCancel() {
      if ( this.menus.idMenu === null || this.menus.idMenu === 0 || this.menus.idMenu === undefined ) {
         this.menus = new MenuManager;
      } else {
         this.menuManagerService.view( this.menus.idMenu ).subscribe( res => {
            this.menus = res;
         } );
      }
      this.displayDialog = false;
   }
}
