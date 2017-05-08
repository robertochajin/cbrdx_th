import {Component, OnInit} from '@angular/core';
import { Positions } from '../_models/positions';
import { PositionsService } from '../_services/positions.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

@Component( {
               moduleId: module.id,
               templateUrl: 'positions.component.html',
               selector: 'positions-list',
               providers: [ ConfirmationService ]
            } )

export class PositionsComponent implements OnInit {

   position: Positions = new Positions();
   positions: Positions[];
   dialogObjet: Positions = new Positions();

   constructor( private positionsService: PositionsService,
      private router: Router,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.positionsService.getAll().subscribe(
         positions => {
            this.positions = positions;
         }
      );

   }

   del( positions: Positions ) {
      this.dialogObjet = positions;
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.positionsService.update( this.dialogObjet ).subscribe( r => {
                                                 this.positions.splice( this.positions.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

   detail( f: Positions ) {
      this.router.navigate( [ 'positions/detail/' + f.idCargo ] );
   }

   add() {
      this.router.navigate( [ 'positions/add' ] );
   }

   update( c: Positions ) {
      this.router.navigate( [ 'positions/update/' + c.idCargo ] );
   }

}
