import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { PositionResponsabilitiesService } from '../_services/position-responsabilities.service';
import { ResponsabilitiesServices } from '../_services/responsabilities.service';
import { Responsabilities } from '../_models/responsabilities';
import { PositionResponsabilities } from '../_models/positionResponsabilities';
import { Positions } from '../_models/positions';
import { Message } from 'primeng/components/common/api';

@Component( {
               moduleId: module.id,
               templateUrl: 'position-responsabilities.component.html',
               selector: 'position-responsabilities',
               providers: [ ConfirmationService ]
            } )
export class PositionResponsabilitiesComponent {

   @Input()
   position: Positions;
   responsabilities: SelectItem[] = [];
   tr: PositionResponsabilities = new PositionResponsabilities();
   positionResponsabilities: PositionResponsabilities [] = [];
   guardando: boolean = false;
   msgsAlert: Message[] = [];

   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   constructor( private router: Router,
      private positionResponsabilitiesService: PositionResponsabilitiesService,
      private responsabilitiesServices: ResponsabilitiesServices,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {

      this.responsabilitiesServices.getAllEnabledByPosition( this.position.idCargo ).subscribe(
         responsabilities => {
            this.responsabilities.unshift( { label: 'Seleccione', value: null } );
            responsabilities.map( ( s: Responsabilities ) => {
               this.responsabilities.push( { label: s.responsabilidad, value: s.idResponsabilidad } );
            } );
         }
      );

      this.positionResponsabilitiesService.getAllByPosition( this.position.idCargo ).subscribe( prs => {
         this.positionResponsabilities = prs;
      } );
   }

   save( pr: PositionResponsabilities ) {
      pr.indicadorHabilitado = true;
      pr.idCargo = this.position.idCargo;
      this.guardando = true;
      this.positionResponsabilitiesService.add( pr ).subscribe( res => {
         if ( res.idResponsabilidad ) {
            this.responsabilities.map( ( r ) => {
               if ( pr.idResponsabilidad === r.value ) {
                  this.responsabilities.splice( this.responsabilities.indexOf( r ), 1 );
                  this.tr.idResponsabilidad = null;
               }
            } );
            this.positionResponsabilitiesService.getAllByPosition( this.position.idCargo ).subscribe( prs => {
               this.positionResponsabilities = prs;
               this.guardando = false;
            } );
         }
      } );
   }

   del( r: PositionResponsabilities ) {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.guardando = true;
                                              r.indicadorHabilitado = false;
                                              this.positionResponsabilitiesService.update( r ).subscribe( res => {
                                                 this.positionResponsabilities.splice( this.positionResponsabilities.indexOf( r ), 1 );
                                                 this.responsabilities = [];
                                                 this.responsabilitiesServices.getAllEnabledByPosition( this.position.idCargo ).subscribe(
                                                    responsabilities => {
                                                       this.responsabilities.unshift( { label: 'Seleccione', value: null } );
                                                       responsabilities.map( ( s: Responsabilities ) => {
                                                          this.responsabilities.push(
                                                             { label: s.responsabilidad, value: s.idResponsabilidad } );
                                                       } );
                                                       this.guardando = false;
                                                    }
                                                 );
                                              } );
                                           }, reject: () => {
         }
                                        } );
   }

   next() {
      if ( this.positionResponsabilities.length > 0 ) {
         this.nextStep.emit( 5 );
         this.msgsAlert = [];
      } else {
         this.msgsAlert[ 0 ] = { severity: 'alert', summary: 'Error', detail: 'Debe llenar al menos una responsabilidad' };
      }
   }

}
