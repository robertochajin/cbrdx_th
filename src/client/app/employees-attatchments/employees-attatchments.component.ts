import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { DocumentsDownloadService } from '../_services/documentsDownload.service';
import { DocumentoTercero } from '../_models/documentDownload';
import { Employee } from '../_models/employees';
import { JwtHelper } from 'angular2-jwt';
import { ConstanteService } from '../_services/constante.service';
import { DocumentoRelacionTercero } from '../_models/DocumentoRelacionTercero';

@Component( {
               moduleId: module.id,
               templateUrl: 'employees-attatchments.component.html',
               selector: 'employees-attatchments',
               providers: [ ConfirmationService ]
            } )
export class EmployeesAttatchmentsComponent implements OnInit {

   // @Input()
   // tercero: Employee;

   tercero: Employee = new Employee();
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

   constructor( private router: Router,
      private _nav: NavService,
      private documentsDownloadService: DocumentsDownloadService,
      private constanteService: ConstanteService,
      private confirmationService: ConfirmationService,
      private navService: NavService ) {

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

      this.tercero.idTercero = 129;
   }

   ngOnInit(): void {
      this.documentsDownloadService.getAllAdjuntos().subscribe( res => {
         this.listAttachmentDocuments = res;
      } );

      this.documentsDownloadService.getAllDescarga().subscribe( res => {
         this.listDownloadDocuments = res;
      } );
   }

   download( d: DocumentoTercero ) {
      this.documentsDownloadService.getFile( d.idAdjunto ).subscribe( res => {
         window.location.assign( res );
      } );
   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();
   }

   uploadingOk( event: any ) {
      this.cargando = 0;
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         this.documentoRelacionTercero.idAdjunto = respuesta.idAdjunto;
         this.documentsDownloadService.add( this.documentoRelacionTercero ).subscribe( res => {
            this.documentsDownloadService.getAllDescarga().subscribe( res => {
               this.listDownloadDocuments = res;
            } );

            this._nav.setMesage( 1, this.msgs );
         } );
      }
   }

   onBeforeSend( event: any, dato: DocumentoTercero ) {
      this.cargando = dato.idDocumentoTercero;
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '" + this.dataUploadArchivo + "'}";
      event.formData.append( 'obj', obj.toString() );
   }

   onSelect( event: any, file: any, d: DocumentoTercero ) {
      this.dataUploadArchivo = file[ 0 ].name;
      this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;

      this.documentoRelacionTercero.idDocumentoTercero = d.idDocumentoTercero;
      this.documentoRelacionTercero.idTercero = this.tercero.idTercero;
      this.documentoRelacionTercero.indicadorHabilitado = true;
   }

   onError(event: any){
      this._nav.setMesage( 3, this.msgs );
   }
}
