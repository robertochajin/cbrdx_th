import { Component, Input, OnInit } from '@angular/core';
import { Risks } from '../_models/risks';
import { RisksService } from '../_services/risks.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { Attachments } from '../_models/attachments-step';
import { AttachmentsService } from '../_services/attachments-step.service';
import { CandidateProcess } from '../_models/candidateProcess';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'attachments.component.html',
               selector: 'adjuntos-step',
               providers: [ ConfirmationService ]
            } )

export class AttachmentsComponent implements OnInit {

   @Input() candidateProcess: CandidateProcess;
   adjunto: Attachments = new Attachments();
   adjuntos: Attachments[] = [];
   private stepStates: ListaItem[] = [];
   msgs: Message[] = [];
   busqueda: string;
   fileupload: boolean = false;
   // svcSpUrl = '<%= SVC_TH_URL %>/api/fileUpload';
   svcSpUrl = '';
   readonly : boolean = false;

   constructor( private risksService: RisksService,
      private router: Router,
      private navService: NavService,
      private listaService: ListaService,
      private adjuntosService: AttachmentsService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = this.navService.getSearch( 'adjuntos.component' );

      this.listaService.getMasterDetails( 'ListasEstadosDiligenciados' ).subscribe( res => {
         this.stepStates = res;
      } );
   }

   ngOnInit() {
      if ( this.candidateProcess.idEstadoDiligenciado=== this.getIdStateByCode('RECH') ||
           this.candidateProcess.idEstadoDiligenciado=== this.getIdStateByCode('APROB')) {
         this.readonly=true;
      }else{
         this.readonly=false;
      }
      this.candidateProcess;
   }

   uploadingOk( event: any ) {
      this.adjuntos = [];
      this.adjuntosService.listAdjuntos().subscribe( rest => {
         this.adjuntos = rest;
      } );
      this.navService.setMesage( 1, this.msgs );
      this.fileupload = true;
   }

   onBeforeSend( event: any ) {
      if ( this.adjunto.nombre !== null && this.adjunto.nombre !== undefined && this.adjunto.nombre !== '' ) {
         this.adjuntosService.addAdjunto( this.adjunto ).subscribe( data => {
            event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
            console.info( event );
            event.formData.append( 'idAdjunto', data.idAdjunto );
         } );
      } else {
         this.navService.setMesage( 0, { severity: 'error', summary: 'Error', detail: 'Nombre de archivo requerido' } );
      }
   }

   onSubmit() {

   }

   getIdStateByCode( code: string ): number {
      let state: ListaItem = this.stepStates.find( s => s.codigo === code );
      if ( state !== undefined ) {
         return state.idLista;
      } else {
         return 0;
      }
   }

   update( r: Risks ) {

   }

   setSearch() {
      this.navService.setSearch( 'adjuntos.component', this.busqueda );
   }

   nombreArchivo() {
      if ( this.adjunto.nombre !== null && this.adjunto.nombre !== undefined && this.adjunto.nombre == '' ) {
         this.fileupload = false;
      } else {
         this.fileupload = true;
      }
   }

}
