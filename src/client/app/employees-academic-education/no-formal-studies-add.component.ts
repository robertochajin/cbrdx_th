import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { AcademicEducationService } from '../_services/academic-education.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Noformalstudies } from './no-formal-studies';
import { Message, ConfirmationService } from 'primeng/primeng';
import * as moment from 'moment/moment';
import { StudyLevelServices } from '../_services/study-level.service';
import { NavService } from '../_services/_nav.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';

@Component( {
               moduleId: module.id,
               selector: 'academic-education-formal',
               templateUrl: 'no-formal-studies-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class NoFormalStudiesAddComponent implements OnInit {

   @Input()
   nfstudy: Noformalstudies = new Noformalstudies();
   cityList: any;
   selectedCity: string;
   header = 'Agregando Estudio no Formal';
   submitted: boolean;
   msgs: Message[] = [];
   studyLevelList: any[] = [];
   studyAreaList: any[] = [];
   studyTypeList: any[] = [];
   studyIntensityList: any[] = [];
   minDate: Date = null;
   maxDate: Date = new Date( Date.now() );
   maxDateFinal: Date = new Date( Date.now() );
   es: any;
   range: string;
   idTercero: number;
   fechaIngresa: string;
   fechaTermina: string;
   files: string;
   uploadedFiles: any[] = [];
   // hace falta definir acceso a constantes en servicio

   constructor( private academicEducationService: AcademicEducationService,
      private studyLevelServices: StudyLevelServices,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private politicalDivisionService: PoliticalDivisionService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private _nav: NavService ) {
   }

   ngOnInit() {
      this.setInitRanges();

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

      this.listaService.getMasterDetails( 'ListasTiposEstudios' ).subscribe( res => {
         this.studyTypeList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.studyTypeList.push( { label: s.nombre, value: s.idLista } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasIntensidades' ).subscribe( res => {
         this.studyIntensityList.push( { label: 'Seleccione', value: null } );
         res.map( ( s: ListaItem ) => {
            this.studyIntensityList.push( { label: s.nombre, value: s.idLista } );
         } );
      } );

      this.route.params.subscribe( ( params: Params ) => {
         this.idTercero = params[ 'tercero' ];
      } );

   }

   setInitRanges() {
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
   }

   onSubmit( value: string ) {
      this.submitted = true;
      if ( this.nfstudy.ciudad !== this.selectedCity ) {
         this.selectedCity = '';
         this.nfstudy.idCiudad = null;
      }
      if ( this.nfstudy.ciudad === this.selectedCity ) {
         this.msgs = [];
         this.nfstudy.idTercero = this.idTercero;
         this.nfstudy.indicadorHabilitado = true;

         // let fi: moment.Moment = moment( this.fechaIngresa, 'MM/DD/YYYY' );
         // this.nfstudy.fechaIngresa = fi.format( 'YYYY-MM-DD' );
         // if ( this.nfstudy.indicadorTerminacion === true ) {
         //    let ff: moment.Moment = moment( this.fechaTermina, 'MM/DD/YYYY' );
         //    this.nfstudy.fechaTermina = ff.format( 'YYYY-MM-DD' );
         // } else {
         //    this.nfstudy.fechaTermina = null;
         // }
         this.academicEducationService.addNoFormal( this.nfstudy )
         .subscribe( data => {
            // 1:add 2:update 3:error
            this._nav.setMesage( 1, this.msgs );
            this._nav.setTab( 6 );
            this.location.back();
         }, error => {
            // 1:add 2:update 3:error
            this._nav.setMesage( 3, this.msgs );
         } );
      }
   }

   citySearch( event: any ) {
      this.politicalDivisionService.getAllCities( event.query ).subscribe(
         cities => this.cityList = cities
      );
   }

   captureCityId( event: any ) {
      this.nfstudy.ciudad = event.camino;
      this.nfstudy.idCiudad = event.idDivisionPolitica;
      this.selectedCity = event.camino;
   }

   onSelectBegin( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.minDate= new Date();
      this.minDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() + 1 );
   }

   onSelectEnd( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.maxDate= new Date();
      this.maxDate.setFullYear( d.getFullYear(), d.getMonth(), d.getDate() - 1 );
   }

   updateEnd(): void {
      if ( this.nfstudy.indicadorTerminacion ) {
         this.nfstudy.fechaTermina = null;
      }
   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea Cancelar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this._nav.setTab( 6 );
                                              this.location.back();
                                           }
                                        } );
   }

   changeTipoestudio( event: any ) {
      if ( this.nfstudy.idTipoEstudio !== null ) {
         this.nfstudy.otroEstudio = '';
      }
   }

   removeEstudio() {
      if ( this.nfstudy.otroEstudio !== '' ) {
         this.nfstudy.idTipoEstudio = null;
      }
   }

   // Upload Adjunto
   onUpload( event: any ) {
      console.log( 'upload' );
      for ( let file of event.files ) {
         this.uploadedFiles.push( file );
      }

      // this.msgs = [];
      // this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
   }

}
