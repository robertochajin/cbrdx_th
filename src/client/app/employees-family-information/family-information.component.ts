import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyInformationService } from './family-information.service';
import { ConstructorFamilyInformation } from './family-information.construct';
import { ConfirmationService } from 'primeng/primeng';
import { Employee } from '../_models/employees';
import * as moment from 'moment/moment';
import { NavService } from '../_services/_nav.service';
import { PermissionsEmployees } from '../_models/permissionsEmployees';

@Component( {
               moduleId: module.id,
               templateUrl: 'family-information.component.html',
               selector: 'family-information',
               providers: [ ConfirmationService ]
            } )
export class FamilyInformationComponent implements OnInit {
   @Input() employee: Employee;
   @Input() seccion: PermissionsEmployees;
   familyInformation: ConstructorFamilyInformation = new ConstructorFamilyInformation();
   dialogObjet: ConstructorFamilyInformation = new ConstructorFamilyInformation();
   familyInformations: ConstructorFamilyInformation[];
   busqueda: string;

   constructor( private familyInformationService: FamilyInformationService,
      private router: Router,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
      this.busqueda = this._nav.getSearch( 'family-information.component' );
   }

   ngOnInit() {

      this.familyInformationService.getAllByEmployee( this.employee.idTercero ).subscribe(
         familyInformations => {
            this.familyInformations = familyInformations;
            this.familyInformations.forEach( e => {
               e.nombreCompleto = e.primerNombre + ' ' + e.segundoNombre + ' ' + e.primerApellido + ' ' + e.segundoApellido;
               e.edad = moment().diff( e.fechaNacimiento, 'years', false ).toString();

            } );
         }
      );
   }

   del( f: ConstructorFamilyInformation ) {
      this.dialogObjet = f;
      this.confirmationService.confirm( {
                                           message: ` ¿Está seguro que desea inactivar el registro?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.dialogObjet.auditoriaFecha = '';
                                              this.dialogObjet.auditoriaUsuario = 1;
                                              this.familyInformationService.update( this.dialogObjet ).subscribe( ( r: any ) => {
                                                 this.familyInformations.splice( this.familyInformations.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           }
                                        } );
   }

   add() {
      return this.router.navigate( [ 'employees/detail/' + this.employee.idTercero + '/family-information/add' ] );
   }

   update( f: ConstructorFamilyInformation ) {
      return this.router.navigate(
         [ 'employees/detail/' + this.employee.idTercero + '/family-information/update/' + f.idTerceroFamiliar ] );
   }

   detail( f: ConstructorFamilyInformation ) {
      return this.router.navigate(
         [ 'employees/detail/' + this.employee.idTercero + '/family-information/detail/' + f.idTerceroFamiliar ] );
   }
   setSearch() {
      this._nav.setSearch( 'family-information.component', this.busqueda );
   }
}
