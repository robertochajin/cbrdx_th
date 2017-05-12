import { Component, OnInit } from '@angular/core';
import { FaultsAndSanctions } from '../_models/faultsAndSanctions';
import { FaultsAndSanctionsService } from '../_services/faultsAndSanctions.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'faults-and-sanctions.component.html',
               selector: 'faults-and-sanctions',
               providers: [ ConfirmationService ]
            } )

export class FaultsAndSanctionsComponent implements OnInit {

   fault: FaultsAndSanctions = new FaultsAndSanctions();
   dialogObjet: FaultsAndSanctions = new FaultsAndSanctions();
   faults: FaultsAndSanctions[];

   constructor( private faultsAndSanctionsService: FaultsAndSanctionsService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.faultsAndSanctionsService.getAll().subscribe(
         faults => {
            this.faults = faults;
         }
      );
   }

   del( FaS: FaultsAndSanctions ) {
      this.dialogObjet = FaS;
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.faultsAndSanctionsService.update( this.dialogObjet ).subscribe( r => {
                                                 this.faults.splice( this.faults.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   add() {
      this.router.navigate( [ 'faults/add' ] );
   }

   update( FaS: FaultsAndSanctions ) {
      this.router.navigate( [ 'faults/update/' + FaS.idFalta ] );
   }

}
