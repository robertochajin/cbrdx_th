import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { Positions } from '../_models/positions';
import { PositionRoles } from '../_models/positionRoles';
import { ProcessRoles } from '../_models/processRoles';
import { PositionRolesServices } from '../_services/position-roles.service';
import { Message } from 'primeng/components/common/api';
import { ListaService } from '../_services/lista.service';
import { NavService } from '../_services/_nav.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'position-roles.component.html',
               selector: 'position-roles',
               providers: [ ConfirmationService ]
            } )
export class PositionRolesComponent implements OnInit {
   @Input()
   position: Positions;
   processRoles: ProcessRoles[] = [];
   positionRoles: PositionRoles [] = [];
   msgsAlert: Message[] = [];
   msgs: Message[] = [];
   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   constructor( private router: Router,
      private positionRolesServices: PositionRolesServices,
      private listaService: ListaService,
      private _nav: NavService,
      private confirmationService: ConfirmationService ) {
   }

   ngOnInit() {
      this.listaService.getMasterDetails( 'ListasRolesProceso' ).subscribe( processRoles => {
         processRoles.map( li => {
            this.processRoles.push( new ProcessRoles( li.idLista, li.codigo, li.nombre, li.orden ) );
         } );
         this.positionRolesServices.getAllByPosition( this.position.idCargo ).subscribe( prs => {
            this.positionRoles = prs;
            this.processRoles.map( ( r: ProcessRoles ) => {
               this.positionRoles.map( ( pr: PositionRoles ) => {
                  if ( pr.idRolProceso === r.idLista ) {
                     r.asignadoAlCargo = true;
                  }
               } );
            } );
         } );
      } );
   }

   updateProcessRol( rol: ProcessRoles ) {
      this.msgsAlert = [];
      let objUpdate = this.positionRoles.find( s => rol.idLista === s.idRolProceso );
      if ( objUpdate !== undefined ) {
         // Update the existing one
         objUpdate.indicadorHabilitado = rol.asignadoAlCargo;
         let num = 0;
         for ( let elemento of this.processRoles ) {
            if ( elemento.asignadoAlCargo ) {
               num++;
            }
         }
         if ( num === 0 && objUpdate.indicadorHabilitado === false ) {
            this.msgsAlert[ 0 ] = { severity: 'error', summary: 'Error', detail: 'Debe seleccional al menos un rol' };
            objUpdate.indicadorHabilitado = true;
         } else {
            this.positionRolesServices.update( objUpdate ).subscribe( data => {
               this._nav.setMesage( 2, this.msgs );
            } );
         }
      } else {
         // Add new record to PotitionRoles
         let objAdd: PositionRoles = new PositionRoles();
         objAdd.idRolProceso = rol.idLista;
         objAdd.idCargo = this.position.idCargo;
         this.positionRolesServices.add( objAdd ).subscribe( data => {
            this.positionRoles.push( data );
            this._nav.setMesage( 1, this.msgs );
         } );
      }
   }

   save( pr: PositionRoles ) {
      pr.indicadorHabilitado = true;
      pr.idCargo = this.position.idCargo;
      this.positionRolesServices.add( pr ).subscribe( res => {
         this._nav.setMesage( 1, this.msgs );
         if ( res.idResponsabilidad ) {
            this.positionRolesServices.getAllByPosition( this.position.idCargo ).subscribe( prs => {
               this.positionRoles = prs;
            } );
         }
      } );
   }

   del( r: PositionRoles ) {
      this.confirmationService.confirm( {
                                           message: ` ¿Esta seguro que desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              r.indicadorHabilitado = false;
                                              this.positionRolesServices.update( r ).subscribe();
                                           }
                                        } );
   }

   next() {
      let num = 0;
      for ( let elemento of this.processRoles ) {
         if ( elemento.asignadoAlCargo ) {
            num++;
         }
      }
      if ( num > 0 ) {
         this.nextStep.emit( 4 );
         this.msgsAlert = [];
      } else {
         this.msgsAlert[ 0 ] = { severity: 'error', summary: 'Error', detail: 'Debe seleccional al menos un rol' };
      }
   }
}
