import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Rol } from "../_models/rol";
import { RolesService } from "../_services/roles.service";
import { Router,ActivatedRoute, Params } from "@angular/router";
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
export class RolesUpdateComponent {
   
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
                private route: ActivatedRoute,
                private menuElementoService: MenuElementoService,
                private location: Location,
                private confirmationService: ConfirmationService ) {
      rolesService.listRoles().subscribe( res => {
         this.roles = res;
      } );
   }
   
   ngOnInit() {
      
      this.route.params
      .switchMap( ( params: Params ) => this.rolesService.viewRole( +params[ 'id' ] ) )
      .subscribe( rol => {
         this.rol = rol;
         if ( this.rol.fechaInicio != null ) {
            let momInicio: moment.Moment = moment( this.rol.fechaInicio, 'YYYY-MM-DD');
            this.fechaInicio = momInicio.format(  'MM/DD/YYYY'  );
         }
         if ( this.rol.fechaFin != null ) {
            let momFin: moment.Moment = moment( this.rol.fechaFin, 'YYYY-MM-DD'  );
            this.fechaFin = momFin.format( 'MM/DD/YYYY' );
         }

      } );

      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };
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
      let input = this.rol.descripcion;
      if ( input != "" && input != null ) {
         this.rol.descripcion = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
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
      this.rolesService.updateRole( this.rol ).then( res => {
         this.router.navigate( [ 'roles/update/' + res.idRol ] );
      } );
      
   }
   
}