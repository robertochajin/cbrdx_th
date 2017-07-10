import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { DocumentsDownloadService } from '../_services/documentsDownload.service';
import { DocumentDownload } from '../_models/documentDownload';
import { Employee } from '../_models/employees';

@Component( {
               moduleId: module.id,
               templateUrl: 'download-documents.component.html',
               selector: 'download-documents',
               providers: [ ConfirmationService ]
            } )
export class DocumentsDownloadComponent implements OnInit {

   // @Input()
   // tercero: Employee;

   tercero: Employee = new Employee();
   acordion: number = 0;
   listDownloadDocuments: DocumentDownload[] = [];
   listAttachmentDocuments: DocumentDownload[] = [];

   constructor( private router: Router,
      private _nav: NavService,
      private documentsDownloadService: DocumentsDownloadService,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {

      this.tercero.idTercero = 129;
   }

   ngOnInit(): void {
      this.documentsDownloadService.getAllCargaByTercero( this.tercero.idTercero ).subscribe( res => {
         this.listAttachmentDocuments = res;
      } );

      this.documentsDownloadService.getAllDescargaByTercero( this.tercero.idTercero ).subscribe( res => {
         this.listDownloadDocuments = res;
      } );
   }

   download( d: DocumentDownload ) {
      this.documentsDownloadService.getFile( d.idAdjunto ).subscribe( res => {
         window.location.assign( res );
      } );
   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();
   }
}
