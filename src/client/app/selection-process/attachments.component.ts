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
import { JwtHelper } from 'angular2-jwt';
import { AdjuntosService } from '../_services/adjuntos.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'attachments.component.html',
               selector: 'adjuntos-step',
               providers: [ ConfirmationService ]
            } )

export class AttachmentsComponent implements OnInit {

   @Input() candidateProcess: CandidateProcess;
   adjunto: Attachments = new Attachments();
   listAttachments: Attachments[] = [];
   private stepStates: ListaItem[] = [];
   msgs: Message[] = [];
   fileupload: boolean = false;
   svcSpUrl = '<%= SVC_TH_URL %>/api/procesoSeleccionAdjuntos';
   fileThUrl = '<%= SVC_TH_URL %>/api/adjuntos/file';
   previewUrl = '<%= SVC_TH_URL %>/api/adjuntos/preview';
   url = '';
   title = '';
   displayDialog: boolean = false;
   readonly: boolean = false;
   validfile: boolean = false;
   usuarioLogueado: any;
   idRol: number;
   jwtHelper: JwtHelper = new JwtHelper();

   constructor( private risksService: RisksService,
      private router: Router,
      private navService: NavService,
      private listaService: ListaService,
      private attachmentsService: AttachmentsService,
      private confirmationService: ConfirmationService,
      private adjuntosService: AdjuntosService ) {

      let token = localStorage.getItem( 'token' );
      if ( token !== null ) {
         this.usuarioLogueado = this.jwtHelper.decodeToken( token );
      }

   }

   ngOnInit() {
      this.adjunto.idTerceroPublicacion = this.candidateProcess.idTerceroPublicacion;
      this.adjunto.idProcesoPaso = this.candidateProcess.idProcesoPaso;
      this.attachmentsService.listAttachments( this.adjunto.idProcesoPaso, this.adjunto.idTerceroPublicacion ).subscribe( rest => {
         this.listAttachments = rest;
      } );
      this.listaService.getMasterDetails( 'ListasEstadosDiligenciados' ).subscribe( res => {
         this.stepStates = res;
         if ( this.candidateProcess.idEstadoDiligenciado === this.getIdStateByCode( 'RECH' ) ||
              this.candidateProcess.idEstadoDiligenciado === this.getIdStateByCode( 'APROB' ) ) {
            this.readonly = true;
         } else {
            this.readonly = false;
         }
      } );

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
      this.adjunto.ruta = '/Gestionamos//Proceso de selección';
      event.formData.append( 'obj', JSON.stringify( this.adjunto ) );
   }

   uploadingOk( event: any ) {
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto ) {
         this.adjunto.nombre = null;
         this.navService.setMesage( 0, { severity: 'success', summary: 'Exito', detail: 'Archivo subido con exito' } );
      } else {
         this.navService.setMesage( 0, { severity: 'error', summary: 'Error', detail: 'Error al subir archivo' } );
      }
      this.listAttachments = [];
      this.attachmentsService.listAttachments( this.adjunto.idProcesoPaso, this.adjunto.idTerceroPublicacion ).subscribe( rest => {
         this.listAttachments = rest;
      } );

   }

   previewFile( f: Attachments ) {
      this.adjuntosService.downloadFile( f.idAdjunto ).subscribe( res => {
         let blob_url = URL.createObjectURL( res );

         this.url = blob_url;
         this.title = f.nombre;
         this.displayDialog = true;
      } );
   }

   downloadFile( f: Attachments ) {
      this.adjuntosService.downloadFile( f.idAdjunto ).subscribe( res => {
         this.adjuntosService.getFileName( f.idAdjunto ).subscribe( adj => {
            saveAs( res, adj.nombreArchivo );
         } );
      } );
   }

   prepareForm() {
      //Se verifica el estado del paso y la la necesidad de mostrar o nó la asignación de fecha
      if ( this.getIdStateByCode( 'VAC' ) === this.candidateProcess.idEstadoDiligenciado ) {
         this.readonly = true;
      } else if ( this.getIdStateByCode( 'PROG' ) === this.candidateProcess.idEstadoDiligenciado ) {
         this.readonly = false;
         // verificar si el usuario en sesion es responsable para mostrar solo lectura de datos
         if ( this.usuarioLogueado.usuario.idUsuario === this.candidateProcess.idResponsable ) {
            this.readonly = true;
         } else {
            this.readonly = false;
         }
      } else if ( this.getIdStateByCode( 'APROB' ) === this.candidateProcess.idEstadoDiligenciado ) {
         this.readonly = true;
      } else if ( this.getIdStateByCode( 'RECH' ) === this.candidateProcess.idEstadoDiligenciado ) {
         this.readonly = true;
      } else if ( this.getIdStateByCode( 'NA' ) === this.candidateProcess.idEstadoDiligenciado ) {

      }

   }

}
