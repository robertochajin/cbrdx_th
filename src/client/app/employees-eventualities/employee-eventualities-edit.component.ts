import 'rxjs/add/operator/switchMap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { EventualityServices } from '../_services/eventuality.service';
import { Eventuality } from '../_models/eventuality';
import { EmployeesClinicalData } from '../_models/employeesClinicalData';
import { EmployeeEventualityAttachment } from '../_models/employeeEventualityAttachment';
import { EmployeeEventualitiesAttachmentService } from '../_services/employees-eventualities-attachment.service';

@Component( {
               moduleId: module.id,
               selector: 'employee-eventuality-add',
               templateUrl: 'employee-eventualities-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class EmployeeEventualitiesAddComponent implements OnInit {
   @Input()
   employeeEventuality: EmployeeEventuality = new EmployeeEventuality();
   employee: Employee = new Employee();
   msgs: Message[];
   es: any;
   minDateInicio: Date = new Date();
   minDateFin: Date = new Date();
   minDateFinPer: Date = new Date();
   minDateReint: Date = new Date();
   fechaInicio: Date;
   horaInicio: Date;
   fechaFinal: Date;
   horaFinal: Date;
   fechaReintegro: Date;
   horaReintegro: Date;
   periodoInicio: Date;
   periodoFin: Date;
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
   listEstados: ListaItem[] = [];
   listField: any[] = [];
   @Output()
   dismiss: EventEmitter<number> = new EventEmitter<number>();
   codigoVerificacion: string;
   eventuality: Eventuality = new Eventuality();
   acordion: number;
   ecd: EmployeesClinicalData = new EmployeesClinicalData();

   employeeEventualityAttachment: EmployeeEventualityAttachment = new EmployeeEventualityAttachment();
   listAttachment: EmployeeEventualityAttachment[] = [];
   nameAttachment: string;
   saveAttachmnet: boolean = true;
   indicadorJefeAutoriza: boolean = false;

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
   usuarioLogueado: any;
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';
   // -----    -----------
   constructor( private employeeNoveltyService: EmployeeEventualitiesService,
      private employeesService: EmployeesService,
      private router: Router,
      private _sms: SmsService,
      private eventualityServices: EventualityServices,
      private diagnosticCIEServices: DiagnosticCIEServices,
      private route: ActivatedRoute,
      private listaService: ListaService,
      private constanteService: ConstanteService,
      private adjuntosService: AdjuntosService,
      private location: Location,
      private confirmationService: ConfirmationService,
      private employeeEventualitiesAttachmentService: EmployeeEventualitiesAttachmentService,
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
      this.listaService.getMasterDetails( 'ListasEstadosNovedades' ).subscribe( res => {
         this.listEstados = res;
      } );
      this.listaService.getMasterDetails( 'ListasEntidades' ).subscribe( res => {
         this.listEntidad.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.listEntidad.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
   }

   ngOnInit() {
      if ( this.employeeEventuality.idTerceroNovedad !== null ) {
         this.employeeNoveltyService.getById( this.employeeEventuality.idTerceroNovedad ).subscribe( data => {
            this.employeeEventuality = data;
            this.fechaInicio = new Date( this.employeeEventuality.fechaInicio );
            this.horaInicio = new Date( this.employeeEventuality.horaInicio );
            this.fechaFinal = new Date( this.employeeEventuality.fechaFin );
            this.horaFinal = new Date( this.employeeEventuality.horaFin );
            this.fechaReintegro = new Date( this.employeeEventuality.fechaReintegro );
            this.horaReintegro = new Date( this.employeeEventuality.horaReintergo );
            this.periodoInicio = new Date( this.employeeEventuality.periodoInicial );
            this.periodoFin = new Date( this.employeeEventuality.periodoFinal );
            this.eventualityServices.get( this.employeeEventuality.idNovedad ).subscribe( rest => {
               this.eventuality = rest;
            } );
            this.changeEventuality();
            this.employeeEventualitiesAttachmentService.getAllByIdEventuality( this.employeeEventuality.idTerceroNovedad )
            .subscribe( rest => {
               this.listAttachment = rest;
            } );
         } );
      } else {
         this.eventuality = new Eventuality();
      }
      this.employeesService.get( this.employeeEventuality.idTercero ).subscribe( res => this.employee = res );

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
      this.formatDate();
      if ( this.eventuality.indicadorConfirmacion && this.employeeEventuality.idTerceroNovedad ) {
         this.employeeNoveltyService.getById( this.employeeEventuality.idTerceroNovedad ).subscribe( res => {
            if ( res.codigoValidacion === this.codigoVerificacion ) {
               if ( this.employeeEventuality.idTerceroNovedad !== 0 && this.employeeEventuality.idTerceroNovedad !== null &&
                    this.employeeEventuality.idTerceroNovedad !== undefined ) {
                  if ( this.eventuality.indicadorConfirmacion && this.employeeEventuality.codigoValidacion ) {
                     this.employeeEventuality.indicadorHabilitado = true;
                  }
                  this.employeeNoveltyService.update( this.employeeEventuality ).subscribe( data => {
                     this._nav.setMesage( 2, this.msgs );
                     if ( this.eventuality.indicadorAdjuntos ) {
                        this.acordion = 1;
                     } else {
                        this.dismiss.emit( 1 );
                     }
                  }, error => {
                     this._nav.setMesage( 3, this.msgs );
                  } );
               }
               else {
                  if ( this.indicadorJefeAutoriza ) {
                     this.employeeEventuality.idEstadoNovedad = this.getStateByCode( 'PENAPR' );
                  } else {
                     this.employeeEventuality.idEstadoNovedad = this.eventuality.idEstadoInicialNovedad;
                  }
                  this.employeeEventuality.idTerceroReporta = this.usuarioLogueado.usuario.idTercero;
                  this.employeeNoveltyService.add( this.employeeEventuality ).subscribe( data => {
                     this._nav.setMesage( 1, this.msgs );
                     if ( this.eventuality.indicadorAdjuntos ) {
                        this.acordion = 1;
                     } else {
                        this.dismiss.emit( 1 );
                     }
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
      } else {
         if ( this.employeeEventuality.idTerceroNovedad !== 0 && this.employeeEventuality.idTerceroNovedad !== null &&
              this.employeeEventuality.idTerceroNovedad !== undefined ) {
            this.employeeNoveltyService.update( this.employeeEventuality ).subscribe( data => {
               this._nav.setMesage( 2, this.msgs );
               if ( this.eventuality.indicadorAdjuntos ) {
                  this.acordion = 1;
               } else {
                  this.dismiss.emit( 1 );
               }
            }, error => {
               this._nav.setMesage( 3, this.msgs );
            } );
         }
         else {
            if ( this.indicadorJefeAutoriza ) {
               this.employeeEventuality.idEstadoNovedad = this.getStateByCode( 'PENAPR' );
            } else {
               this.employeeEventuality.idEstadoNovedad = this.eventuality.idEstadoInicialNovedad;
            }
            this.employeeEventuality.idTerceroReporta = this.usuarioLogueado.usuario.idTercero;
            this.employeeNoveltyService.add( this.employeeEventuality ).subscribe( data => {
               this.employeeEventuality.idTerceroNovedad = data.idTerceroNovedad;
               this._nav.setMesage( 1, this.msgs );
               if ( !this.eventuality.indicadorConfirmacion ) {
                  if ( this.eventuality.indicadorAdjuntos ) {
                     this.acordion = 1;
                  } else {
                     this.dismiss.emit( 1 );
                  }
               }
            }, error => {
               this._nav.setMesage( 3, this.msgs );
            } );
         }
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

   captureDiagnosticId( event: any ) {
      this.employeeEventuality.idDiagnostico = this.ecd.diagnostico.idDiagnosticoCie;
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
         this.eventualityServices.get( this.employeeEventuality.idNovedad ).subscribe( rest => {
            this.eventuality = rest;
            if ( rest.indicadorAutorizaJefe ) {
               this.indicadorJefeAutoriza = true;
            } else {
               this.indicadorJefeAutoriza = false;
            }
         } );
         this.resetForm();
         this.propareForm();
      } );
   }

   selectInicio() {
      this.fechaFinal = null;
      let temp = new Date( this.fechaInicio );
      this.minDateFin = new Date( temp.setHours( 24 ) );
   }

   selectFinal() {
      this.fechaReintegro = null;
      let temp = new Date( this.fechaFinal );
      this.minDateReint = new Date( temp.setHours( 24 ) );
      let fecha2 = this.fechaFinal;
      let fecha1 = this.fechaInicio;
      if ( fecha2 && fecha1 ) {
         let diasDif = fecha2.getTime() - fecha1.getTime();
         let dias = Math.round( diasDif / (1000 * 60 * 60 * 24) );
         this.employeeEventuality.dias = dias + 1;
      }
   }

   selectPeriodoInicio() {
      this.periodoFin = null;
      let temp = new Date( this.periodoInicio );
      this.minDateFinPer = new Date( temp.setHours( 24 ) );
   }

   resetForm() {
      // indicadores para mostrar campos en formulario
      this.showhorainicio = false;
      this.showfechainicio = false;
      this.showhorafinal = false;
      this.showfechafinal = false;
      this.showdescripcion = false;
      this.showdiagnostico = false;
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
      this.requiredfechafinal = false;
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
         } else if ( field.codigoCampoNovedad === 'DIAS' ) {
            this.showdias = field.indicadorHabilitado;
            this.requireddias = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'DIAGN' ) {
            this.showdiagnostico = field.indicadorHabilitado;
            this.requireddiagnostico = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'REMPL' ) {
            this.showreemplazado = field.indicadorHabilitado;
            this.requiredreemplazado = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'VALOR' ) {
            this.showvalor = field.indicadorHabilitado;
            this.requiredvalor = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'CUOTAS' ) {
            this.showcuotas = field.indicadorHabilitado;
            this.requiredcuotas = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'REFERE' ) {
            this.showreferencia = field.indicadorHabilitado;
            this.requiredreferencia = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'ENTID' ) {
            this.showentidad = field.indicadorHabilitado;
            this.requiredentidad = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'DESCRI' ) {
            this.showdescripcion = field.indicadorHabilitado;
            this.requireddescripcion = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'PERIN' ) {
            this.showperiodoinicial = field.indicadorHabilitado;
            this.requiredperiodoinicial = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'PERFI' ) {
            this.showperiodofinal = field.indicadorHabilitado;
            this.requiredperiodoinicial = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'RET' ) {
            this.showretiro = field.indicadorHabilitado;
            this.requiredretiro = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'EPS' ) {
            this.showeps = field.indicadorHabilitado;
            this.requiredeps = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'FP' ) {
            this.showfp = field.indicadorHabilitado;
            this.requiredfp = field.indicadorObligatorio;
         } else if ( field.codigoCampoNovedad === 'CCF' ) {
            this.showccf = field.indicadorHabilitado;
            this.requiredccf = field.indicadorObligatorio;
         }
      }

   }

   getStateByCode( codigo: string ) {
      let temp = this.listEstados.find( x => x.codigo === codigo );
      if ( temp ) {
         return temp.idLista;
      } else {
         return null;
      }
   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();
   }

   goBack( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.dismiss.emit( 1 );
                                              }
                                           } );
      } else {
         this.dismiss.emit( 1 );
      }
   }

   formatDate() {
      if ( this.fechaInicio !== undefined && this.fechaInicio !== null ) {
         if ( this.fechaInicio.toString() !== 'Invalid Date' ) {
            this.employeeEventuality.fechaInicio = this.fechaInicio.toISOString().replace( 'Z', '-0500' );
         }
      }
      if ( this.horaInicio !== undefined && this.horaInicio !== null ) {
         if ( this.horaInicio.toString() !== 'Invalid Date' ) {
            this.employeeEventuality.horaInicio = this.horaInicio.toISOString().replace( 'Z', '-0500' );
         }
      }
      if ( this.fechaFinal !== undefined && this.fechaFinal !== null ) {
         if ( this.fechaFinal.toString() !== 'Invalid Date' ) {
            this.employeeEventuality.fechaFin = this.fechaFinal.toISOString().replace( 'Z', '-0500' );
         }
      }
      if ( this.horaFinal !== undefined && this.horaFinal !== null ) {
         if ( this.horaFinal.toString() !== 'Invalid Date' ) {
            this.employeeEventuality.horaFin = this.horaFinal.toISOString().replace( 'Z', '-0500' );
         }
      }
      if ( this.fechaReintegro !== undefined && this.fechaReintegro !== null ) {
         if ( this.fechaReintegro.toString() !== 'Invalid Date' ) {
            this.employeeEventuality.fechaReintegro = this.fechaReintegro.toISOString().replace( 'Z', '-0500' );
         }
      }
      if ( this.horaReintegro !== undefined && this.horaReintegro !== null ) {
         if ( this.horaReintegro.toString() !== 'Invalid Date' ) {
            this.employeeEventuality.horaReintergo = this.horaReintegro.toISOString().replace( 'Z', '-0500' );
         }
      }
      if ( this.periodoInicio !== undefined && this.periodoInicio !== null ) {
         if ( this.periodoInicio.toString() !== 'Invalid Date' ) {
            this.employeeEventuality.periodoInicial = this.periodoInicio.toISOString().replace( 'Z', '-0500' );
         }
      }
      if ( this.periodoFin !== undefined && this.periodoFin !== null ) {
         if ( this.periodoFin.toString() !== 'Invalid Date' ) {
            this.employeeEventuality.periodoFinal = this.periodoFin.toISOString().replace( 'Z', '-0500' );
         }
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
         this.employeeEventualityAttachment.idTerceroNovedad = this.employeeEventuality.idTerceroNovedad;
         this.employeeEventualityAttachment.idAdjunto = respuesta.idAdjunto;
         this.employeeEventualitiesAttachmentService.add( this.employeeEventualityAttachment ).subscribe( data => {
            this.dataUploadArchivo = '';
            this.listAttachment = [];
            this.employeeEventualitiesAttachmentService.getAllByIdEventuality( this.employeeEventuality.idTerceroNovedad )
            .subscribe( rest => {
               this.listAttachment = rest;
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

}
