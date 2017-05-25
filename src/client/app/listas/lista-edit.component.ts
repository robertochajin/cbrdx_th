import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lista } from '../_models/lista';
import { ListaService } from '../_services/lista.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ListaItem } from '../_models/listaItem';
import { Message } from 'primeng/primeng';
import 'rxjs/add/operator/switchMap';
import { NavService } from '../_services/_nav.service';
import { FormSharedModule } from '../shared/form-shared.module';
import { ConstanteService } from '../_services/constante.service';
import { Rol } from '../_models/rol';
import { RolesService } from '../_services/roles.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'lista-edit.component.html'
            } )
export class ListaEditComponent implements OnInit {
   masterList: Lista = new Lista();
   othersDetailsList: ListaItem[];
   detailsList: ListaItem[];
   editableDetail: ListaItem = new ListaItem();
   codeExists = false;
   detailCodeExists = false;
   isEnabled = true;
   displayDialog = false;
   displayReturnDialog = false;
   displayDetailDialog = false;
   isEdit = false;
   displayUpdateDialog = false;
   msgs: Message[] = [];
   constante: string[] = [];
   roles: Rol[] = [];

   constructor( private listaService: ListaService,
      private router: Router,
      private route: ActivatedRoute,
      private rolesService: RolesService,
      private constanteService: ConstanteService,
      private _nav: NavService, ) {
   }

   ngOnInit(): void {
      this.route.params.switchMap( ( params: Params ) => this.listaService.getMaster( +params[ 'id' ] ) )
      .subscribe( data => {
         this.masterList = data;
         this.listaService.getMasterAllDetails( this.masterList.nombreTabla ).subscribe( res => {
            this.detailsList = res;
         } );
      } );
      this.constanteService.listConstants().subscribe( data => {
         let temp2: string;
         let temp = data.find( c => c.constante === 'ADMLIS' );

         this.rolesService.listRoles().subscribe( data => {
            if ( temp ) {
               temp2 = temp.valor;
               this.constante = temp2.split( ',' );
               if ( this.constante.length > 0 ) {
                  for ( let c of this.constante ) {
                     let rol = data.find( r => r.codigoRol === c );
                     if ( rol ) {
                        this.roles.push( rol );
                     }
                  }
               } else {
                  this.roles = data;
               }
            } else {
               this.roles = data;
            }
         } );
      } );
   }

   clearMaster() {
      this.listaService.getMaster( this.masterList.idLista ).subscribe( res => {
         this.masterList = res;
         this.displayDialog = false;
      } );
   }

   createMaster( f: NgForm ) {
      this.listaService.updateMaster( this.masterList ).then( res => {
         this._nav.setMesage( 1, this.msgs );
      } );
   }

   validateDetailCode() {
      if ( this.detailsList ) {
         if ( this.isEdit ) {
            this.detailCodeExists = this.detailsList.filter( s => s.idLista !== this.editableDetail.idLista )
                                    .filter( t => t.codigo === this.editableDetail.codigo ).length > 0;
         } else {
            this.detailCodeExists = this.detailsList.filter( t => t.codigo === this.editableDetail.codigo ).length > 0;
         }
      }
   }

   childInputCleanUp( value: string ) {
      this.editableDetail.codigo = value.toUpperCase().replace( /[^A-Z]/g, '' ).replace( ' ', '' ).trim();
   }

   createDetail( f: NgForm ) {
      this.msgs = [];
      this.editableDetail.orden = 2; // pendiente definir ordenamiento de los items
      this.listaService.createDetail( this.editableDetail, this.masterList.nombreTabla ).then( res => {
         this._nav.setMesage( 1, this.msgs );
         this.editableDetail = new ListaItem;
         this.isEdit = true;
         this.listaService.getMasterAllDetails( this.masterList.nombreTabla ).subscribe( res => {
            this.isEdit = false;
            this.detailsList = res;
         } );
      } );
   }

   updateDetail( f: NgForm ) {
      this.msgs = [];
      this.listaService.updateDetail( this.editableDetail, this.masterList.nombreTabla ).then( res => {
         this._nav.setMesage( 2, this.msgs );
         this.editableDetail = new ListaItem;
         this.isEdit = false;
         this.listaService.getMasterAllDetails( this.masterList.nombreTabla ).subscribe( res => {
            this.detailsList = res;
         } );
      } );
   }

   detailEdit( event: ListaItem ) {
      this.listaService.getDetail( this.masterList.nombreTabla, event.idLista ).subscribe( res => {
         this.isEdit = true;
         this.editableDetail = res;
      } );
   }

   clearDetail() {
      this.displayDetailDialog = false;
      if ( this.isEdit ) {
         this.isEdit = false;
      }
      this.editableDetail = new ListaItem;
      this.listaService.getMasterAllDetails( this.masterList.nombreTabla ).subscribe( res => {
         this.detailsList = res;
      } );
   }

   goBack(): void {
      this.router.navigate( [ 'listas' ] );
   }
   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }
}
