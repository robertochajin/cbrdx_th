import 'rxjs/add/operator/switchMap';
import { Positions } from '../_models/positions';
import { PositionsActivities } from '../_models/positionsActivities';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { PositionsService } from '../_services/positions.service';
import { NavService } from '../_services/_nav.service';

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
   msg: Message;
   msgs: Message[] = [];
   listActivities: SelectItem[] = [];
   listPositionsActivities: PositionsActivities[] = [];

   constructor( private positionsService: PositionsService,
      private router: Router,
      private navService: NavService,
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

      this.positionsService.getListActivitiesByLevel(4).subscribe( rest => {
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
      if ( this.positionsActivities.idOcupacion ) {
         this.positionsService.addPositionsActivities( this.positionsActivities )
         .subscribe( data => {

            let typeMessage = 1; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
            this.positionsActivities = new PositionsActivities();
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
            let typeMessage = 3; // 1 = Add, 2 = Update, 3 Error, 4 Custom
            this.navService.setMesage( typeMessage, this.msg );
         } );
      }
   }

   del( a: PositionsActivities ) {
      this.dialogObjet = a;
      this.confirmationService.confirm( {
                                           message: `¿Está seguro que desea inactivar este registro?`,
                                           header: 'Confirmación',
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
