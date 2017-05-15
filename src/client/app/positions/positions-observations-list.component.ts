import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Positions } from '../_models/positions';
import { PositionsObservations } from '../_models/positionsObservations';
import { PositionsService } from '../_services/positions.service';
import { ListPositionsService } from '../_services/lists-positions.service';
import { Message, ConfirmationService } from 'primeng/primeng';
import { ListaItem } from '../_models/listaItem';
import { ListaService } from '../_services/lista.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'positions-observations-list.component.html',
               selector: 'positions-observations-list',
               providers: [ ConfirmationService ]
            } )
export class PositionsObservationsListComponent implements OnInit {

   @Input() position: Positions;
   observation: PositionsObservations = new PositionsObservations();
   dialogObjet: PositionsObservations = new PositionsObservations();
   observations: PositionsObservations[];
   showForm = false;
   liststateTypes: ListaItem[];
   stateTypes: ListaItem[];

   msgs: Message[] = [];

   constructor( private positionsService: PositionsService,
      private router: Router,
      private route: ActivatedRoute,
      private listaService: ListaService,
      private confirmationService: ConfirmationService,
      private listPositionsService: ListPositionsService ) {

   }

   ngOnInit() {
      if ( this.position.idCargo ) {
         this.positionsService.getObservationsbyPosition( this.position.idCargo ).subscribe( observations => {
            this.observations = observations;
            this.listaService.getMasterDetails( 'ListasEstadosCargos' ).subscribe( res => {
               this.liststateTypes = res;
               this.nombresEstados();
            } );
         } );
      }
   }

   onSubmitObservacion() {
      this.msgs = [];
      this.showForm = false;
      this.observation.idCargo = this.position.idCargo;
      this.observation.idEstadoCargo = this.position.idEstado;

      if ( this.observation.idCargoEstadoObservacion === null ||
           this.observation.idCargoEstadoObservacion === 0  ||
           this.observation.idCargoEstadoObservacion === undefined ) {
         this.positionsService.addObservations( this.observation )
         .subscribe( data => {
            this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
            this.positionsService.getObservationsbyPosition( this.position.idCargo ).subscribe(
               observations => {
                  this.observations = observations;
                  this.nombresEstados();
               }
            );
         }, error => {
            this.showForm = true;
            this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
         } );
      } else {
         this.positionsService.updateObservations( this.observation )
         .subscribe( data => {
            this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
            this.positionsService.getObservationsbyPosition( this.position.idCargo ).subscribe(
               observations => {
                  this.observations = observations;
                  this.nombresEstados();
               }
            );
         }, error => {
            this.showForm = true;
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
      this.showForm = true;
   }

   update( f: PositionsObservations ) {
      this.msgs = [];
      this.observation = f;
      this.showForm = true;
   }

   goBackUpdate() {
      this.msgs = [];
      this.showForm = false;
   }

   nombresEstados() {
      for ( let i = 0; i < this.observations.length; i++ ) {
         if ( this.observations[ i ].idEstadoCargo !== null ) {
            this.stateTypes = this.liststateTypes.filter( estado => {
               return estado.idLista === this.observations[ i ].idEstadoCargo;
            } );
            this.observations[ i ].estadoCargo = this.stateTypes[ 0 ].nombre;
         }
      }
   }

}
