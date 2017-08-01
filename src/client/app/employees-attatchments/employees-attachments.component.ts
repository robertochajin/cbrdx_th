import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { EmployeesAttachmentService } from '../_services/employeesAttachment.service';
import { DocumentoTercero } from '../_models/documentDownload';
import { Employee } from '../_models/employees';
import { JwtHelper } from 'angular2-jwt';
import { ConstanteService } from '../_services/constante.service';
import { DocumentoRelacionTercero } from '../_models/DocumentoRelacionTercero';
import { PermissionsEmployees } from '../_models/permissionsEmployees';
import * as FileSaver from 'file-saver';
import { AdjuntosService } from '../_services/adjuntos.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'employees-attachments.component.html',
               selector: 'employees-attachments',
               providers: [ ConfirmationService ]
            } )
export class EmployeesAttachmentsComponent implements OnInit {

   @Input() employee: Employee;
   @Input() seccion: PermissionsEmployees;
   msgs: Message[];
   acordion: number = 0;
   listDownloadDocuments: DocumentoTercero[] = [];
   listAttachmentDocuments: DocumentoTercero[] = [];
   cargando: number = 0;
   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   jwtHelper: JwtHelper = new JwtHelper();
   dataUploadUsuario: any = '';
   dataUploadArchivo: any = '';
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   fsize: number = 50000000;
   ftype: string = '';
   documentoRelacionTercero: DocumentoRelacionTercero = new DocumentoRelacionTercero();
   public url = '';
   public title = '';
   previewUrl = '<%= SVC_TH_URL %>/api/adjuntos/preview';
   displayDialog: boolean = false;
   disabled: boolean = false;

   constructor( private router: Router,
      private _nav: NavService,
      private employeesAttachmentService: EmployeesAttachmentService,
      private constanteService: ConstanteService,
      private confirmationService: ConfirmationService,
      private navService: NavService,
      private adjuntosService: AdjuntosService ) {

      let token = localStorage.getItem( 'token' );
      this.usuarioLogueado = this.jwtHelper.decodeToken( token );

      this.constanteService.getByCode( 'FTYPE' ).subscribe( data => {
         if ( data.valor ) {
            this.ftype = data.valor;
         }
      } );
      this.constanteService.getByCode( 'FSIZE' ).subscribe( data => {
         if ( data.valor ) {
            this.fsize = Number( data.valor );
         }
      } );
   }

   ngOnInit(): void {
      this.employeesAttachmentService.getAllAdjuntos().subscribe( res => {
         this.listAttachmentDocuments = res;
         this.employeesAttachmentService.getAllDocumentosRelacionTercero().subscribe( dr => {
            dr.map( d => {
               this.listAttachmentDocuments.map( doc => {
                  if ( doc.idDocumentoTercero === d.idDocumentoTercero && d.idTercero === this.employee.idTercero && d.indicadorHabilitado ) {
                     doc.idAdjunto = d.idAdjunto;
                  }
               } );
            } );
         } );

      } );

      this.employeesAttachmentService.getAllDescarga().subscribe( res => {
         this.listDownloadDocuments = res;
      } );
   }

   download( d: DocumentoTercero ) {
      this.adjuntosService.downloadFile( d.idAdjunto ).subscribe( res => {
         this.adjuntosService.getFileName( d.idAdjunto ).subscribe( adj => {
            saveAs( res, adj.nombreArchivo );
         } );
      } );
   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();
   }

   uploadingOk( event: any, d: DocumentoTercero ) {
      this.cargando = 0;
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         d.idAdjunto = respuesta.idAdjunto;

         this.documentoRelacionTercero.idDocumentoTercero = d.idDocumentoTercero;
         this.documentoRelacionTercero.idAdjunto = respuesta.idAdjunto
         this.documentoRelacionTercero.idTercero = this.employee.idTercero;
         this.documentoRelacionTercero.indicadorHabilitado = true;

         this.employeesAttachmentService.addDocumentoRelacionTercero( this.documentoRelacionTercero ).subscribe( data => {
            this._nav.setMesage( 1, this.msgs );
         } );
      }
   }

   onBeforeSend( event: any, dato: DocumentoTercero ) {
      this.cargando = dato.idDocumentoTercero;
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '" + this.dataUploadArchivo + "', 'ruta':" +
                " '/Gestionamos/Terceros/" + this.employee.tipoDocumento + "_" + this.employee.numeroDocumento + "/Requisitos Generales' }";
      event.formData.append( 'obj', obj.toString() );
   }

   onSelect( event: any, file: any ) {
      this.dataUploadArchivo = file[ 0 ].name;
      this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;
   }

   previewFile( f: DocumentoTercero ) {
      this.adjuntosService.downloadFile( f.idAdjunto ).subscribe( res => {
         let blob_url = URL.createObjectURL( res );

         this.url = blob_url;
         this.title = f.nombre;
         this.displayDialog = true;
      } );
   }

   deleteFile( f: DocumentoTercero ) {
      this.confirmationService.confirm( {
                                           message: `¿Está seguro que desea Inactivar el adjunto?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',

                                           accept: () => {
                                              this.employeesAttachmentService.getDocumentoRelacionTercero( f.idAdjunto ).subscribe( res => {
                                                 f.idAdjunto = null;
                                                 res.indicadorHabilitado = false;
                                                 this.employeesAttachmentService.updateDocumentoRelacionTercero( res ).subscribe( data => {
                                                    this._nav.setMesage( 2, null );
                                                 } );
                                              } );
                                           }
                                        } );

   }
}
