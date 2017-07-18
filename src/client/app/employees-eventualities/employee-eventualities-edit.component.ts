import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../_services/_nav.service';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { JwtHelper } from 'angular2-jwt';
import { ConstanteService } from '../_services/constante.service';
import { AdjuntosService } from '../_services/adjuntos.service';
import { EmployeeEventuality } from '../_models/employeeEventuality';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { DiagnosticCIEServices } from '../_services/diagnosticCIE.service';
import { SmsService } from '../_services/_sms.service';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';

@Component( {
               moduleId: module.id,
               selector: 'employee-novelty-add',
               templateUrl: 'employee-eventualities-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class EmployeeEventualitiesAddComponent implements OnInit {

   employeeEventuality: EmployeeEventuality = new EmployeeEventuality();
   employee: Employee = new Employee();
   msgs: Message[];
   es: any;
   minDateInicio: Date = new Date();
   minDateFin: Date = new Date();
   rangeFin: string;
   wrongDiagnostic: boolean = true;
   diagnosticList: any[] = [];
   listTypeDoc: SelectItem[] = [];
   listValidity: SelectItem[] = [];
   listAdjDes: SelectItem[] = [];
   codigoVerificacion: string;

   // -----para adjuntar archivos-----
   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   dataUploadArchivo: any = '';
   dataUploadUsuario: any = '';
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';
   // -----    -----------
   constructor( private employeeNoveltyService: EmployeeEventualitiesService,
      private employeesService: EmployeesService,
      private router: Router,
      private _sms: SmsService,
      private diagnosticCIEServices: DiagnosticCIEServices,
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
         let tempIdEmployee = Number( +params[ 'idTercero' ] );
         let tempIdEmployeeNovelty = Number( +params[ 'idTerceroNovedad' ] );
         if ( tempIdEmployeeNovelty !== 0 ) {
            this.employeeEventuality.idNovedad = tempIdEmployeeNovelty;
            this.employeeNoveltyService.getById( this.employeeEventuality.idNovedad ).subscribe( data => {
               this.employeeEventuality = data;
               this.getFileName();
            } );
         }
         if ( tempIdEmployee ) {
            this.employeeEventuality.idTercero = tempIdEmployee;

            this.employeesService.get( tempIdEmployee ).subscribe( res => this.employee = res );
         }
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
      let today = new Date();
      let year = today.getFullYear();
      let last40Year = year - 40;
      let next40Year = year + 40;
      this.minDateInicio = today;
      this.minDateFin = today;
      this.rangeFin = `${last40Year}:${next40Year}`;

   }

   onSubmit() {
      this.employeeNoveltyService.getById( this.employeeEventuality.idNovedad ).subscribe( res => {
         if ( res.codigoValidacion === this.codigoVerificacion ) {
            if ( this.employeeEventuality.idNovedad ) {
               // if ( this.documentManagement.indicadorAdjunto ) {
               //    this.documentManagement.idAdjunto = null;
               // }
               this.employeeNoveltyService.update( this.employeeEventuality ).subscribe( data => {
                  this._nav.setMesage( 2, this.msgs );
                  this.location.back();
               }, error => {
                  this._nav.setMesage( 3, this.msgs );
               } );
            } else {
               this.employeeNoveltyService.add( this.employeeEventuality ).subscribe( data => {
                  this._nav.setMesage( 1, this.msgs );
                  this.location.back();
               }, error => {
                  this._nav.setMesage( 3, this.msgs );
               } );
            }
         } else {
            this._nav.setMesage( 4, {
               severity: 'error', summary: 'Error', detail: 'El código ingresado no coincide con el asignado.'
            } );
         }
      } );
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   inputCod( event: any ) {
      let input = event.target.value;
      event.target.value = input.toUpperCase().replace( /[^A-Z0-9]/g, '' );
   }

   uploadingOk( event: any ) {
      let respuesta = JSON.parse( event.xhr.response );
      if ( respuesta.idAdjunto != null || respuesta.idAdjunto != undefined ) {
         this.employeeEventuality.idAdjunto = respuesta.idAdjunto;
      }
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '" + this.dataUploadArchivo + "'}";
      event.formData.append( 'obj', obj.toString() );
   }

   onSelect( event: any, file: any ) {
      this.dataUploadArchivo = file[ 0 ].name;
      this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;
   }

   uploadAgain( rta: boolean ) {
      this.employeeEventuality.idAdjunto = null;
   }

   downloadFile( id: number ) {
      this.adjuntosService.downloadFile( id ).subscribe( res => {
         window.location.assign( res );
      } );
   }

   getFileName() {
      if ( this.employeeEventuality.idAdjunto ) {
         this.adjuntosService.getFileName( this.employeeEventuality.idAdjunto ).subscribe( res => {
            this.dataUploadArchivo = res.nombreArchivo;
         } );
      }
   }

   captureDiagnosticId( event: any ) {
      this.wrongDiagnostic = false;
   }

   diagnosticSearch( event: any ) {
      this.diagnosticCIEServices.getByWildCard( event.query ).subscribe( diagnostics => {
         this.diagnosticList = diagnostics;
         this.diagnosticList.map( d => d.label = d.codigo + ' : ' + d.descripcion );
      } );
   }

   showField() {
      return true;
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

   generarCodigo() {
      this.employeeEventuality.codigoValidacion = (Math.floor( Math.random() * (9999 - 1000 + 1) ) + 1000).toString();

      this.employeeNoveltyService.update( this.employeeEventuality ).subscribe( data => {
         this.employee.telefonoCelular = this.employee.telefonoCelular.replace( /\(|\)|\-/g, "" );
         this.employee.telefonoCelular = this.employee.telefonoCelular.split( ' ' ).join( '' );

         let obj = {
            destination: this.employee.telefonoCelular,
            codigo: this.employeeEventuality.codigoValidacion
         }

         this._sms.generateVerificationCode( obj ).subscribe( res => {
            console.log( res );
         }, error => {
            this._nav.setMesage( 4, {
               severity: 'success', summary: 'Exito', detail: 'El codigo se ha enviado con éxito.'
            } );
         } );
      } );
   }

}
