import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { JwtHelper } from 'angular2-jwt';
import { EmployeeEventuality } from '../_models/employeeEventuality';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { Employee } from '../_models/employees';
import { EmployeesService } from '../_services/employees.service';
import { EmployeeEventualityPlans } from '../_models/employeeEventualitiesPlans';
import { EmployeeEventualityPlansAttachments } from '../_models/employeeEventualitiesPlansAttachment';
import { AdjuntosService } from '../_services/adjuntos.service';
import { EmployeeEventualityAttachment } from '../_models/employeeEventualityAttachment';
import { EmployeeEventualitiesAttachmentService } from '../_services/employees-eventualities-attachment.service';
import { ConstanteService } from '../_services/constante.service';
import { EmployeeEventualitiesPlansService } from '../_services/employeeEventualitiesPlans.service';
import { EmployeeEventualitiesPlansAttachmentService } from '../_services/employees-eventualities-plans-attachment.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               selector: 'accidents-incidents-add-plan',
               templateUrl: 'accidents-incidents-plan.component.html',
               providers: [ ConfirmationService ]
            } )

export class AccidentIncidentPlanComponent implements OnInit {
   employee: Employee = new Employee();
   listEmployees: SelectItem[] = [];
   listEstados: ListaItem[] = [];
   results: SelectItem[] = [];
   msg: Message;
   busqueda: string;
   id: number;
   employeeEventuality: EmployeeEventuality = new EmployeeEventuality();

   listEmployeeEventualityPlan: EmployeeEventualityPlans[] = [];
   employeeEventualityPlan: EmployeeEventualityPlans = new EmployeeEventualityPlans();

   plansAttachments: EmployeeEventualityPlansAttachments = new EmployeeEventualityPlansAttachments();
   listplansAttachments: EmployeeEventualityPlansAttachments[] = [];
   listplansAttachmentsAnswer: EmployeeEventualityPlansAttachments[] = [];
   listplansAttachmentsVerify: EmployeeEventualityPlansAttachments[] = [];

   employeeEventualityAttachment: EmployeeEventualityAttachment = new EmployeeEventualityAttachment();
   listAttachment: EmployeeEventualityAttachment[] = [];
   listAttachmentClose: EmployeeEventualityAttachment[] = [];
   svcThUrlImagen = '<%= SVC_TH_URL %>/api/upload';
   showForm: boolean = false;
   today: Date;
   minDate: Date;
   es: any;
   estadoTerminado: number;
   saveAttachmnet: boolean = true;
   process: string = 'LISTAR';

   // -----para adjuntar archivos-----
   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   dataUploadArchivo: any = '';
   dataUploadUsuario: any = '';
   usuarioLogueado: any;
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';

   constructor( private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private employeeEventualitiesService: EmployeeEventualitiesService,
      private employeeEventualitiesPlansService: EmployeeEventualitiesPlansService,
      private employeeEventualitiesAttachmentService: EmployeeEventualitiesAttachmentService,
      private employeeEventualitiesPlansAttachmentService: EmployeeEventualitiesPlansAttachmentService,
      private employeeService: EmployeesService,
      private adjuntosService: AdjuntosService,
      private constanteService: ConstanteService,
      private listaService: ListaService,
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
      this.listaService.getMasterDetails( 'ListasEstadosNovedades' ).subscribe( res => {
         this.listEstados = res;
         this.estadoTerminado = this.listEstados.find( s => s.codigo === 'TRAMIT' ).idLista;
      } );

      this.listaService.getMasterDetails( 'ListasResultadosAccidente' ).subscribe( res => {
         this.results.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.results.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.route.params.subscribe( params => {
         this.id = +params[ 'id' ];
         if ( Number( this.id ) > 0 ) {
               this.employeeEventualitiesService.getById( this.id ).subscribe(
               res => {
                  this.employeeEventuality = res;
                  this.getTercero();
                  this.getAttachment();
                  this.getPlans();
               } );
         }
      } );
   }

   ngOnInit() {
      this.employeeService.getEmployeesUsers().subscribe( res => {
         this.listEmployees.push( { label: 'Seleccione', value: null } );
         res.map( ( s: Employee ) => {
            this.listEmployees.push(
               { label: s.primerNombre + ' ' + s.segundoNombre + ' ' + s.primerApellido + ' ' + s.segundoApellido, value: s.idTercero } );
         } );
      } );
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
      this.today = new Date();
      this.initDate();
   }

   onSubmitClose() {
      this.employeeEventuality.idEstadoNovedad = this.estadoTerminado;
      this.employeeEventualitiesService.update( this.employeeEventuality ).subscribe( res => {
         this.navService.setMesage( 2, this.msg );
         this.router.navigate( [ 'accidents-incidents' ] );
      }, error => {
         this.navService.setMesage( 3, this.msg );
      } );
   }

   onSubmit() {
      if ( this.employeeEventualityPlan.idPlanAccionNovedadAccidente === null ||
           this.employeeEventualityPlan.idPlanAccionNovedadAccidente === undefined ||
           this.employeeEventualityPlan.idPlanAccionNovedadAccidente === 0 ) {
         this.employeeEventualityPlan.idTerceroNovedad = this.id;
         this.employeeEventualitiesPlansService.add( this.employeeEventualityPlan ).subscribe( res => {
            this.employeeEventualityPlan = res;
            this.navService.setMesage( 1, this.msg );
            this.process = 'ADJUNTO_AGREGAR';
         }, error => {
            this.navService.setMesage( 3, this.msg );
         } );
      } else {
         this.employeeEventualitiesPlansService.update( this.employeeEventualityPlan ).subscribe( res => {
            this.navService.setMesage( 2, this.msg );
            this.process = 'ADJUNTO_AGREGAR';
            this.getPlans();
         }, error => {
            this.navService.setMesage( 3, this.msg );
         } );
      }
   }

   closeEventuality() {
      this.process = 'CERRAR_CASO';
   }

   finishAdd() {
      this.getPlans();
      this.process = 'LISTAR';
   }

   onSubmitAnswer() {
      this.employeeEventualitiesPlansService.update( this.employeeEventualityPlan ).subscribe( res => {
         this.navService.setMesage( 2, this.msg );
         this.process = 'LISTAR';
         this.getPlans();
      }, error => {
         this.navService.setMesage( 3, this.msg );
      } );
   }

   getTercero() {
      this.employeeService.get( this.employeeEventuality.idTercero ).subscribe(
         employee => {
            this.employee = employee;
            this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
                                           this.employee.segundoNombre + ' ' +
                                           this.employee.primerApellido + ' ' +
                                           this.employee.segundoApellido;
         } );
   }

   getAttachment() {
      this.employeeEventualitiesAttachmentService.getAllByIdEventuality( this.employeeEventuality.idTerceroNovedad )
      .subscribe( rest => {
         this.listAttachment = rest;
      } );
   }

   getPlanAttachment() {
      this.listplansAttachments = [];
      this.listplansAttachmentsAnswer = [];
      this.listplansAttachmentsVerify = [];
      this.employeeEventualitiesPlansAttachmentService.getByPlan( this.employeeEventualityPlan.idPlanAccionNovedadAccidente )
      .subscribe( rest => {
         this.listplansAttachments = rest.filter( s => s.codigoAdjunto === 'LISTA' );
         this.listplansAttachmentsAnswer = rest.filter( s => s.codigoAdjunto === 'RESPUESTA' );
         this.listplansAttachmentsVerify = rest.filter( s => s.codigoAdjunto === 'VERIFICACION' );
      } );
   }

   onSubmitAttachment() {
   }

   getPlans() {
      this.employeeEventualitiesPlansService.getByEventuality( this.employeeEventuality.idTerceroNovedad )
      .subscribe( rest => {
         this.listEmployeeEventualityPlan = rest;
      } );
   }

   add(){
      this.employeeEventualityPlan = new EmployeeEventualityPlans();
      this.initDate();
      this.process = 'FORMULARIO_AGREGAR';
      this.listplansAttachments = [];
   }

   update( s: EmployeeEventualityPlans ) {
      this.employeeEventualityPlan = s;
      this.changeDate();
      this.getPlanAttachment();
      this.process = 'FORMULARIO_AGREGAR';
   }

   answer( s: EmployeeEventualityPlans ) {
      this.employeeEventualityPlan = s;
      this.getPlanAttachment();
      this.process = 'FORMULARIO_RESPUESTA';
   }

   varify( s: EmployeeEventualityPlans ) {
      this.employeeEventualityPlan = s;
      this.getPlanAttachment();
      this.process = 'FORMULARIO_VERIFICAR';
   }

   detail() {
      this.employeeEventualitiesAttachmentService.getAllByIdEventualityAccident( this.employeeEventuality.idTerceroNovedad )
      .subscribe( rest => {
         this.listAttachmentClose = rest;
      } );
      this.process = 'CERRAR_CASO_DETALLE';
   }

   inputAttachment( event: any ) {
      let input = event.target.value;
      if ( input !== ' ' ) {
         event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      } else {
         this.dataUploadArchivo = '';
      }
   }

   uploadingOk( event: any ) {
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         this.saveAttachmnet = false;
         this.plansAttachments.idPlanAccionNovedadAccidente = this.employeeEventualityPlan.idPlanAccionNovedadAccidente;
         this.plansAttachments.idAdjunto = respuesta.idAdjunto;
         this.plansAttachments.codigoAdjunto = 'LISTA';
         this.employeeEventualitiesPlansAttachmentService.add( this.plansAttachments ).subscribe( data => {
            this.dataUploadArchivo = '';
            this.getPlanAttachment();
            this.saveAttachmnet = true;
         }, error => {
            this.saveAttachmnet = true;
         } );
      }
   }

   uploadingOkAnswer( event: any ) {
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         this.saveAttachmnet = false;
         this.plansAttachments.idPlanAccionNovedadAccidente = this.employeeEventualityPlan.idPlanAccionNovedadAccidente;
         this.plansAttachments.idAdjunto = respuesta.idAdjunto;
         this.plansAttachments.codigoAdjunto = 'RESPUESTA';
         this.employeeEventualitiesPlansAttachmentService.add( this.plansAttachments ).subscribe( data => {
            this.dataUploadArchivo = '';
            this.getPlanAttachment();
            this.saveAttachmnet = true;
         }, error => {
            this.saveAttachmnet = true;
         } );
      }
   }

   uploadingOkVerify( event: any ) {
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         this.saveAttachmnet = false;
         this.plansAttachments.idPlanAccionNovedadAccidente = this.employeeEventualityPlan.idPlanAccionNovedadAccidente;
         this.plansAttachments.idAdjunto = respuesta.idAdjunto;
         this.plansAttachments.codigoAdjunto = 'VERIFICACION';
         this.employeeEventualitiesPlansAttachmentService.add( this.plansAttachments ).subscribe( data => {
            this.dataUploadArchivo = '';
            this.getPlanAttachment();
            this.saveAttachmnet = true;
         }, error => {
            this.saveAttachmnet = true;
         } );
      }
   }

   uploadingOkClose( event: any ) {
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         this.saveAttachmnet = false;
         this.plansAttachments.idPlanAccionNovedadAccidente = this.employeeEventualityPlan.idPlanAccionNovedadAccidente;
         this.plansAttachments.idAdjunto = respuesta.idAdjunto;
         this.employeeEventualitiesAttachmentService.add( this.employeeEventualityAttachment ).subscribe( data => {
            this.dataUploadArchivo = '';
            this.listAttachmentClose = [];
            this.employeeEventualitiesAttachmentService.getAllByIdEventualityAccident( this.employeeEventuality.idTerceroNovedad )
            .subscribe( rest => {
               this.listAttachmentClose = rest;
            } );
            this.saveAttachmnet = true;
         }, error => {
            this.saveAttachmnet = true;
         } );
      }
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '" + this.dataUploadArchivo + "', 'ruta':" +
                " '/Gestionamos/Terceros/" + this.employee.tipoDocumento + "_" + this.employee.numeroDocumento + "/PlanAcciones' }";
      event.formData.append( 'obj', obj.toString() );
   }

   onBeforeSendEventuality( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '" + this.dataUploadArchivo + "', 'ruta':" +
                " '/Gestionamos/Terceros/" + this.employee.tipoDocumento + "_" + this.employee.numeroDocumento + "/Novedades' }";
      event.formData.append( 'obj', obj.toString() );
   }

   onSelect( event: any, file: any ) {
      this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;
   }

   uploadAgain( rta: boolean ) {
      this.employeeEventualityAttachment.idAdjunto = null;
   }

   downloadFile( id: number ) {
      this.adjuntosService.downloadFile( id ).subscribe( res => {
         this.adjuntosService.getFileName( id ).subscribe( adj => {
            saveAs( res, adj.nombreArchivo );
         } );
      } );
   }

   goBack( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.process = 'LISTAR';
                                              }
                                           } );
      } else {
         this.process = 'LISTAR';
      }
   }

   goBackAnswer( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.process = 'LISTAR';
                                              }
                                           } );
      } else {
         this.process = 'LISTAR';
      }
   }

   capitalize( event: any ) {
      let input = event.target.value;
      if ( input.length > 0 ) {
         if ( input.substring( 0, 1 ) === ' ' ) {
            input = input.replace( ' ', '' );
         }
         event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }

   changeDate() {
      let d = new Date( this.employeeEventualityPlan.fechaLimite );
      let month = d.getMonth();
      let year = d.getFullYear();
      this.minDate = new Date();
      this.minDate.setMonth( month );
      this.minDate.setFullYear( year );
   }

   initDate() {
      let d = new Date();
      let month = d.getMonth();
      let year = d.getFullYear();
      this.minDate = new Date();
      this.minDate.setMonth( month );
      this.minDate.setFullYear( year );

   }

}
