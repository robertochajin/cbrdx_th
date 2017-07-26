import { Component, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/api';
import { SelectItem, Message } from 'primeng/primeng';
import { ListaService } from '../../_services/lista.service';
import { NavService } from '../../_services/_nav.service';
import { Router } from '@angular/router';
import { SuppliesProjectionServices } from '../../_services/suppliesProjection.service';
import { SuppliesProjection } from '../../_models/suppliesProjection';
import { UsuariosService } from '../../_services/usuarios.service';
import { Usuario } from '../../_models/usuario';
import { underline } from 'chalk';

@Component( {
               moduleId: module.id,
               templateUrl: 'supplies-projection.component.html',
               selector: 'supplies-projection',
               providers: [ ConfirmationService ]
            } )
export class SuppliesProjectionComponent {

   msg: Message;
   suppliesProjection: SuppliesProjection = new SuppliesProjection();
   listSuppliesProjection: SuppliesProjection [];
   listUsers: SelectItem [] = [];
   busqueda: string;
   idUsuario: number;
   es: any;
   minDateFin: Date;
   maxDateInicio: Date;
   fechaFin: Date;
   fechaInicio: Date;
   rangeFin: string;

   constructor( private suppliesProjectionServices: SuppliesProjectionServices,
      private router: Router,
      private _nav: NavService,
      private usuariosService: UsuariosService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = _nav.getSearch( 'supplies-projection' );
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
      this.minDateFin = today;
      this.rangeFin = `${last40Year}:${next40Year}`;
      this.suppliesProjectionServices.getAll().subscribe( data => {
         this.listSuppliesProjection = data;
      } );

      this.usuariosService.getUserDOTROL().subscribe( rs => {
         this.listUsers.push( { label: 'Seleccione', value: null } );
         rs.map( ( s: any ) => {
            this.listUsers.push( { label: s.nombre, value: s.idUsuario } );
         } );
      } );
   }

   changeUser() {
      if ( this.idUsuario && this.fechaInicio && this.fechaFin ) {
         let fechaInicio = this.fechaInicio.toISOString().substring( 0, 10 );
         let fechaFin = this.fechaFin.toISOString().substring( 0, 10 );
         this.listSuppliesProjection = [];
         this.suppliesProjectionServices.filterByDateAndUser( fechaInicio, fechaFin, this.idUsuario ).subscribe( rs => {
            this.listSuppliesProjection = rs;
         } );
      }
      if ( this.idUsuario && (this.fechaInicio === undefined || this.fechaFin === undefined) ) {
         this.listSuppliesProjection = [];
         this.suppliesProjectionServices.getAll().subscribe( data => {
            for ( let s of data ) {
               if ( s.auditoriaUsuario === this.idUsuario ) {
                  this.listSuppliesProjection.push( s );
               }
            }
         } );
      }
   }

   selectInicio() {
      let temp = new Date( this.fechaInicio );
      this.minDateFin = new Date( temp );
      if ( this.fechaInicio && this.fechaFin && !this.idUsuario ) {
         let fechaInicio = this.fechaInicio.toISOString().substring( 0, 10 );
         let fechaFin = this.fechaFin.toISOString().substring( 0, 10 );
         this.listSuppliesProjection = [];
         this.suppliesProjectionServices.filterByDate( fechaInicio, fechaFin ).subscribe( rs => {
            this.listSuppliesProjection = rs;
         } );
      }
      if ( this.idUsuario && this.fechaInicio && this.fechaFin ) {
         let fechaInicio = this.fechaInicio.toISOString().substring( 0, 10 );
         let fechaFin = this.fechaFin.toISOString().substring( 0, 10 );
         this.listSuppliesProjection = [];
         this.suppliesProjectionServices.filterByDateAndUser( fechaInicio, fechaFin, this.idUsuario ).subscribe( rs => {
            this.listSuppliesProjection = rs;
         } );
      }
   }

   selectFinal() {
      let temp = new Date( this.fechaFin );
      this.maxDateInicio = new Date( temp );
      if ( this.fechaInicio && this.fechaFin && !this.idUsuario ) {
         let fechaInicio = this.fechaInicio.toISOString().substring( 0, 10 );
         let fechaFin = this.fechaFin.toISOString().substring( 0, 10 );
         this.listSuppliesProjection = [];
         this.suppliesProjectionServices.filterByDate( fechaInicio, fechaFin ).subscribe( rs => {
            this.listSuppliesProjection = rs;
         } );
      }
      if ( this.idUsuario && this.fechaInicio && this.fechaFin ) {
         let fechaInicio = this.fechaInicio.toISOString().substring( 0, 10 );
         let fechaFin = this.fechaFin.toISOString().substring( 0, 10 );
         this.listSuppliesProjection = [];
         this.suppliesProjectionServices.filterByDateAndUser( fechaInicio, fechaFin, this.idUsuario ).subscribe( rs => {
            this.listSuppliesProjection = rs;
         } );
      }
   }

   add() {
      this.router.navigate( [ 'supplies-projection/add' ] );
   }

   detail( s: SuppliesProjection ) {

   }

   refer( s: SuppliesProjection ) {

   }

}
