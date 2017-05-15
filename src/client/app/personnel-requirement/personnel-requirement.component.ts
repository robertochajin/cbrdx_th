import { Component, OnInit } from '@angular/core';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'personnel-requirement.component.html',
               selector: 'personnel-requirement',
               providers: [ ConfirmationService ]
            } )

export class PersonnelRequirementComponent implements OnInit {

   personnelRequirement: PersonnelRequirement = new PersonnelRequirement();
   dialogObjet: PersonnelRequirement = new PersonnelRequirement();
   personnelRequirements: PersonnelRequirement[];
   idUser: number;

   constructor( private personnelRequirementServices: PersonnelRequirementServices,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.personnelRequirementServices.getAllEnabledByUser(this.idUser).subscribe(
         personnelRequirements => {
            this.personnelRequirements = personnelRequirements;
         }
      );
   }

   del( FaS: PersonnelRequirement ) {
      this.dialogObjet = FaS;
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.personnelRequirementServices.update( this.dialogObjet ).subscribe( r => {
                                                 this.personnelRequirements.splice( this.personnelRequirements.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   add() {
      this.router.navigate( [ 'personnelRequirements/add' ] );
   }

   update( FaS: PersonnelRequirement ) {
      this.router.navigate( [ 'personnelRequirements/update/' + FaS.idRequerimiento ] );
   }

   detail( FaS: PersonnelRequirement ) {
      this.router.navigate( [ 'personnelRequirements/detail/' + FaS.idRequerimiento ] );
   }

}
