import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';
import { DocumentManagement } from '../_models/document-management';
import { DocumentManagementService } from '../_services/document-managgement.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'document-management.component.html',
               selector: 'document-management',
               providers: [ ConfirmationService ]
            } )
export class DocumentManagementComponent {
   msg: Message;
   listDocumentManagement: DocumentManagement [];

   constructor( private documentManagementService: DocumentManagementService,
      private listaService: ListaService,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.documentManagementService.getAll().subscribe( data => {
         this.listDocumentManagement = data;
      } );

   }

   add() {
   }

   update() {
   }

   detail() {
   }

}
