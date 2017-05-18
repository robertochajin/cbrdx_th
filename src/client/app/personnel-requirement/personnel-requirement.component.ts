import { Component, OnInit } from '@angular/core';
import { PersonnelRequirement } from '../_models/personnelRequirement';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Location } from '@angular/common';
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
   jwtHelper: JwtHelper = new JwtHelper();
   tokendecoded: any = { sub: '', usuario: '', nombre: '' };

   constructor( private personnelRequirementServices: PersonnelRequirementServices,
      private location: Location,
      private router: Router,
      private confirmationService: ConfirmationService ) {
      let token = localStorage.getItem( 'token' );

      if ( token !== null && token !== undefined ) {
         this.tokendecoded = this.jwtHelper.decodeToken( token );
      } else {
         location.back();
      }
   }

   ngOnInit() {
      this.personnelRequirementServices.getAllEnabledByUser(this.tokendecoded.usuario.idUsuario).subscribe(
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
      this.router.navigate( [ 'personnel-requirement/add' ] );
   }

   update( FaS: PersonnelRequirement ) {
      this.router.navigate( [ 'personnel-requirement/update/' + FaS.idRequerimiento ] );
   }

   detail( FaS: PersonnelRequirement ) {
      this.router.navigate( [ 'personnel-requirement/detail/' + FaS.idRequerimiento ] );
   }

}
