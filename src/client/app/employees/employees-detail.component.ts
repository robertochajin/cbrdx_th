import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import { NavService } from '../_services/_nav.service';
import * as moment from 'moment/moment';
import { PermissionService } from '../_services/permission.service';
import { PermissionsEmployees } from '../_models/permissionsEmployees';
import { UsuariosService } from '../_services/usuarios.service';

@Component( {
               moduleId: module.id,
               selector: 'employees-detail',
               templateUrl: 'employees-detail.component.html'
            } )

export class EmployeesDetailComponent implements OnInit {
   @Input()
   employee: Employee = new Employee();
   acordion: number;
   svcThUrl = '<%= SVC_TH_URL %>/api/upload';
   seccion1: PermissionsEmployees = new PermissionsEmployees();
   seccion2: PermissionsEmployees = new PermissionsEmployees();
   seccion3: PermissionsEmployees = new PermissionsEmployees();
   seccion4: PermissionsEmployees = new PermissionsEmployees();
   seccion5: PermissionsEmployees = new PermissionsEmployees();
   seccion6: PermissionsEmployees = new PermissionsEmployees();
   seccion7: PermissionsEmployees = new PermissionsEmployees();
   seccion8: PermissionsEmployees = new PermissionsEmployees();
   seccion9: PermissionsEmployees = new PermissionsEmployees();
   seccion10: PermissionsEmployees = new PermissionsEmployees();

   defaultCampo = { visible: true, editable: true };
   loadingAvatar: boolean = false;

   constructor( private employeeService: EmployeesService,
      private route: ActivatedRoute,
      private location: Location,
      private _nav: NavService,
      private permissionService: PermissionService,
      private router: Router,
      private usuariosService: UsuariosService ) {

      this.permissionService.getReglasFormularios( 'TERCEROS' ).subscribe( p => {
         let permisos = JSON.parse( p );
         this.seccion1 = permisos.DATOSGENERALES ? permisos.DATOSGENERALES : new PermissionsEmployees();
         this.seccion2 = permisos.DATOSADICIONALES ? permisos.DATOSADICIONALES : new PermissionsEmployees();
         this.seccion3 = permisos.DATOSCONTACTO ? permisos.DATOSCONTACTO : new PermissionsEmployees;
         this.seccion4 = permisos.INFORMACIONFAMILIAR ? permisos.INFORMACIONFAMILIAR : new PermissionsEmployees;
         this.seccion5 = permisos.UBICACION ? permisos.UBICACION : new PermissionsEmployees;
         this.seccion6 = permisos.ACTIVOS ? permisos.ACTIVOS : new PermissionsEmployees;
         this.seccion7 = permisos.FORMACIONACADEMICA ? permisos.FORMACIONACADEMICA : new PermissionsEmployees;
         this.seccion8 = permisos.EXPERIENCIALABORAL ? permisos.EXPERIENCIALABORAL : new PermissionsEmployees;
         this.seccion9 = permisos.REFERENCIAS ? permisos.REFERENCIAS : new PermissionsEmployees;
         this.seccion10 = permisos.DATOSCLINICOS ? permisos.DATOSCLINICOS : new PermissionsEmployees;
      } );
   }

   ngOnInit(): void {
      this.route.params.subscribe( ( params: Params ) => {
         this.employeeService.get( +params[ 'id' ] ).subscribe( employee => {
            this.employee = employee;
            this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
                                           this.employee.segundoNombre + ' ' +
                                           this.employee.primerApellido + ' ' +
                                           this.employee.segundoApellido;

            this.employee.edad = moment().diff( this.employee.fechaNacimiento, 'years', false ).toString();
            // console.info(this.svcThUrl+'/file/'+this.employee.imagen);
            // this.acordion=0;
            //
            //   if( this.employee.ciudadExpDocumento === null ) this.employee.ciudadExpDocumento='';
            //   if( this.employee.ciudadNacimiento === null ) this.employee.ciudadNacimiento='';
            //   if( this.employee.genero === null ) this.employee.genero='';
            //   if( this.employee.estadoCivil === null ) this.employee.estadoCivil='';
            //   if( this.employee.lateralidad === null ) this.employee.lateralidad='';
            //   if( this.employee.nivelEstudio === null ) this.employee.nivelEstudio='';
            //   if( this.employee.profesion === null ) this.employee.profesion='';

            // this.route.params.subscribe((params: Params) => {
            //   this.employeeService.getCargoActual(+params['id']).subscribe(c => {
            //     this.employee.cargoActual = c.cargo.cargo;});
            // });
            //
            // this.employeeService.getNacionalidad(this.employee.ciudadNacimiento.idDivisionPolitica)
            //     .subscribe(c => this.employee.nacionalidad = c.camino);

         } );
      } );

      this.acordion = this._nav.getTab();
      if ( this.acordion !== 0 ) {
         this.onFocusTab();
      }
   }

   goBack(): void {
      this.location.back();
   }

   onTabShow( e: any ) {
      this._nav.setTab( e.index );
      this.acordion = this._nav.getTab();

      this.onFocusTab();

   }

   update( id: number ) {
      this.router.navigate( [ 'employees/update/' + id ] );
   }

   onFocusTab() {
      // Focus  en accordionTab Activo
      setTimeout( () => {
         jQuery( 'body' ).animate( {
                                      scrollTop: jQuery( 'p-accordiontab > .ui-state-active' ).position().top + 90
                                   }, 'fast' );
      }, 1000 );
   }

   onBeforeSend( event: any ) {
      event.xhr.setRequestHeader( 'Authorization', localStorage.getItem( 'token' ) );
   }

   onBeforeUpload() {
      // this.loadingAvatar = true;
   }

   onUpload( event: any ) {
      this.employee.imagen = event.xhr.responseText;
      console.info( this.employee.idTercero );
      console.info( this._nav.getUsuarioLogeado().usuario.idTercero );
      if ( this.employee.idTercero === this._nav.getUsuarioLogeado().usuario.idTercero ) {
         this.usuariosService.refreshToken();
         this._nav.setAvatar( this.employee.imagen );
      }
      this.loadingAvatar = false;
   }

}

