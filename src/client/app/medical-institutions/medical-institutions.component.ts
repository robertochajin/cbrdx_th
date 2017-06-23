import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { MedicalInstitution } from '../_models/medical-institutions';
import { MedicalInstitutionService } from '../_services/medical-institutions.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'medical-institutions.component.html',
               selector: 'medical-institution',
               providers: [ ConfirmationService ]
            } )
export class MedicalInstitutionsComponent implements OnInit {

   medicalInstitution: MedicalInstitution = new MedicalInstitution();
   dialogObjet: MedicalInstitution = new MedicalInstitution();

   medicalInstitutions: MedicalInstitution[];

   constructor(
      private medicalInstitutionService: MedicalInstitutionService,
      private router: Router,
      private confirmationService: ConfirmationService
   ) {
   }

   ngOnInit() {

      this.medicalInstitutionService.getAll(  ).subscribe(
         data => {
            this.medicalInstitutions = data;

         }
      );

   }

   del( medicalInstitution: MedicalInstitution ) {
      this.dialogObjet = medicalInstitution;
      this.confirmationService.confirm( {
                                           message: `¿Está seguro que desea inactivar este registro?`,
                                           header: 'Confirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.medicalInstitutionService.update( this.dialogObjet ).subscribe( r => {
                                                 this.medicalInstitutions.splice( this.medicalInstitutions.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   add() {
      this.router.navigate( [ 'medical-institutions/add' ] );
   }

   detail( c: MedicalInstitution ) {
      this.router.navigate( [ 'medical-institutions/detail/' + c.idInstitucionMedica  ] );
   }

   update( c: MedicalInstitution ) {
      this.router.navigate( [ 'medical-institutions/update/' + c.idInstitucionMedica] );
   }
}
