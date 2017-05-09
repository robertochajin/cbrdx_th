import 'rxjs/add/operator/switchMap';
import { Positions } from '../_models/positions';
import { PositionsActivities } from '../_models/positionsActivities';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { PositionsService } from '../_services/positions.service';

@Component( {
               moduleId: module.id,
               templateUrl: 'positions-activities.component.html',
               selector: 'position-activities',
               providers: [ ConfirmationService ]
            } )

export class PositionActivitiesComponent implements OnInit {

   @Input() position: Positions;
   positionsActivities: PositionsActivities = new PositionsActivities();
   dialogObjet: PositionsActivities = new PositionsActivities();
   msgs: Message[] = [];
   listActivities: SelectItem[] = [];
   listPositionsActivities: PositionsActivities[] = [];

   constructor( private positionsService: PositionsService,
      private router: Router,
      private route: ActivatedRoute,
      private confirmationService: ConfirmationService, ) {

   }

   ngOnInit() {

      this.positionsActivities.idCargo = this.position.idCargo;
      this.positionsService.getPositionActivitiesById( this.positionsActivities.idCargo ).subscribe(
         rest => {
            for ( let r of rest ) {
               this.positionsService.getActivitiesById( r.idOcupacion ).subscribe( res => {
                  r.ocupacion = res.ocupacion;
               } );
               if ( r.indicadorHabilitado === true ) {
                  this.listPositionsActivities.push( r );
               }
            }
         } );

      this.positionsService.getListActivities().subscribe( rest => {
         this.listActivities.push( { label: 'Seleccione...', value: null } );
         for ( let dp of rest ) {
            let bandera = false;
            for ( let r of this.listPositionsActivities ) {
               if ( dp.idOcupacion === r.idOcupacion ) {
                  bandera = true;
                  break;
               }
            }
            if ( !bandera ) {
               this.listActivities.push( { label: dp.ocupacion, value: dp.idOcupacion } );
            }
         }
      } );

   }

   onSubmit() {
      this.msgs = [];
      this.positionsService.addPositionsActivities( this.positionsActivities )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         this.positionsService.getActivitiesById( data.idOcupacion ).subscribe( res => {
            data.ocupacion = res.ocupacion;
         } );
         this.listPositionsActivities.push( data );
         this.listActivities = [];
         this.positionsService.getListActivities().subscribe( rest => {
            this.listActivities.push( { label: 'Seleccione...', value: null } );
            for ( let dp of rest ) {
               let bandera = false;
               for ( let r of this.listPositionsActivities ) {
                  if ( dp.idOcupacion === r.idOcupacion ) {
                     bandera = true;
                     break;
                  }
               }
               if ( !bandera ) {
                  this.listActivities.push( { label: dp.ocupacion, value: dp.idOcupacion } );
               }
            }
         } );
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }

   del( a: PositionsActivities ) {
      this.dialogObjet = a;
      this.confirmationService.confirm( {
                                           message: `¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.positionsService.updatePositionsActivities( this.dialogObjet ).subscribe( r => {
                                                 this.listPositionsActivities.splice(
                                                    this.listPositionsActivities.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                                 this.listActivities = [];
                                                 this.positionsService.getListActivities().subscribe( rest => {
                                                    this.listActivities.push( { label: 'Seleccione...', value: null } );
                                                    for ( let dp of rest ) {
                                                       let bandera = false;
                                                       for ( let r of this.listPositionsActivities ) {
                                                          if ( dp.idOcupacion === r.idOcupacion ) {
                                                             bandera = true;
                                                             break;
                                                          }
                                                       }
                                                       if ( !bandera ) {
                                                          this.listActivities.push( { label: dp.ocupacion, value: dp.idOcupacion } );
                                                       }
                                                    }
                                                 } );
                                              } );
                                           },
                                           reject: () => {
                                              this.dialogObjet = null;
                                           }
                                        } );
   }

}
