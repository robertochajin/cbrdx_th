import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { DocumentManagementService } from '../_services/document-managgement.service';
import { DocumentManagement } from '../_models/document-management';
import { JwtHelper } from 'angular2-jwt';
import { ConstanteService } from '../_services/constante.service';
import { AdjuntosService } from '../_services/adjuntos.service';

@Component( {
               moduleId: module.id,
               selector: 'document-manegement-add',
               templateUrl: 'document-management-detail.component.html',
               providers: [ ConfirmationService ]
            } )

export class DocumentManagementDetailComponent implements OnInit {

   @Input()
   documentManagement: DocumentManagement = new DocumentManagement();
   msgs: Message[];
   listTypeDoc: SelectItem[] = [];
   listValidity: SelectItem[] = [];
   listAdjDes: SelectItem[] = [];
   accion: number;
   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   dataUploadArchivo: any = '';
   dataUploadUsuario: any = '';
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';
   clasificacion: string = '';

   constructor( private documentManagementService: DocumentManagementService,
      private router: Router,
      private route: ActivatedRoute,
      private listaService: ListaService,
      private constanteService: ConstanteService,
      private adjuntosService: AdjuntosService,
      private location: Location,
      private confirmationService: ConfirmationService,
      private _nav: NavService, ) {
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

   ngOnInit() {
      this.route.params.subscribe( ( params: Params ) => {
         let tempId = Number( +params[ 'idEmpDoc' ] );
         if ( tempId ) {
            this.documentManagement.idDocumentoTercero = tempId;
            this.documentManagementService.getById( this.documentManagement.idDocumentoTercero ).subscribe( data => {
               this.documentManagement = data;
               this.getFileName();
               if ( data.indicadorAdjunto ) {
                  this.accion = 1;
               }
               if ( data.indicadorDescarga ) {
                  this.accion = 2;
               }
               this.listaService.getMasterDetails( 'ListasClasificacionesDocumentos' ).subscribe( res => {
                  this.clasificacion = res.find( r => r.idLista === this.documentManagement.idClasificacionDocumento ).nombre;
               } );
            } );
         }
      } );

   }

   downloadFile( id: number ) {
      this.adjuntosService.downloadFile( id ).subscribe( res => {
         window.location.assign( res );
      } );
   }

   getFileName() {
      if ( this.documentManagement.idAdjunto ) {
         this.adjuntosService.getFileName( this.documentManagement.idAdjunto ).subscribe( res => {
            this.dataUploadArchivo = res.nombreArchivo;
         } );
      }
   }

   goBack( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.location.back();
                                              }
                                           } );
      } else {
         this.location.back();
      }
   }

}
