import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
import { DocumentManagement } from '../_models/document-management';
import { DocumentManagementService } from '../_services/document-managgement.service';
import { Router } from '@angular/router';

@Component( {
               moduleId: module.id,
               templateUrl: 'document-management.component.html',
               selector: 'document-management',
               providers: [ ConfirmationService ]
            } )
export class DocumentManagementComponent {
   msg: Message;
   listDocumentManagement: DocumentManagement [];
   busqueda: string;

   constructor( private documentManagementService: DocumentManagementService,
      private listaService: ListaService,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.documentManagementService.getAll().subscribe( data => {
         this.listDocumentManagement = data;
      } );
      this.busqueda = _nav.getSearch( 'document-management' );

   }

   add() {
      this.router.navigate( [ 'document-management/add' ] );
   }

   update( d: DocumentManagement ) {
      this.router.navigate( [ 'document-management/update/', d.idDocumentoTercero ] );
   }

   detail( d: DocumentManagement ) {
      this.router.navigate( [ 'document-management/detail/', d.idDocumentoTercero ] );
   }

   setSearch() {
      this._nav.setSearch( 'document-management', this.busqueda );
   }
}
