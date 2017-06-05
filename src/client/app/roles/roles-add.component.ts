import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Rol } from '../_models/rol';
import { RolesService } from '../_services/roles.service';
import { Router } from '@angular/router';
import { VRolMenuElemento } from '../_models/vRolMenuElemento';
import { MenuElemento } from '../_models/menuElemento';
import { ConfirmationService, Message } from 'primeng/primeng';
import * as moment from 'moment/moment';

@Component( {
               moduleId: module.id,
               templateUrl: 'roles-form.component.html',
               selector: 'roles-form.component',
               providers: [ ConfirmationService ]
            } )
export class RolesAddComponent implements OnInit {

   rol: Rol = new Rol();
   roles: Rol[];
   msgs: Message[] = [];
   codeExists: boolean = false;
   range: string;
   es: any;
   maxDate: Date;
   minDate: Date;
   fechaInicio: string;
   fechaFin: string;

   asignedRoles: VRolMenuElemento[];
   masterCreated: boolean = false;
   isAdding: boolean = false;
   elementosMenu: MenuElemento[];

   constructor( private rolesService: RolesService,
      private router: Router,
      private location: Location,
      private confirmationService: ConfirmationService ) {
      rolesService.listRoles().subscribe( res => {
         this.roles = res;
      } );
   }

   ngOnInit() {
      this.rol.idRol = null;
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
      let nextYear = year + 3;
      this.range = `${year}:${nextYear}`;
   }

   onFechaInicio( event: any ) {
      let d = new Date( Date.parse( event ) );
    this.minDate= new Date();
      this.minDate = new Date( Date.parse( event ) );
   }

   onFechaFin( event: any ) {
      let d = new Date( Date.parse( event ) );
     this.maxDate= new Date();
      this.maxDate = new Date( Date.parse( event ) );
   }

   validateCode() {
      if ( this.rol.codigoRol !== '' && this.rol.codigoRol !== null && this.rol.codigoRol !== undefined ) {
         this.codeExists = this.roles.filter( t => (t.codigoRol === this.rol.codigoRol && t.idRol !== this.rol.idRol ) ).length > 0;
      } else {
         this.codeExists = false;
      }
   }

   capitalizeCode() {
      let input = this.rol.codigoRol;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.rol.codigoRol = input.toUpperCase().replace( /[^A-Z0-9]/gi, '' ).trim();
      }
   }

   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
   }

   capitalizeName() {
      let input = this.rol.rol;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.rol.rol = input.toUpperCase();
      }
   }

   onSubmit() {

      // if ( this.fechaInicio !== null && this.fechaInicio !== '' && this.fechaInicio !== undefined ) {
      //    let momInicio: moment.Moment = moment( this.fechaInicio, 'MM/DD/YYYY' );
      //    this.rol.fechaInicio = momInicio.format( 'YYYY-MM-DD' );
      // }
      // if ( this.fechaFin !== null && this.fechaFin !== '' && this.fechaFin !== undefined ) {
      //    let momFin: moment.Moment = moment( this.fechaFin, 'MM/DD/YYYY' );
      //    this.rol.fechaFin = momFin.format( 'YYYY-MM-DD' );
      // }
      this.rolesService.addRole( this.rol ).then( res => {
         this.router.navigate( [ 'roles/update/' + res.idRol + '/1' ] );
      } );

   }

   clearSelectionRol() {
      this.fechaInicio = null;
      this.fechaFin = null;
   }
}
