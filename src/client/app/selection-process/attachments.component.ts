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
   fileupload: boolean = false;
   svcSpUrl = '<%= SVC_TH_URL %>/api/procesoSeleccionAdjuntos';
   readonly: boolean = false;
   validfile: boolean = false;

   constructor( private risksService: RisksService,
      private router: Router,
      private navService: NavService,
      private listaService: ListaService,
      private adjuntosService: AttachmentsService,
      private confirmationService: ConfirmationService ) {

      this.listaService.getMasterDetails( 'ListasEstadosDiligenciados' ).subscribe( res => {
         this.stepStates = res;
      } );
   }

   ngOnInit() {
      if ( this.candidateProcess.idEstadoDiligenciado === this.getIdStateByCode( 'RECH' ) ||
           this.candidateProcess.idEstadoDiligenciado === this.getIdStateByCode( 'APROB' ) ) {
         this.readonly = true;
      } else {
         this.readonly = false;
      }
      this.adjunto.idTerceroPublicacion = this.candidateProcess.idTerceroPublicacion;
      this.adjunto.idProcesoPaso = this.candidateProcess.idProcesoPaso;
   }

   getIdStateByCode( code: string ): number {
      let state: ListaItem = this.stepStates.find( s => s.codigo === code );
      if ( state !== undefined ) {
         return state.idLista;
      } else {
         return 0;
      }
   }

   nombreArchivo() {
      if ( this.adjunto.nombre !== null && this.adjunto.nombre !== undefined && this.adjunto.nombre == '' ) {
         this.fileupload = false;
         this.validfile = true;
      } else {
         this.fileupload = true;
         this.validfile = false;
      }
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      event.formData.append( 'obj', JSON.stringify( this.adjunto ) );
   }

   uploadingOk( event: any ) {
      // let respuesta = JSON.parse(event.xhr.response);
      // data.idTerceroCentralRiesgo = respuesta.idTerceroCentralRiesgo;
      // data.idAdjunto = respuesta.idAdjunto;
      // this.adjuntos = [];
      // this.adjuntosService.listAdjuntos().subscribe( rest => {
      //    this.adjuntos = rest;
      // } );
      // this.navService.setMesage( 1, this.msgs );
      // this.fileupload = true;
   }

   previewFile( f: Attachments ) {
      // let link = 'https://www.subes.sep.gob.mx/archivos/tutor/manual_general.pdf';
      // this.url = this.previewUrl+'/'+ f.idAdjunto;
      // this.title = f.nombre;
      // this.displayDialog = true;

   }

   downloadFile( f: Attachments ) {

      // this.selectionStepService.downloadFile( f.idAdjunto ).subscribe(res => {
      //    window.location.assign(res);
      // });
   }

}
