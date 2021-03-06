import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeEstate } from '../_models/employee-estate';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { DocumentManagementService } from '../_services/document-managgement.service';
import { DocumentManagement } from '../_models/document-management';
import { JwtHelper } from 'angular2-jwt';
import { ConstanteService } from '../_services/constante.service';
import { AdjuntosService } from '../_services/adjuntos.service';

@Component( {
               moduleId: module.id,
               selector: 'document-manegement-add',
               templateUrl: 'document-management-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class DocumentManagementAddComponent implements OnInit {

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
            } );
         }
      } );

      this.listaService.getMasterDetails( 'ListasClasificacionesDocumentos' ).subscribe( res => {
         this.listTypeDoc.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeDoc.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listValidity.push( { label: 'Seleccione', value: null } );
      for ( let c = 1; c < 13; c++ ) {
         if ( c === 1 ) {
            this.listValidity.push( { label: c + ' Mes', value: c } );
         } else {
            this.listValidity.push( { label: c + ' Meses', value: c } );
         }
      }
      ;
      this.listAdjDes.push( { label: 'Seleccione', value: null } );
      this.listAdjDes.push( { label: 'Adjuntar al sistema', value: 1 } );
      this.listAdjDes.push( { label: 'Descargar de sistema', value: 2 } );

   }

   onSubmit() {
      if ( this.documentManagement.idDocumentoTercero ) {
         if ( this.documentManagement.indicadorAdjunto ) {
            this.documentManagement.idAdjunto = null;
         }
         this.documentManagementService.update( this.documentManagement ).subscribe( data => {
            this._nav.setMesage( 2, this.msgs );
            this.location.back();
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      } else {
         this.documentManagementService.add( this.documentManagement ).subscribe( data => {
            this._nav.setMesage( 1, this.msgs );
            this.location.back();
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      }
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   inputCod( event: any ) {
      let input = event.target.value;
      event.target.value = input.toUpperCase().replace( /[^A-Z0-9]/g, '' );
   }

   changeAction() {
      if ( this.accion ) {
         if ( this.accion === 1 ) {
            this.documentManagement.indicadorAdjunto = true;
            this.documentManagement.indicadorDescarga = false;
         }
         if ( this.accion === 2 ) {
            this.documentManagement.indicadorAdjunto = false;
            this.documentManagement.indicadorDescarga = true;
         }
      } else {
         this.documentManagement.indicadorAdjunto = false;
         this.documentManagement.indicadorDescarga = false;
      }
   }

   uploadingOk( event: any ) {
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         this.documentManagement.idAdjunto = respuesta.idAdjunto;
      }
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '" + this.dataUploadArchivo + "', 'ruta':" +
                " '/Gestionamos/Documentos Descarga' }";
      event.formData.append( 'obj', obj.toString() );
   }

   onSelect( event: any, file: any ) {
      this.dataUploadArchivo = file[ 0 ].name;
      this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;
   }

   uploadAgain( rta: boolean ) {
      this.documentManagement.idAdjunto = null;
   }

   downloadFile( id: number ) {
      this.adjuntosService.downloadFile( id ).subscribe( res => {
         this.adjuntosService.getFileName( id ).subscribe( adj => {
            saveAs( res, adj.nombreArchivo );
         } );
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
         if ( this.documentManagement.idAdjunto === null && this.documentManagement.indicadorDescarga ) {
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

}
