import { Component, OnInit } from '@angular/core';
import { Risks } from '../_models/risks';
import { RisksService } from '../_services/risks.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Adjunto } from '../_models/adjuntos';
import { AdjuntosService } from '../_services/adjuntos.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'adjuntos.component.html',
               selector: 'adjuntos.component',
               providers: [ ConfirmationService ]
            } )

export class AdjuntosComponent implements OnInit {

   adjunto: Adjunto = new Adjunto();
   adjuntos: Adjunto[]=[];
   msgs: Message[] = [];
   busqueda: string;
   fileupload: boolean = true;
   // svcSpUrl = '<%= SVC_TH_URL %>/api/fileUpload';
   svcSpUrl = '';

   constructor( private risksService: RisksService,
      private router: Router,
      private navService: NavService,
      private adjuntosService: AdjuntosService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = this.navService.getSearch( 'adjuntos.component' );
   }

   ngOnInit() {

   }

   uploadingOk( event: any ) {
      this.adjuntos = [];
      this.adjuntosService.listAdjuntos( ).subscribe( rest => {
         this.adjuntos = rest;
      } );
      this.navService.setMesage( 1, this.msgs );
      this.fileupload = true;
   }

   onBeforeSend( event: any ) {
      if ( this.adjunto.nombre !== null && this.adjunto.nombre !== undefined && this.adjunto.nombre !== '' ) {
            this.adjuntosService.addAdjunto(this.adjunto).subscribe(data=>{
               event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
               console.info( event );
               event.formData.append( 'idAdjunto', data.idAdjunto );
            });
      } else {
         this.navService.setMesage( 0, { severity: 'error', summary: 'Error', detail: 'Nombre de archivo requerido' } );
      }
   }

   onSubmit() {

   }

   update( r: Risks ) {

   }

   setSearch() {
      this.navService.setSearch( 'risks.component', this.busqueda );
   }

   nombreArchivo() {
      if ( this.adjunto.nombre !== null && this.adjunto.nombre !== undefined && this.adjunto.nombre == '' ) {
         this.fileupload = false;
      } else {
         this.fileupload = true;
      }
   }

}
