import { Component } from "@angular/core";
import { Location }                 from '@angular/common';
import { Rol } from "../_models/rol";
import { RolesService } from "../_services/roles.service";
import { Router } from "@angular/router";
import { VRolMenuElemento } from "../_models/vRolMenuElemento";
import { MenuElementoService } from "../_services/menuElemento.service";
import { MenuElemento } from "../_models/menuElemento";
import { ConfirmationService } from "primeng/primeng";
import * as moment from 'moment/moment';

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
   maxDate:Date;
   minDate:Date;
   fechaInicio:Date;
   fechaFin:Date;
   
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
      
      /*this.route.params
       .switchMap((params: Params) => this.employeesService.get(+params['id']))
       .subscribe(employee => {
       this.employee = employee;
       this.updateActivities(this.employee.idSectorEconomico);
       
       
       let mom: moment.Moment = moment(this.employee.fechaDocumento, 'YYYY-MM-DD');
       this.expeditionDate = mom.format('MM/DD/YYYY');
       
       let mom2: moment.Moment = moment(this.employee.fechaNacimiento, 'YYYY-MM-DD');
       this.birthDate = mom2.format('MM/DD/YYYY');
       
       
       if (this.employee.indicadorVivo == false) {
       let mom3: moment.Moment = moment(this.employee.fechaDefuncion, 'YYYY-MM-DD');
       this.deathDate = mom3.format('MM/DD/YYYY');
       }
       
       this.ciudadExpDocumento = this.employee.ciudadExpDocumento;
       this.backupCiudadExpDocumento = this.employee.ciudadExpDocumento;
       this.ciudadNacimiento = this.employee.ciudadNacimiento;
       this.backupCiudadNacimiento = this.employee.ciudadNacimiento;
       });
       */
      this.es = {
         firstDayOfWeek: 1,
         dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
         dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
         dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
         monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
         monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ]
      };
   }
   
   onFechaInicio(event:any) {
      this.minDate = new Date(Date.parse(event));
   }
   
   onFechaFin(event:any) {
      this.maxDate = new Date(Date.parse(event));
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
      this.confirmationService.confirm({
                                          message: ` ¿Esta seguro que desea salir sin guardar?`,
                                          header: 'Corfirmación',
                                          icon: 'fa fa-question-circle',
                                          accept: () => {
                                             this.location.back();
                                          }
                                       });
   }
   
   capitalizeName() {
      let input = this.rol.descripcion;
      if ( input != "" && input != null ) {
         this.rol.descripcion = input.substring( 0, 1 ).toUpperCase() + input.substring( 1 ).toLowerCase();
      }
   }
   
   /*createMaster(f: NgForm) {
    this.rolesService.addRole(this.rol).then(res => {
    f.resetForm();
    this.masterCreated = true;
    this.rol = res;
    });
    }*/
   /*
    
    addFunction() {
    
    let mom: moment.Moment = moment(this.expeditionDate, 'MM/DD/YYYY');
    this.employee.fechaDocumento = mom.format('YYYY-MM-DD');
    let mom2: moment.Moment = moment(this.birthDate, 'MM/DD/YYYY');
    this.employee.fechaNacimiento = mom2.format('YYYY-MM-DD');
    if (this.employee.indicadorVivo == false) {
    let mom3: moment.Moment = moment(this.deathDate, 'MM/DD/YYYY');
    this.employee.fechaDefuncion = mom3.format('YYYY-MM-DD');
    }
    this.employee.idTipoTercero = this.idTipoTercero;
    
    this.menuElementoService.listMenuElemento().subscribe(res => {
    this.elementosMenu = res;
    this.isAdding = true;
    });
    }
    
    createDetail() {
    this.rolesService.getAssignedFunctions(this.rol.idRol).subscribe(res => {
    this.asignedRoles = res;
    this.isAdding = false;
    });
    }
 */
}