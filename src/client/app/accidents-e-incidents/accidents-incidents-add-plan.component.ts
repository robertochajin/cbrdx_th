import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { JwtHelper } from 'angular2-jwt';

@Component( {
               moduleId: module.id,
               selector: 'accidents-incidents-add-plan',
               templateUrl: 'accidents-incidents-add-plan.component.html',
               providers: [ ConfirmationService ]
            } )

export class AccidentIncidentAddPlanComponent implements OnInit {

   msgs: Message[] = [];
   listSupplies: SelectItem[] = [];
   es: any;
   minDateInicio: Date;
   minDateFin: Date;
   fechaFin: Date;
   fechaInicio: Date;
   rangeFin: string;
   // -----para adjuntar archivos-----
   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   dataUploadArchivo: any = '';
   dataUploadUsuario: any = '';
   usuarioLogueado: any;
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';
   // -----    -----------

   constructor( private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private _nav: NavService, ) {

   }

   ngOnInit() {
      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre',
            'diciembre'
         ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };
      let today = new Date();
      let year = today.getFullYear();
      let last40Year = year - 40;
      let next40Year = year + 40;
      this.minDateInicio = today;
      this.minDateFin = today;
      this.rangeFin = `${last40Year}:${next40Year}`;
   }

   onSubmit() {
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   inputNumber( event: any ) {
      let input = event.target.value;
      event.target.value = input.toUpperCase().replace( /[^0-9]/g, '' );
   }

   inputAttachment( event: any ) {
      // let input = event.target.value;
      // if ( input !== ' ' ) {
      //    event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      // } else {
      //    this.dataUploadArchivo = '';
      // }
   }

   uploadingOk( event: any ) {
      // let respuesta = JSON.parse( event.xhr.response );
      // if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
      //    this.saveAttachmnet = false;
      //    this.employeeEventualityAttachment.idTerceroNovedad = this.employeeEventuality.idTerceroNovedad;
      //    this.employeeEventualityAttachment.idAdjunto = respuesta.idAdjunto;
      //    this.employeeEventualitiesAttachmentService.add( this.employeeEventualityAttachment ).subscribe( data => {
      //       this.dataUploadArchivo = '';
      //       this.listAttachment = [];
      //       this.employeeEventualitiesAttachmentService.getAllByIdEventuality( this.employeeEventuality.idTerceroNovedad )
      //       .subscribe( rest => {
      //          this.listAttachment = rest;
      //       } );
      //       this.saveAttachmnet = true;
      //    }, error => {
      //       this.saveAttachmnet = true;
      //    } );
      // }
   }

   onBeforeSend( event: any ) {
      // event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      // let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '" + this.dataUploadArchivo + "'}";
      // event.formData.append( 'obj', obj.toString() );
   }

   onSelect( event: any, file: any ) {
      // this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;
   }

   uploadAgain( rta: boolean ) {
      // this.employeeEventualityAttachment.idAdjunto = null;
   }

   downloadFile( id: number ) {
      // this.adjuntosService.downloadFile( id ).subscribe( res => {
      //    this.adjuntosService.getFileName( id ).subscribe( adj => {
      //       saveAs( res, adj.nombreArchivo );
      //    } );
      // } );
   }
   goBack( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                              }
                                           } );
      } else {
      }
   }

}
