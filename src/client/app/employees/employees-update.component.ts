import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../_models/employees';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { EmployeesService } from '../_services/employees.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { NavService } from '../_services/_nav.service';
import { Ocupaciones } from '../_models/ocupaciones';
import { OcupacionesService } from '../_services/ocupaciones.service';
import { ActividadEconomica } from '../_models/actividadEconomica';
import { ActividadEconomicaService } from '../_services/actividadEconomica.service';
import * as moment from 'moment/moment';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';
import { ConstanteService } from '../_services/constante.service';
import { JwtHelper } from 'angular2-jwt';
import { AdjuntosService } from '../_services/adjuntos.service';

@Component( {
               moduleId: module.id,
               selector: 'employees-form',
               templateUrl: 'employees-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class EmployeesUpdateComponent implements OnInit {
   @Input()
   employee: Employee = new Employee();
   header: string = 'Agregando Colaborador';

   personTypes: SelectItem[] = [];
   documentTypes: SelectItem[] = [];
   resultExpeditionCity: DivisionPolitica[];
   resultBirthPlace: DivisionPolitica[] = [];
   ciudadExpDocumento: string;
   backupCiudadExpDocumento: string;
   ciudadNacimiento: string;
   backupCiudadNacimiento: string;
   genderTypes: SelectItem[] = [];
   maritalStatusTypes: SelectItem[] = [];
   rhRactorTypes: SelectItem[] = [];
   healthTypes: SelectItem[] = [];
   occupationsTypes: SelectItem[] = [];
   academicLevelTypes: SelectItem[] = [];
   affiliationTypes: SelectItem[] = [];
   juridicos: SelectItem[] = [];
   sector: SelectItem[] = [];
   activities: SelectItem[] = [];
   occupations: SelectItem[] = [];
   legalStatusTypes: SelectItem[] = [];
   listadoOcupaciones: Ocupaciones[];
   listadoActividadEconomica: ActividadEconomica[];
   msgs: Message[] = [];
   today: Date = null;
   maxDate: Date = null;
   maxDateBirth: Date = null;
   minDateDocumento: Date = null;
   maxDateDocumento: Date = null;
   range: string;
   es: any;
   expeditionDate: string;
   birthDate: string;
   deathDate: string;
   idTipoTercero: number;
   documentoNoSelec: string[];
   idDocumentoNoSelec: number[] = [];
   tiposdoc: string[] = [];
   mayeda: number = 0;
   listTypeDoc: ListaItem[] = [];

   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   dataUploadArchivo : any = 'Archivo Adjunto';
   dataUploadUsuario : any = '';
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';

   constructor( private employeesService: EmployeesService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private listaService: ListaService,
      private constanteService: ConstanteService,
      private listEmployeesService: ListEmployeesService,
      private politicalDivisionService: PoliticalDivisionService,
      private actividadEconomicaService: ActividadEconomicaService,
      private ocupacionesService: OcupacionesService,
      private confirmationService: ConfirmationService,
      private adjuntosService: AdjuntosService,
      private _nav: NavService ) {

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

      listaService.getMasterDetails( 'ListasTiposPersonas' ).subscribe( res => {
         this.personTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.personTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasEstadosJuridicos' ).subscribe( res => {
         this.juridicos.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.juridicos.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasGeneros' ).subscribe( res => {
         this.genderTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.genderTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.listaService.getMasterDetails( 'ListasEstadosCiviles' ).subscribe( res => {
         this.maritalStatusTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.maritalStatusTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasFactoresRH' ).subscribe( res => {
         this.rhRactorTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.rhRactorTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasCoberturasSalud' ).subscribe( res => {
         this.healthTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.healthTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasTiposOcupaciones' ).subscribe( res => {
         this.occupationsTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.occupationsTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasNivelesEstudios' ).subscribe( res => {
         this.academicLevelTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.academicLevelTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasTiposAfiliacion' ).subscribe( res => {
         this.affiliationTypes.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.affiliationTypes.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.actividadEconomicaService.listByPadre( 0 ).subscribe( res => {
         this.sector.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.sector.push( {
                                 label: dp.actividadEconomica,
                                 value: dp.idActividadEconomica
                              } );
         }
      } );

      this.ocupacionesService.listByNivel( 4 ).subscribe( res => {
         this.occupations.push( { label: 'Seleccione', value: null } );
         for ( let dp of res ) {
            this.occupations.push( {
                                      label: dp.ocupacion,
                                      value: dp.idOcupacion
                                   } );
         }
      } );

      this.listaService.getMasterDetailsByCode( 'ListasTiposTerceros', 'TERCOL' ).subscribe(
         res => {
            this.idTipoTercero = res.idLista;
         } );

      this.constanteService.getByCode( 'DOCMYE' ).subscribe( data => {
         if ( data.valor ) {
            for ( let c of data.valor.split( ',' ) ) {
               this.tiposdoc.push( c );
            }
         }
      } );
      this.constanteService.getByCode( 'MAYEDA' ).subscribe( data => {
         if ( data.valor ) {
            this.mayeda = Number( data.valor );
         }
      } );

   }

   ngOnInit() {
      // this.listaService.getMasterDetails( 'ListasTiposDocumentos' ).subscribe( res => {
      //    this.documentTypes.push( { label: 'Seleccione', value: null } );
      //    res.map( ( s: ListaItem ) => {
      //       this.documentTypes.push( { label: s.nombre, value: s.idLista } );
      //    } );
      // } );

      this.route.params
      .switchMap( ( params: Params ) => this.employeesService.get( +params[ 'id' ] ) )
      .subscribe( employee => {
         this.employee = employee;
         this.getFileName()
         this.constanteService.getByCode( 'DOCMYE' ).subscribe( data => {
            if ( data.valor ) {
               for ( let c of data.valor.split( ',' ) ) {
                  this.tiposdoc.push( c );
               }
            }
            this.constanteService.getByCode( 'MAYEDA' ).subscribe( data => {
               if ( data.valor ) {
                  this.mayeda = Number( data.valor );
               }
               let tipodocemploye = this.listTypeDoc.find( x => x.idLista === this.employee.idTipoDocumento );
               let codigo: string = '';
               if ( tipodocemploye ) {
                  codigo = tipodocemploye.codigo;
               }
               let tipo = this.tiposdoc.find( t => t === codigo ); // buscar tipo documento elegido
               let exp = this.expeditionDate;
               let dateExpo = new Date( exp );

               let today = new Date();
               let month = today.getMonth();
               let year = today.getFullYear();
               let prev18Year = year - this.mayeda;
               let prev20Year = year - 20;
               let lastYear = prev18Year - 80;
               this.maxDateBirth = new Date();
               this.maxDateBirth.setMonth( month );

               if ( tipo ) {
                  if ( this.employee.fechaDocumento !== null ) {
                     let fecha = new Date( this.employee.fechaDocumento );
                     let anio = fecha.getFullYear() - this.mayeda;
                     this.maxDateBirth.setFullYear( anio );
                  } else {
                     this.maxDateBirth.setFullYear( prev18Year );
                  }
               } else {
                  this.maxDateBirth.setFullYear( year );
               }
               if ( this.maxDateBirth > dateExpo ) {
                  this.maxDateBirth = dateExpo;
               }
            } );
         } );

         this.updateActivities( this.employee.idSectorEconomico );
         this.updateDateInit();
         this.minDateDocumento = new Date( this.employee.fechaNacimiento );
         this.ciudadExpDocumento = this.employee.ciudadExpDocumento;
         this.backupCiudadExpDocumento = this.employee.ciudadExpDocumento;
         this.ciudadNacimiento = this.employee.ciudadNacimiento;
         this.backupCiudadNacimiento = this.employee.ciudadNacimiento;
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
      let month = today.getMonth();
      let year = today.getFullYear();
      let lasYear = year - 80;
      this.maxDate = new Date();
      this.maxDate.setMonth( month );
      this.maxDate.setFullYear( year );
      this.maxDateBirth = this.maxDate;
      this.today = new Date();
      this.today.setMonth( month );
      this.today.setFullYear( year );
      this.maxDateDocumento = new Date();
      this.maxDateDocumento.setMonth( month );
      this.maxDateDocumento.setFullYear( year );
      this.employee.indicadorHabilitado = true;
      this.employee.indicadorVivo = true;
      this.employee.idTipoOcupacion = 1;
      this.range = `${lasYear}:${year}`;
      this.focusUP();

      this.constanteService.listConstants().subscribe( rest => {
         if ( rest.find( c => c.constante === 'DOCNSE' ) ) {
            this.documentoNoSelec = rest.find( c => c.constante === 'DOCNSE' ).valor.split( ',' );
         }
         this.listaService.getMasterDetails( 'ListasTiposDocumentos' ).subscribe( res => {
            this.listTypeDoc = res;
            this.documentTypes.push( { label: 'Seleccione', value: null } );
            let temp: any;
            for ( let c of this.documentoNoSelec ) {
               temp = res.find( x => x.codigo === c );
               if ( temp ) {
                  this.idDocumentoNoSelec.push( temp.idLista );
               }
            }
            for ( let x of res ) {
               if ( this.idDocumentoNoSelec.length > 0 ) {
                  if ( this.idDocumentoNoSelec.find( s => s !== x.idLista ) ) {
                     this.documentTypes.push( { label: x.nombre, value: x.idLista } );
                  }
               } else {
                  this.documentTypes.push( { label: x.nombre, value: x.idLista } );
               }
            }
         } );
      } );
   }

   onSubmit() {
      this.focusUP();
      if ( this.ciudadExpDocumento !== this.backupCiudadExpDocumento ) {
         this.ciudadExpDocumento = '';
         this.employee.ciudadExpDocumento = '';
      }
      if ( this.ciudadNacimiento !== this.backupCiudadNacimiento ) {
         this.ciudadNacimiento = '';
         this.employee.ciudadNacimiento = '';
      }
      if ( this.ciudadExpDocumento === this.backupCiudadExpDocumento && this.ciudadNacimiento === this.backupCiudadNacimiento ) {
         this.msgs = [];
         this.employee.primerNombre = this.capitalizeSave( this.employee.primerNombre );
         this.employee.segundoNombre = this.capitalizeSave( this.employee.segundoNombre );
         this.employee.primerApellido = this.capitalizeSave( this.employee.primerApellido );
         this.employee.segundoApellido = this.capitalizeSave( this.employee.segundoApellido );

         this.employee.idTipoTercero = this.idTipoTercero;

         this.employeesService.update( this.employee )
         .subscribe( data => {
            this._nav.setMesage( 2, this.msgs );
            this.location.back();
         }, error => {
            this._nav.setMesage( 3, this.msgs );
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
                                                 this._nav.setTab( 0 );
                                                 this.location.back();
                                              }
                                           } );
      } else {
         this.location.back();
      }
   }

   searchExpeditionCity( event: any ) {
      this.politicalDivisionService.getAllCities( event.query ).subscribe(
         lis => this.resultExpeditionCity = lis
      );
   }

   captureExpeditionCity( event: any ) {
      this.employee.idCiudadExpDocumento = event.idDivisionPolitica;
      this.ciudadExpDocumento = event.camino;
      this.backupCiudadExpDocumento = event.camino;
   }

   searchBirthPlace( event: any ) {
      this.politicalDivisionService.getAllCities( event.query ).subscribe(
         lis => this.resultBirthPlace = lis
      );
   }

   captureBirthPlace( event: any ) {
      this.employee.idCiudadNacimiento = event.idDivisionPolitica;
      this.ciudadNacimiento = event.camino;
      this.backupCiudadNacimiento = event.camino;
   }

   focusUP() {
      const element = document.querySelector( '#formulario' );
      if ( element ) {
         element.scrollIntoView( element );
      }
   }

   updateDate() {
      this.employee.fechaNacimiento = null;
      let tipodocemploye = this.listTypeDoc.find( x => x.idLista === this.employee.idTipoDocumento );
      let codigo: string = '';
      if ( tipodocemploye ) {
         codigo = tipodocemploye.codigo;
      }
      let tipo = this.tiposdoc.find( t => t === codigo ); // buscar tipo documento elegido
      let exp = this.expeditionDate;
      let dateExpo = new Date( exp );

      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prev18Year = year - this.mayeda;
      let prev20Year = year - 20;
      let lastYear = prev18Year - 80;
      this.maxDateBirth = new Date();
      this.maxDateBirth.setMonth( month );

      if ( tipo ) {
         if ( this.employee.fechaDocumento !== null ) {
            let fecha = new Date( this.employee.fechaDocumento );
            let anio = fecha.getFullYear() - this.mayeda;
            this.maxDateBirth.setFullYear( anio );
         } else {
            this.maxDateBirth.setFullYear( prev18Year );
         }
      } else {
         this.maxDateBirth.setFullYear( year );
      }
      if ( this.maxDateBirth > dateExpo ) {
         this.maxDateBirth = dateExpo;
      }

      if ( (this.employee.fechaNacimiento) !== null && (this.employee.fechaNacimiento) !== null ) {
         let timestamp2 = new Date( this.maxDate ).getTime();
         let timestamp1 = new Date( this.employee.fechaNacimiento ).getTime();
         let timeDiff = Math.round( timestamp2 - timestamp1 );
         if ( timeDiff < 0 ) {
            this.employee.fechaNacimiento = null;
         }
      }
      this.validateDocument();

   }
   updateDateInit() {

      let tipodocemploye = this.listTypeDoc.find( x => x.idLista === this.employee.idTipoDocumento );
      let codigo: string = '';
      if ( tipodocemploye ) {
         codigo = tipodocemploye.codigo;
      }
      let tipo = this.tiposdoc.find( t => t === codigo ); // buscar tipo documento elegido
      let exp = this.expeditionDate;
      let dateExpo = new Date( exp );

      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prev18Year = year - this.mayeda;
      let prev20Year = year - 20;
      let lastYear = prev18Year - 80;
      this.maxDateBirth = new Date();
      this.maxDateBirth.setMonth( month );

      if ( tipo ) {
         if ( this.employee.fechaDocumento !== null ) {
            let fecha = new Date( this.employee.fechaDocumento );
            let anio = fecha.getFullYear() - this.mayeda;
            this.maxDateBirth.setFullYear( anio );
         } else {
            this.maxDateBirth.setFullYear( prev18Year );
         }
      } else {
         this.maxDateBirth.setFullYear( year );
      }
      if ( this.maxDateBirth > dateExpo ) {
         this.maxDateBirth = dateExpo;
      }

      if ( (this.employee.fechaNacimiento) !== null && (this.employee.fechaNacimiento) !== null ) {
         let timestamp2 = new Date( this.maxDate ).getTime();
         let timestamp1 = new Date( this.employee.fechaNacimiento ).getTime();
         let timeDiff = Math.round( timestamp2 - timestamp1 );
         if ( timeDiff < 0 ) {
            this.employee.fechaNacimiento = null;
         }
      }
      this.validateDocument();

   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   capitalizeSave( input: any ) {
      return input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   onExpeditionDate( event: any ) {
      this.updateDate();
   }

   onBirthDate( event: any ) {
      this.minDateDocumento = new Date( Date.parse( event ) );
   }

   onDeathDate( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.deathDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
   }

   updateActivities( value: number ) {
      if ( value !== null ) {
         this.activities = [];
         this.actividadEconomicaService.listLastChild( value ).subscribe( res => {
            this.activities.push( { label: 'Seleccione', value: null } );
            for ( let dp of res ) {
               this.activities.push( {
                                        label: dp.actividadEconomica,
                                        value: dp.idActividadEconomica
                                     } );
            }
         } );
      }
   }

   validateDocument() {
      if ( this.employee.numeroDocumento !== '' && this.employee.numeroDocumento !== null ) {
         this.employeesService.validateDocument( this.employee.numeroDocumento, this.employee.idTipoDocumento ).subscribe( res => {
            if ( res.idTercero > 0 && this.employee.idTercero !== res.idTercero ) {
               this.confirmationService.confirm( {
                                                    message: ` ¿La cedula que ha ingresado ya existe, desea ver el colaborador existente?`,
                                                    header: 'Confirmación',
                                                    icon: 'fa fa-question-circle',
                                                    accept: () => {
                                                       this.router.navigate( [ '/employees/update/' + res.idTercero ] );
                                                    },
                                                    reject: () => {
                                                       this.employee.numeroDocumento = '';
                                                    }
                                                 } );
            }
         } );
      }
   }

   inputCleanUp( value: string ) {
      this.employee.numeroDocumento = value.toUpperCase().replace( ' ', '' ).trim();
   }
   // Archivo Adjunto
   uploadingOk( event: any ) {
      let respuesta = JSON.parse(event.xhr.response);
      if(respuesta.idAdjunto != null || respuesta.idAdjunto != undefined){
         this.employee.idAdjunto = respuesta.idAdjunto;
      }
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
      let obj = "{ 'auditoriaUsuario' : '" + this.dataUploadUsuario + "', 'nombreArchivo' :  '"+ this.dataUploadArchivo + "'}";
      event.formData.append( 'obj', obj.toString() );
   }

   onSelect(event:any, file:any){
      this.dataUploadArchivo = file[0].name;
      this.dataUploadUsuario = this.usuarioLogueado.usuario.idUsuario;
   }

   uploadAgain(rta:boolean){
      this.employee.idAdjunto = null;
   }

   downloadFile(id: number){

      this.adjuntosService.downloadFile( id ).subscribe(res => {
         window.location.assign(res);
      });
   }
   getFileName() {
      this.adjuntosService.getFileName( this.employee.idAdjunto ).subscribe( res => {
         this.dataUploadArchivo = res.nombreArchivo;
      } );
   }

}
