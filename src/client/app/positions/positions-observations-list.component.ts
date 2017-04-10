import { Component, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Positions } from "../_models/positions";
import { PositionsObservations } from "../_models/positionsObservations";
import { PositionsService } from "../_services/positions.service";

import { SelectItem, Message, ConfirmationService } from "primeng/primeng";

@Component( {
               moduleId: module.id,
               templateUrl: 'positions-observations-list.component.html',
               selector: 'positions-observations-list',
               providers: [ ConfirmationService ]
            } )
export class PositionsObservationsListComponent {
   
   @Input()  position: Positions;
   observation: PositionsObservations = new PositionsObservations();
   lobservation: PositionsObservations = new PositionsObservations();
   dialogObjet: PositionsObservations = new PositionsObservations();
   observations: PositionsObservations[];
   show_form: boolean = false;
   
   msgs: Message[] = [];
   
   constructor( private positionsService: PositionsService,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService ) {
      
   }
   
   ngOnInit() {
     
      this.positionsService.getObservationsbyPosition( this.position.idCargo ).subscribe(
         observations => this.observations = observations
      );
      
   }
   
   onSubmit() {
      this.msgs = [];
      this.show_form = false;
      this.observation.idCargo = this.position.idCargo;
      if ( this.observation.idCargo == null || this.observation.idCargo == 0 ) {
         this.positionsService.addObservations( this.observation )
         .subscribe( data => {
            this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
            this.positionsService.getObservationsbyPosition( this.position.idCargo ).subscribe(
               observations => this.observations = observations
            );
         }, error => {
            this.show_form = true;
            this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         } );
      } else {
         this.positionsService.updateObservations( this.observation )
         .subscribe( data => {
            this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
            this.positionsService.getObservationsbyPosition( this.position.idCargo ).subscribe(
               observations => this.observations = observations
            );
         }, error => {
            this.show_form = true;
            this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         } );
      }
   }
   
   delete( f: PositionsObservations ) {
      this.dialogObjet = f;
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea eliminar el contacto?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.positionsService.updateObservations( this.dialogObjet ).subscribe( r => {
                                                 this.observations.splice( this.observations.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }
   
   add() {
      this.msgs = [];
      this.observation = new PositionsObservations();
      this.show_form = true;
   }
   
   update( f: PositionsObservations ) {
      this.msgs = [];
      this.observation = f;
      this.show_form = true;
   }
   
   goBackUpdate() {
      this.msgs = [];
      this.show_form = false;
   }
   
}
