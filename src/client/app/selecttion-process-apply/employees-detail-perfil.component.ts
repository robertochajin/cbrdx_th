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
import { EmployeesPublications } from '../_models/employeesPublications';

@Component( {
               moduleId: module.id,
               selector: 'employees-detail-perfil',
               templateUrl: 'employees-detail-perfil.component.html'
            } )

export class EmployeesDetailPerfilComponent implements OnInit {
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
   idTercerosPublicaciones: number;
   defaultCampo = { visible: true, editable: true };
   loadingAvatar: boolean = false;
   employeesPublication: EmployeesPublications;

   constructor( private employeeService: EmployeesService,
      private route: ActivatedRoute,
      private location: Location,
      private _nav: NavService,
      private permissionService: PermissionService,
      private router: Router,
      private usuariosService: UsuariosService ) {

   }

   ngOnInit(): void {
      this.route.params.subscribe( ( params: Params ) => {
         this.idTercerosPublicaciones = +params[ 'idTercerosPublicaciones' ];
         this.employeeService.getPublicationById( this.idTercerosPublicaciones ).subscribe( res => {
            this.employeesPublication = res;
            this.employeeService.get( this.employeesPublication.idTercero ).subscribe( employee => {
               this.employee = employee;
               this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
                                              this.employee.segundoNombre + ' ' +
                                              this.employee.primerApellido + ' ' +
                                              this.employee.segundoApellido;

               this.employee.edad = moment( this.employee.fechaNacimiento, 'YYYY-MM-DD' ).toNow( true ).toString();
            } );
         } );

      } );

      this.acordion = 0;
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
      if ( this.employee.idTercero === this._nav.getUsuarioLogeado().usuario.idTercero ) {
         this.usuariosService.refreshToken();
         this._nav.setAvatar( this.employee.imagen );
      }
      this.loadingAvatar = false;
   }

   goNext(): void {
      this.router.navigate( [ 'apply-vacancy/questionnaires/' + this.idTercerosPublicaciones ] );
   }

}

