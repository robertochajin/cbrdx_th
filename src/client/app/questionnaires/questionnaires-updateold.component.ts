import { Component, OnInit } from '@angular/core';
import { Rol } from '../_models/rol';
import { RolesService } from '../_services/roles.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/primeng';
import * as moment from 'moment/moment';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'questionnaires-form.component.html',
               selector: 'roles-form.component',
               providers: [ ConfirmationService ]
            } )
export class QuestionnairesUpdateComponent implements OnInit {
   rol: Rol = new Rol();
   roles: Rol[];
   showMsg: string;
   msgs: Message[] = [];
   codeExists = false;
   range: string;
   es: any;
   maxDate: Date;
   minDate: Date;
   fechaInicio: string;
   fechaFin: string;

   constructor( private rolesService: RolesService,
      private router: Router,
      private route: ActivatedRoute,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      rolesService.listRoles().subscribe( res => {
         this.roles = res;
      } );
   }

   ngOnInit() {
      this.route.params.subscribe( params => {
         this.showMsg = params[ 'msj' ];
         if ( this.showMsg === '1' ) {
            this._nav.setMesage( 1, this.msgs );
         }
      } );

      this.route.params
      .switchMap( ( params: Params ) => this.rolesService.viewRole( +params[ 'id' ] ) )
      .subscribe( rol => {
         this.rol = rol;
         // if ( this.rol.fechaInicio !== null ) {
         //    let momInicio: moment.Moment = moment( this.rol.fechaInicio, 'YYYY-MM-DD' );
         //    this.fechaInicio = momInicio.format( 'MM/DD/YYYY' );
         // }
         // if ( this.rol.fechaFin !== null ) {
         //    let momFin: moment.Moment = moment( this.rol.fechaFin, 'YYYY-MM-DD' );
         //    this.fechaFin = momFin.format( 'MM/DD/YYYY' );
         // }

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
      let nextYear = year + 3;
      this.range = `${year}:${nextYear}`;
   }

   onFechaInicio( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.fechaInicio = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.minDate = new Date( Date.parse( event ) );
   }

   onFechaFin( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.fechaFin = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.maxDate = new Date( Date.parse( event ) );
   }

   validateCode() {
      if ( this.rol.codigoRol !== '' && this.rol.codigoRol !== null ) {
         this.codeExists = this.roles.filter( t => (t.codigoRol === this.rol.codigoRol && t.idRol !== this.rol.idRol ) ).length > 0;
      } else {
         this.codeExists = false;
      }
   }

   capitalizeCode() {
      let input = this.rol.codigoRol;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.rol.codigoRol = input.toUpperCase().replace( /[^A-Z0-9]/, '' ).trim();
      }
   }

   goBack( fDirty: boolean ): void {
      if ( fDirty ) {
         this.confirmationService.confirm( {
                                              message: ` ¿Está seguro que desea salir sin guardar?`,
                                              header: 'Confirmación',
                                              icon: 'fa fa-question-circle',
                                              accept: () => {
                                                 this.router.navigate( [ 'roles' ] );
                                              }
                                           } );
      } else {
         this.router.navigate( [ 'roles' ] );
      }
   }

   capitalizeName() {
      let input = this.rol.rol;
      if ( input !== '' && input !== null && input !== undefined ) {
         this.rol.rol = input.toUpperCase();
      }
   }

   onSubmit() {

      this.rolesService.updateRole( this.rol ).then( () => {
         this.msgs = [];
         this._nav.setMesage( 2, this.msgs );
      } );

   }

   clearSelectionRol() {
      this.rol.fechaInicio = null;
      this.rol.fechaFin = null;
   }
}
