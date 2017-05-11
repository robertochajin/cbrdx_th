import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyInformationService } from './family-information.service';
import { ConstructorFamilyInformation } from './family-information.construct';
import { ConfirmationService } from 'primeng/primeng';
import { Employee } from '../_models/employees';
import * as moment from 'moment/moment';

@Component( {
               moduleId: module.id,
               templateUrl: 'family-information.component.html',
               selector: 'family-information',
               providers: [ ConfirmationService ]
            } )
export class FamilyInformationComponent implements OnInit {
   @Input() employee: Employee;
   familyInformation: ConstructorFamilyInformation = new ConstructorFamilyInformation();
   dialogObjet: ConstructorFamilyInformation = new ConstructorFamilyInformation();
   familyInformations: ConstructorFamilyInformation[];

   constructor( private familyInformationService: FamilyInformationService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {

      this.familyInformationService.getAllByEmployee( this.employee.idTercero ).subscribe(
         familyInformations => {
            this.familyInformations = familyInformations;
            this.familyInformations.forEach( e => {
               e.nombreCompleto = e.primerNombre + ' ' + e.segundoNombre + ' ' + e.primerApellido + ' ' + e.segundoApellido;
               e.edad = moment( e.fechaNacimiento, 'YYYY-MM-DD' ).toNow( true ).toString();
            } );
         }
      );
   }

   del( f: ConstructorFamilyInformation ) {
      this.dialogObjet = f;
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea eliminar?`,
                                           header: 'Corfirmación',
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
      return this.router.navigate( [ 'employees/detail/'+ this.employee.idTercero + '/family-information/add'  ] );
   }

   update( f: ConstructorFamilyInformation ) {
      return this.router.navigate( [ 'employees/detail/'+ this.employee.idTercero + '/family-information/update/' + f.idTerceroFamiliar] );
   }

   detail( f: ConstructorFamilyInformation ) {
      return this.router.navigate( [ 'employees/detail/'+ this.employee.idTercero + '/family-information/detail/' + f.idTerceroFamiliar ] );
   }

}
