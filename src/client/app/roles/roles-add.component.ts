import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Rol } from "../_models/rol";
import { RolesService } from "../_services/roles.service";
import { Router } from "@angular/router";
import { VRolMenuElemento } from "../_models/vRolMenuElemento";
import { MenuElementoService } from "../_services/menuElemento.service";
import { MenuElemento } from "../_models/menuElemento";
import { ConfirmationService } from "primeng/primeng";
import * as moment from "moment/moment";

@Component( {
               moduleId: module.id,
               templateUrl: 'roles-form.component.html',
               selector: 'roles-form.component',
               providers: [ ConfirmationService ]
            } )
export class RolesAddComponent {
   
   rol: Rol = new Rol();
   roles: Rol[];
   
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
                private menuElementoService: MenuElementoService,
                private location: Location,
                private confirmationService: ConfirmationService ) {
      rolesService.listRoles().subscribe( res => {
         this.roles = res;
      } );
   }
   
   ngOnInit() {
      this.rol.idRol=null;
      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
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
      this.fechaInicio = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.minDate = new Date( Date.parse( event ) );
   }
   
   onFechaFin( event: any ) {
      let d = new Date( Date.parse( event ) );
      this.fechaFin = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      this.maxDate = new Date( Date.parse( event ) );
   }
   
   validateCode() {
      if ( this.rol.codigoRol != "" && this.rol.codigoRol != null ) {
         this.codeExists = this.roles.filter( t => (t.codigoRol === this.rol.codigoRol && t.idRol != this.rol.idRol ) ).length > 0;
      } else {
         this.codeExists = false;
      }
   }
   
   capitalizeCode() {
      let input = this.rol.codigoRol;
      if ( input != "" && input != null ) {
         this.rol.codigoRol = input.toUpperCase().replace( ' ', '' ).trim();
      }
   }
   
   goBack(): void {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea salir sin guardar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.location.back();
                                           }
                                        } );
   }
   
   capitalizeName() {
      let input = this.rol.rol;
      if ( input != "" && input != null ) {
         this.rol.rol = input.toUpperCase();
      }
   }
   
   onSubmit() {
      
      if ( this.fechaInicio != null ) {
         let momInicio: moment.Moment = moment( this.fechaInicio, 'MM/DD/YYYY' );
         this.rol.fechaInicio = momInicio.format( 'YYYY-MM-DD' );
      }
      if ( this.fechaFin != null ) {
         let momFin: moment.Moment = moment( this.fechaFin, 'MM/DD/YYYY' );
         this.rol.fechaFin = momFin.format( 'YYYY-MM-DD' );
      }
      this.rolesService.addRole( this.rol ).then( res => {
         this.router.navigate( [ 'roles/update/' + res.idRol +'/true'] );
      } );
      
   }
   
   clearSelectionRol() {
      this.fechaInicio = null;
      this.fechaFin = null;
   }
}