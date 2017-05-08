import "rxjs/add/operator/switchMap";
import { Absence } from "../_models/position-absence";
import { Positions } from "../_models/positions";
import { AbsenceService } from "../_services/position-absence.service";
import { Component, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SelectItem, Message, ConfirmationService } from "primeng/primeng";

@Component( {
               moduleId: module.id,
               templateUrl: 'position-authorities.component.html',
               selector: 'position-authorities',
               providers: [ ConfirmationService ]
            } )

export class PositionAuthoritiesComponent {
   
   @Input() position: Positions;
   absence: Absence = new Absence();
   dialogObjet: Absence = new Absence();
   msgs: Message[] = [];
   listPosition: SelectItem[] = [];
   listAbsenceSUP: Absence[] = [];
   
   constructor( private absenceService: AbsenceService,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService, ) {
      
   }
   
   ngOnInit() {
      
      this.absence.idCargo = this.position.idCargo;
      this.absenceService.getSupervisa( this.absence.idCargo ).subscribe(
         rest => {
            for ( let r of rest ) {
               this.absenceService.getPositionById( r.idCargoRelacion ).subscribe( res => {
                  r.cargoRelacion = res.cargo;
               } );
               this.listAbsenceSUP.push( r );
            }
         } );
      
      this.absenceService.getPositionAll().subscribe( rest => {
         this.listPosition.push( { label: 'Seleccione...', value: null } );
         for ( let dp of rest ) {
            let bandera = false;
            for ( let r of this.listAbsenceSUP ) {
               if ( dp.idCargo === r.idCargoRelacion ) {
                  bandera = true;
                  break;
               }
            }
            if ( !bandera ) {
               this.listPosition.push( { label: dp.cargo, value: dp.idCargo } );
            }
         }
      } );
      
   }
   
   onSubmit() {
      this.msgs = [];
      this.absence.idTipoRelacion = 3; //Reemplaza a
      this.absenceService.add( this.absence )
      .subscribe( data => {
         this.msgs.push( { severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.' } );
         this.absenceService.getPositionById( data.idCargoRelacion ).subscribe( res => {
            data.cargoRelacion = res.cargo;
         } );
         this.listAbsenceSUP.push( data );
         this.listPosition = []
         this.absenceService.getPositionAll().subscribe( rest => {
            this.listPosition.push( { label: 'Seleccione...', value: null } );
            for ( let dp of rest ) {
               let bandera = false;
               for ( let r of this.listAbsenceSUP ) {
                  if ( dp.idCargo === r.idCargoRelacion ) {
                     bandera = true;
                     break;
                  }
               }
               if ( !bandera ) {
                  this.listPosition.push( { label: dp.cargo, value: dp.idCargo } );
               }
            }
         } );
      }, error => {
         this.msgs.push( { severity: 'error', summary: 'Error', detail: 'Error al guardar.' } );
      } );
   }
   
   del( a: Absence ) {
      this.dialogObjet = a;
      this.confirmationService.confirm( {
                                           message: `¿Esta seguro que lo desea eliminar?`,
                                           header: 'Corfirmación',
                                           icon: 'fa fa-question-circle',
                                           accept: () => {
                                              this.dialogObjet.indicadorHabilitado = false;
                                              this.absenceService.update( this.dialogObjet ).subscribe( r => {
                                                 this.listAbsenceSUP.splice( this.listAbsenceSUP.indexOf( this.dialogObjet ), 1 );
                                                 this.dialogObjet = null;
                                                 this.listPosition = []
                                                 this.absenceService.getPositionAll().subscribe( rest => {
                                                    this.listPosition.push( { label: 'Seleccione...', value: null } );
                                                    for ( let dp of rest ) {
                                                       let bandera = false;
                                                       for ( let r of this.listAbsenceSUP ) {
                                                          if ( dp.idCargo === r.idCargoRelacion ) {
                                                             bandera = true;
                                                             break;
                                                          }
                                                       }
                                                       if ( !bandera ) {
                                                          this.listPosition.push( {
                                                                                     label: dp.cargo, value: dp.idCargo
                                                                                  } );
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