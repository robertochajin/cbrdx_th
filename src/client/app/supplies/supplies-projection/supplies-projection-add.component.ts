import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { NavService } from '../../_services/_nav.service';
import { SuppliesProjection } from '../../_models/suppliesProjection';
import { SuppliesService } from '../../_services/supplies.service';
import { Supplies } from '../../_models/supplies';
import { OrganizationalStructureService } from '../../_services/organizationalStructure.service';
import { OrganizationalStructure } from '../../_models/organizationalStructure';
import { SuppliesProjectionServices } from '../../_services/suppliesProjection.service';
import { ConstanteService } from '../../_services/constante.service';
import * as moment from 'moment/moment';
import { Employee } from '../../_models/employees';

@Component( {
               moduleId: module.id,
               selector: 'supplies-projection-add',
               templateUrl: 'supplies-projection-form.component.html',
               providers: [ ConfirmationService ]
            } )

export class SuppliesProjectionAddComponent implements OnInit {

   suppliesProjection: SuppliesProjection = new SuppliesProjection();
   msgs: Message[] = [];
   configTer: Message[] = [];
   listSupplies: SelectItem[] = [];
   listAreas: OrganizationalStructure[] = [];
   listEmployees: Employee[] = [];
   es: any;
   minDateInicio: Date;
   minDateFin: Date;
   fechaFin: Date;
   fechaInicio: Date;
   rangeFin: string;
   list2: any[] = [];
   requiredArea: boolean = false;

   constructor( private router: Router,
      private route: ActivatedRoute,
      private suppliesService: SuppliesService,
      private organizationalStructureService: OrganizationalStructureService,
      private location: Location,
      private constanteService: ConstanteService,
      private suppliesProjectionServices: SuppliesProjectionServices,
      private confirmationService: ConfirmationService,
      private _nav: NavService, ) {

   }

   ngOnInit() {
      this.suppliesService.getAllEnabled().subscribe( rs => {
         this.listSupplies.push( { label: 'Seleccione', value: null } );
         rs.map( ( s: Supplies ) => {
            this.listSupplies.push( { label: s.grupoDotacion, value: s.idGrupoDotacion } );
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
      let today = new Date();
      let year = today.getFullYear();
      let last40Year = year - 40;
      let next40Year = year + 40;
      this.minDateInicio = today;
      this.minDateFin = today;
      this.rangeFin = `${last40Year}:${next40Year}`;

      this.constanteService.getByCode( 'DOTMES' ).subscribe( c => {
         this.suppliesProjection.cantidadMeses = Number( c.valor );
      } );
   }

   onSubmit() {
      if ( !this.suppliesProjection.indicadorNoAreas ) {
         if ( this.list2.length > 0 ) {
            this.suppliesProjection.idEstructuraOrganizacional = [];
            for ( let a of this.list2 ) {
               this.suppliesProjection.idEstructuraOrganizacional.push( a.idEstructuraOrganizacional );
            }
            this.listEmployees = [];
            this.configTer = [];
            this.suppliesProjectionServices.validate( this.suppliesProjection ).subscribe( rs => {
               if ( rs.length <= 0 ) {
                  this.suppliesProjectionServices.add( this.suppliesProjection ).subscribe( rs => {
                     this._nav.setMesage( 1, this.msgs );
                     this.location.back();
                  }, error => {
                     this._nav.setMesage( 3, this.msgs );
                  } );
               } else {
                  for ( let t of rs ) {
                     t.nombreCompleto = t.primerNombre + ' ' +
                                        t.segundoNombre + ' ' +
                                        t.primerApellido + ' ' +
                                        t.segundoApellido;
                     this.listEmployees.push( t );
                  }
                  this.configTer.push(
                     { severity: 'info', summary: 'Info', detail: 'Falta configuración de tallas de los siguientes colaboradores' } );
               }
            } );
         } else {
            this.requiredArea = true;
         }
      } else {
         this.suppliesProjectionServices.add( this.suppliesProjection ).subscribe( rs => {
            this._nav.setMesage( 1, this.msgs );
            this.location.back();
         }, error => {
            this._nav.setMesage( 3, this.msgs );
         } );
      }
   }

   capitalize( event: any ) {
      let input = event.target.value;
      event.target.value = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
   }

   inputNumber( event: any ) {
      let input = event.target.value;
      event.target.value = input.toUpperCase().replace( /[^0-9]/g, '' );
   }

   changeSupplies() {
      this.listAreas = [];
      this.list2 = [];
      this.configTer=[];
      this.listEmployees=[];
      this.organizationalStructureService.getAreaBySuppliesGroup( this.suppliesProjection.idGrupoDotacion ).subscribe( rs => {
         this.listAreas = rs;
      } );
   }

   selectInicio() {
      let temp = new Date( this.suppliesProjection.fechaInicio );
      this.minDateFin = new Date( temp.setHours( 24 ) );
      if ( this.suppliesProjection.cantidadMeses ) {
         let fechaCalcul = moment( this.suppliesProjection.fechaInicio ).add( this.suppliesProjection.cantidadMeses, 'M' );
         this.suppliesProjection.fechaFin = new Date( fechaCalcul.toDate() );
      }
   }

   calculateRange() {
      let temp = new Date( this.suppliesProjection.fechaInicio );
      if ( temp.toString() !== 'Invalid Date' ) {
         let fechaCalcul = moment( this.suppliesProjection.fechaInicio ).add( this.suppliesProjection.cantidadMeses, 'M' );
         this.suppliesProjection.fechaFin = new Date( fechaCalcul.toDate() );
      }
   }

   goBack( fDirty: boolean ): void {

      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this._nav.setTab( 5 );
                                                 this.location.back();
                                              }
                                           } );
      } else {
         this._nav.setTab( 5 );
         this.location.back();
      }
   }

}
