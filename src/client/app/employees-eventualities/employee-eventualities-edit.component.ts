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

@Component( {
               moduleId: module.id,
               selector: 'employee-novelty-add',
               templateUrl: 'employee-eventualities-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class EmployeeEventualitiesAddComponent implements OnInit {

   employeeEventuality: EmployeeEventuality = new EmployeeEventuality();
   msgs: Message[];
   es: any;
   minDateInicio: Date = new Date();
   minDateFin: Date = new Date();
   minDateFinPer: Date = new Date();
   minDateReint: Date = new Date();
   rangeFin: string;
   idTipoNovedad: number;
   wrongDiagnostic: boolean = true;
   diagnosticList: any[] = [];
   listTypeEvent: SelectItem[] = [];
   listEPS: SelectItem[] = [];
   listFP: SelectItem[] = [];
   listCCF: SelectItem[] = [];
   listEntidad: SelectItem[] = [];
   listEventualities: SelectItem[] = [];
   listTypeDoc: SelectItem[] = [];
   listField: any[] = [];

   // indicadores para mostrar campos en formulario
   showhorainicio: boolean = false;
   showfechainicio: boolean = false;
   showhorafinal: boolean = false;
   showfechafinal: boolean = false;
   showdescripcion: boolean = false;
   showdiagnostico: boolean = false;
   showreemplazado: boolean = false;
   showhorareintegro: boolean = false;
   showfechareintegro: boolean = false;
   showdias: boolean = false;
   showvalor: boolean = false;
   showcuotas: boolean = false;
   showreferencia: boolean = false;
   showentidad: boolean = false;
   showperiodoinicial: boolean = false;
   showperiodofinal: boolean = false;
   showretiro: boolean = false;
   showeps: boolean = false;
   showfp: boolean = false;
   showccf: boolean = false;

   // indicador de campo requerido
   requiredhorainicio: boolean = false;
   requiredfechainicio: boolean = false;
   requiredhorafinal: boolean = false;
   requiredfechafinal: boolean = false;
   requireddescripcion: boolean = false;
   requireddiagnostico: boolean = false;
   requiredreemplazado: boolean = false;
   requiredhorareintegro: boolean = false;
   requiredfechareintegro: boolean = false;
   requireddias: boolean = false;
   requiredvalor: boolean = false;
   requiredcuotas: boolean = false;
   requiredreferencia: boolean = false;
   requiredentidad: boolean = false;
   requiredperiodoinicial: boolean = false;
   requiredperiodofinal: boolean = false;
   requiredretiro: boolean = false;
   requiredeps: boolean = false;
   requiredfp: boolean = false;
   requiredccf: boolean = false;

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
      private router: Router,
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

      this.listaService.getMasterDetails( 'ListasTiposNovedades' ).subscribe( res => {
         this.listTypeEvent.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listTypeEvent.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasEps' ).subscribe( res => {
         this.listEPS.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listEPS.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasFP' ).subscribe( res => {
         this.listFP.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listFP.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasCCF' ).subscribe( res => {
         this.listCCF.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listCCF.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasEntidades' ).subscribe( res => {
         this.listEntidad.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listEntidad.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.employeeEventuality.horaFinal = new Date();
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
      if ( this.employeeEventuality.idNovedad ) {
         // if ( this.documentManagement.indicadorAdjunto ) {
         //    this.documentManagement.idAdjunto = null;
         // }
         // this.employeeNoveltyService.update( this.employeeEventuality ).subscribe( data => {
         //    this._nav.setMesage( 2, this.msgs );
         //    this.location.back();
         // }, error => {
         //    this._nav.setMesage( 3, this.msgs );
         // } );
         this.employeeEventuality;
      } else {
         // this.employeeNoveltyService.add( this.employeeEventuality ).subscribe( data => {
         //    this._nav.setMesage( 1, this.msgs );
         //    this.location.back();
         // }, error => {
         //    this._nav.setMesage( 3, this.msgs );
         // } );
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

   inputNumber( event: any ) {
      let input = event.target.value;
      event.target.value = input.toUpperCase().replace( /[^0-9]/g, '' );
   }

   inputRef( event: any ) {
      let input = event.target.value;
      event.target.value = input.toUpperCase().replace( /[^A-Z0-9-_]/g, '' );
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

   changeTypeEvent() {
      this.listEventualities = [];
      this.employeeEventuality.idNovedad = null;
      this.employeeNoveltyService.getAllByIdType( this.idTipoNovedad ).subscribe( data => {
         this.listEventualities.push( { label: 'Seleccione', value: null } );
         data.map( ( s: any ) => {
            this.listEventualities.push( { label: s.novedad, value: s.idNovedad } );
         } );
      } );
      this.resetForm();
   }

   changeEventuality() {
      this.employeeNoveltyService.getFieldByIdEventuality( this.employeeEventuality.idNovedad ).subscribe( data => {
         this.listField = data;
         this.resetForm();
         this.propareForm();
      } );
   }

   selectInicio() {
      this.employeeEventuality.fechaFinal = null;
      let temp = new Date( this.employeeEventuality.fechaInicio );
      this.minDateFin = new Date( temp.setHours( 24 ) );
   }

   selectFinal() {
      this.employeeEventuality.fechaReintegro = null;
      let temp = new Date( this.employeeEventuality.fechaFinal );
      this.minDateReint = new Date( temp.setHours( 24 ) );
   }

   selectPeriodoInicio() {
      this.employeeEventuality.periodoFinal = null;
      let temp = new Date( this.employeeEventuality.periodoInicio );
      this.minDateFinPer = new Date( temp.setHours( 24 ) );
   }
   resetForm(){
      // indicadores para mostrar campos en formulario
      this.showhorainicio = false;
      this.showfechainicio = false;
      this.showhorafinal= false;
      this.showfechafinal = false;
      this. showdescripcion= false;
      this. showdiagnostico = false;
      this.showreemplazado = false;
      this.showhorareintegro = false;
      this.showfechareintegro = false;
      this.showdias = false;
      this.showvalor = false;
      this.showcuotas = false;
      this.showreferencia = false;
      this.showentidad = false;
      this.showperiodoinicial = false;
      this.showperiodofinal = false;
      this.showretiro = false;
      this.showeps = false;
      this.showfp = false;
      this.showccf = false;
      // indicador de campo requerido
      this.requiredhorainicio = false;
      this.requiredfechainicio = false;
      this.requiredhorafinal = false;
      this. requiredfechafinal = false;
      this.requireddescripcion = false;
      this.requireddiagnostico = false;
      this.requiredreemplazado = false;
      this.requiredhorareintegro = false;
      this.requiredfechareintegro = false;
      this.requireddias = false;
      this.requiredvalor = false;
      this.requiredcuotas = false;
      this.requiredreferencia = false;
      this.requiredentidad = false;
      this.requiredperiodoinicial = false;
      this.requiredperiodofinal = false;
      this.requiredretiro = false;
      this.requiredeps = false;
      this.requiredfp = false;
      this.requiredccf = false;
   }
   propareForm() {
      for ( let field of this.listField ) {
         if ( field.codigoCampoNovedad === 'FECHINI' ) {
            this.showfechainicio = field.indicadorHabilitado;
            this.requiredfechainicio = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'FECFIN' ) {
            this.showfechafinal = field.indicadorHabilitado;
            this.requiredfechafinal = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'HORINI' ) {
            this.showhorainicio = field.indicadorHabilitado;
            this.requiredhorainicio = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'HORFIN' ) {
            this.showhorafinal = field.indicadorHabilitado;
            this.requiredhorafinal = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'FECREI' ) {
            this.showfechareintegro = field.indicadorHabilitado;
            this.requiredfechareintegro = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'HORREI' ) {
            this.showhorareintegro = field.indicadorHabilitado;
            this.requiredhorareintegro = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'DIAS' ) {
            this.showdias = field.indicadorHabilitado;
            this.requireddias = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'DIAGN' ) {
            this.showdiagnostico = field.indicadorHabilitado;
            this.requireddiagnostico = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'REMPL' ) {
            this.showreemplazado = field.indicadorHabilitado;
            this.requiredreemplazado = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'VALOR' ) {
            this.showvalor = field.indicadorHabilitado;
            this.requiredvalor = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'CUOTAS' ) {
            this.showcuotas = field.indicadorHabilitado;
            this.requiredcuotas = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'REFERE' ) {
            this.showreferencia = field.indicadorHabilitado;
            this.requiredreferencia = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'ENTID' ) {
            this.showentidad = field.indicadorHabilitado;
            this.requiredentidad = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'DESCRI' ) {
            this.showdescripcion = field.indicadorHabilitado;
            this.requireddescripcion = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'PERIN' ) {
            this.showperiodoinicial = field.indicadorHabilitado;
            this.requiredperiodoinicial = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'PERFI' ) {
            this.showperiodofinal = field.indicadorHabilitado;
            this.requiredperiodoinicial = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'RET' ) {
            this.showretiro = field.indicadorHabilitado;
            this.requiredretiro = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'EPS' ) {
            this.showeps = field.indicadorHabilitado;
            this.requiredeps = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'FP' ) {
            this.showfp = field.indicadorHabilitado;
            this.requiredfp = field.indicadorObligatorio;
         }else if ( field.codigoCampoNovedad === 'CCF' ) {
            this.showccf = field.indicadorHabilitado;
            this.requiredccf = field.indicadorObligatorio;
         }
      }

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

}
