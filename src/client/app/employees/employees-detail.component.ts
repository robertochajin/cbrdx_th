import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/employees';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               selector: 'employees-detail',
               templateUrl: 'employees-detail.component.html'
            } )

export class EmployeesDetailComponent implements OnInit {
   @Input()
   employee: Employee = new Employee();
   acordion: number;

   constructor( private employeeService: EmployeesService,
      private route: ActivatedRoute,
      private location: Location,
      private _nav: NavService,
      private router: Router ) {
   }

   ngOnInit(): void {
      this.route.params.subscribe( ( params: Params ) => {
         this.employeeService.get( +params[ 'id' ] ).subscribe( employee => {
            this.employee = employee;
            this.employee.nombreCompleto = this.employee.primerNombre + ' ' +
                                           this.employee.segundoNombre + ' ' +
                                           this.employee.primerApellido + ' ' +
                                           this.employee.segundoApellido;

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

}

