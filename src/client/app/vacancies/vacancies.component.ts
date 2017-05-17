import { Component, OnInit } from '@angular/core';
import { Vacancies } from '../_models/vacancies';
import { VacanciesService } from '../_services/vacancies.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { ListaItem } from '../_models/listaItem';
import { SelectItem } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'vacancies.component.html',
               selector: 'vacancies-list',
               providers: [ ConfirmationService ]
            } )

export class VacanciesComponent implements OnInit {

   vacancy: Vacancies = new Vacancies();
   vacancies: Vacancies[];
   listTipoSolicitud: SelectItem[] = [];
   listEstados: SelectItem[] = [];
   listAcciones: SelectItem[] = [];
   listAutotizacion: SelectItem[] = [];
   es: any;
   fechaInicio: Date;
   fechaFin: Date;
   today: Date;
   constructor( private vacanciesService: VacanciesService,
      private router: Router,
      private confirmationService: ConfirmationService,
      private listaService: ListaService
   ) {

      this.listaService.getMasterDetails( 'ListasTiposSolicitudes' ).subscribe( res => {
         this.listTipoSolicitud.push( { label: 'Todos', value: '' } );
         res.map( ( l: ListaItem ) => {
            this.listTipoSolicitud.push( { label: l.nombre, value: l.nombre } );
         } );
      } );
      this.listaService.getMasterDetails( 'ListasEstadosRequerimientos' ).subscribe( res => {
         this.listEstados.push( { label: 'Todos', value: '' } );
         res.map( ( l: ListaItem ) => {
            this.listEstados.push( { label: l.nombre, value: l.nombre } );
         } );
      } );
      this.listAutotizacion.push({label: 'Todos', value:''});
      this.listAutotizacion.push({label: 'Si', value:'Si'});
      this.listAutotizacion.push({label: 'No', value:'No'});

      this.listaService.getMasterDetails( 'ListasRequerimientosAcciones' ).subscribe( res => {
         this.listAcciones.push( { label: 'Todos', value: '' } );
         res.map( ( l: ListaItem ) => {
            this.listAcciones.push( { label: l.nombre, value: l.nombre } );
         } );
      } );

   }

   ngOnInit() {
     this.vacanciesService.getAll().subscribe(
         vacancies => {
            this.vacancies = vacancies;
            this.vacancies.forEach(obj=>{
               obj.autorizacion = obj.indicadorAutorizacion ? 'Si': 'No'
            });
         }
      );
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
      let date = today.getDate();
      let month = today.getMonth();
      let year = today.getFullYear();
      this.today = today;
      this.fechaFin = new Date();
      this.fechaFin.setMonth( month );
      this.fechaFin.setFullYear( year );
      this.fechaFin.setDate( date );
   }

   update( c: Vacancies ) {
      this.router.navigate( [ 'vacancies/update/' + c.idRequerimiento ] );
   }

}
