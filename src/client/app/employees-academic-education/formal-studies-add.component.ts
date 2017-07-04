import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { AcademicEducationService } from '../_services/academic-education.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { FormalStudies } from './formal-studies';
import { Message, ConfirmationService } from 'primeng/primeng';
import * as moment from 'moment/moment';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { DivisionPolitica } from '../_models/divisionPolitica';
import { NavService } from '../_services/_nav.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { JwtHelper } from 'angular2-jwt';
import { AdjuntosService } from '../_services/adjuntos.service';
import { ConstanteService } from '../_services/constante.service';

@Component( {
               moduleId: module.id,
               selector: 'academic-education-formal',
               templateUrl: 'formal-studies-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class FormalStudiesAddComponent implements OnInit {
   @Input()
   cityList: DivisionPolitica[] = [];
   selectedCity: DivisionPolitica;
   fstudy: FormalStudies = new FormalStudies();
   header: string = 'Agregando Estudio Formal';
   submitted: boolean;
   msgs: Message[] = [];
   studyLevelList: any[] = [];
   studyAreaList: any[] = [];
   studyStateList: any[] = [];
   instituteList: ListaItem[] = [];
   selectedInstitute: ListaItem;
   minDate: Date = null;
   maxDate: Date = null;
   maxDateFinal: Date = null;
   es: any;
   range: string;
   idEstadoEstudioFinalizado = 1; // hace falta definir acceso a constantes en servicio
   idTercero: number;
   wrongCity: boolean = true;
   wrongInstitute: boolean = false;

   svcThUrl = '<%= SVC_TH_URL %>/api/adjuntos';
   dataUploadArchivo : any = '';
   dataUploadUsuario : any = '';
   usuarioLogueado: any = { sub: '', usuario: '', nombre: '' };
   jwtHelper: JwtHelper = new JwtHelper();
   fsize: number = 50000000;
   ftype: string = '';

   constructor( private academicEducationService: AcademicEducationService,
      private politicalDivisionService: PoliticalDivisionService,
      private listaService: ListaService,
      private route: ActivatedRoute,
      private location: Location,
      private confirmationService: ConfirmationService,
      private adjuntosService: AdjuntosService,
      private constanteService: ConstanteService,
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
      let month = today.getMonth();
      let year = today.getFullYear();
      let last18Year = year - 18;
      let lastYear = year - 100;
      this.maxDate = new Date();
      this.maxDate.setFullYear( year, month );
      this.minDate = new Date();
      this.minDate.setFullYear( lastYear, month );
      this.maxDateFinal = new Date();
      this.maxDateFinal.setMonth( month );
      this.maxDateFinal.setFullYear( year );
      this.range = `${lastYear}:${year}`;


      this.listaService.getMasterDetails( 'ListasNivelesEstudios' ).subscribe( res => {
         this.studyLevelList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => this.studyLevelList.push( { label: s.nombre, value: s.idLista } ) );
      } );
      this.listaService.getMasterDetails( 'ListasAreasEstudios' ).subscribe( studyAreaList => {
         this.studyAreaList .push( { label: 'Seleccione', value: null } );
         studyAreaList.map( ( s: ListaItem ) => {
            this.studyAreaList.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasEstadosEstudios' ).subscribe( res => {
         this.studyStateList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.studyStateList.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.route.params.subscribe( ( params: Params ) => {
         this.idTercero = params[ 'tercero' ];
      } );
   }

   onSubmit( value: string ) {
      this.submitted = true;
      if ( this.selectedCity !== undefined && this.selectedCity.idDivisionPolitica !== undefined ) {
         if ( (this.fstudy.otraInstitucion !== '' && this.fstudy.otraInstitucion !== null) ||
              (this.selectedInstitute !== null && this.selectedInstitute !== undefined && this.selectedInstitute.idLista !== null) ) {
            this.msgs = [];
            this.fstudy.idCiudad = this.selectedCity.idDivisionPolitica;
            this.fstudy.idTercero = this.idTercero;
            this.fstudy.indicadorHabilitado = true;
            if ( this.selectedInstitute !== null ) {
               this.fstudy.idInstitucion = this.selectedInstitute.idLista;
            } else {
               this.fstudy.idInstitucion = null;
            }
            // let fi: moment.Moment = moment( this.fstudy.fechaIngresa, 'MM/DD/YYYY' );
            // this.fstudy.fechaIngresa = fi.format( 'YYYY-MM-DD' );
            // if ( this.fstudy.idEstado === this.idEstadoEstudioFinalizado ) {
            //    let ff: moment.Moment = moment( this.fstudy.fechaTermina, 'MM/DD/YYYY' );
            //    this.fstudy.fechaTermina = ff.format( 'YYYY-MM-DD' );
            // } else {
            //    this.fstudy.fechaTermina = null;
            // }
            this.academicEducationService.addFormal( this.fstudy )
            .subscribe(
               data => {
                  // 1:add 2:update 3:error
                  this._nav.setMesage( 1, this.msgs );
                  this._nav.setTab( 6 );
                  this.location.back();
               } );
         } else {
            this.wrongInstitute = true;
         }
      } else {
         this.wrongCity = true;
      }
   }

   citySearch( event: any ) {
      this.politicalDivisionService.getAllCities( event.query ).subscribe(
         cities => this.cityList = cities
      );
   }

   captureCityId( event: any ) {
      this.fstudy.idCiudad = this.selectedCity.idDivisionPolitica;
      this.wrongCity = false;
   }

   instituteSearch( event: any ) {
      this.listaService.getMasterDetailsByWildCard( 'ListasInstituciones', event.query ).subscribe(
         instituteList => this.instituteList = instituteList
      );
   }

   captureInstituteId( event: any ) {
      this.fstudy.idInstitucion = this.selectedInstitute.idLista;
      this.fstudy.otraInstitucion = '';
      this.wrongInstitute = false;
   }

   removeInstitute() {
      if ( this.fstudy.otraInstitucion !== '' ) {
         this.selectedInstitute = null;
      }
   }

   onSelectBegin( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.minDate= new Date();
      this.minDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
   }

   onSelectEnd( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.maxDate = new Date();
      this.maxDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() - 1 );
   }

   updateEnd(): void {
      if ( this.fstudy.idEstado !== this.idEstadoEstudioFinalizado ) {
         this.fstudy.fechaTermina = undefined;
      }
   }


   goBack(fDirty : boolean): void {

      if ( fDirty ){
         this.confirmationService.confirm( {
            message: ` ¿Está seguro que desea salir sin guardar?`,
            header: 'Confirmación',
            icon: 'fa fa-question-circle',
            accept: () => {
               this._nav.setTab( 6 );
               this.location.back();
            }
         } );
      }else {
         this._nav.setTab( 6 );
         this.location.back();
      }
   }


   uploadingOk( event: any ) {
      let respuesta = JSON.parse(event.xhr.response);
      console.log(respuesta);
      if(respuesta.idAdjunto != null || respuesta.idAdjunto != undefined){
         this.fstudy.idAdjunto = respuesta.idAdjunto;
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
      this.fstudy.idAdjunto = null;
   }
   downloadFile(id: number){
      this.adjuntosService.downloadFile( id ).subscribe(res => {
         window.location.assign(res);
      });
   }

}


