// import { Component, OnInit } from '@angular/core';
// import { PersonnelRequirement } from '../_models/faultsAndSanctions';
// import { PersonnelRequirementService } from '../_services/faultsAndSanctions.service';
// import { Router } from '@angular/router';
// import { ConfirmationService } from 'primeng/primeng';
//
// @Component( {
//                moduleId: module.id,
//                templateUrl: 'personnel-requirement.component.html',
//                selector: 'personnel-requirement',
//                providers: [ ConfirmationService ]
//             } )
//
// export class PersonnelRequirementComponent implements OnInit {
//
//    fault: PersonnelRequirement = new PersonnelRequirement();
//    dialogObjet: PersonnelRequirement = new PersonnelRequirement();
//    faults: PersonnelRequirement[];
//
//    constructor( private personnelRequirementService: PersonnelRequirementService,
//       private router: Router,
//       private confirmationService: ConfirmationService ) {
//    }
//
//    ngOnInit() {
//       this.personnelRequirementService.getAll().subscribe(
//          faults => {
//             this.faults = faults;
//          }
//       );
//    }
//
//    del( FaS: PersonnelRequirement ) {
//       this.dialogObjet = FaS;
//       this.confirmationService.confirm( {
//                                            message: ` ¿Esta seguro que lo desea eliminar?`,
//                                            header: 'Corfirmación',
//                                            icon: 'fa fa-question-circle',
//                                            accept: () => {
//                                               this.dialogObjet.indicadorHabilitado = false;
//                                               this.faultsAndSanctionsService.update( this.dialogObjet ).subscribe( r => {
//                                                  this.faults.splice( this.faults.indexOf( this.dialogObjet ), 1 );
//                                                  this.dialogObjet = null;
//                                               } );
//                                            },
//                                            reject: () => {
//                                               this.dialogObjet = null;
//                                            }
//                                         } );
//    }
//
//    add() {
//       this.router.navigate( [ 'faults/add' ] );
//    }
//
//    update( FaS: PersonnelRequirement ) {
//       this.router.navigate( [ 'faults/update/' + FaS.idFalta ] );
//    }
//
// }
