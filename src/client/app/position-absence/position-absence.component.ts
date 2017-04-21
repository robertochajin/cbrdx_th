import "rxjs/add/operator/switchMap";
import {Absence} from "../_models/position-absence";
import {Positions} from "../_models/positions";
import {AbsenceService} from "../_services/position-absence.service";
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SelectItem, Message, ConfirmationService} from 'primeng/primeng';

@Component({
   moduleId: module.id,
   templateUrl: 'position-absence.component.html',
   selector: 'position-absence',
   providers: [ConfirmationService]
})

export class AbsenceComponent {

   @Input()
   position: Positions;
   
   absence: Absence = new Absence();
   dialogObjet: Absence = new Absence();
   msgs: Message[] = [];
   listPositionREE: SelectItem[] = [];
   listPositionREP: SelectItem[] = [];
   listAbsenceREE: Absence[] = [];
   listAbsenceREP: Absence[] = [];
   idCargoRelacionREE: number;
   idCargoRelacionREP: number;
   guardandoA:boolean = false;
   guardandoP:boolean = false;
   msgsAlert: Message[] = [];
   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   constructor(private absenceService: AbsenceService,
               private router: Router,
               private route: ActivatedRoute,
               private confirmationService: ConfirmationService,) {

   }

   ngOnInit() {

      this.absence.idCargo = this.position.idCargo;
      this.absenceService.getReemplazaA(this.absence.idCargo).subscribe(
         rest => {
            for (let r of rest) {
               this.absenceService.getPositionById(r.idCargoRelacion).subscribe(res => {
                  r.cargoRelacion = res.cargo;
               });
               this.listAbsenceREE.push(r);
            }
         });
      this.absenceService.getReemplazado(this.absence.idCargo).subscribe(
         rest => {
            for (let r of rest) {
               this.absenceService.getPositionById(r.idCargoRelacion).subscribe(res => {
                  r.cargoRelacion = res.cargo;
               });
               this.listAbsenceREP.push(r);
            }
         });
      this.absenceService.getPositionAll().subscribe(rest => {
         this.listPositionREE.push({label: 'Seleccione...', value: null});
         for (let dp of rest) {
            let bandera = false;
            for (let r of this.listAbsenceREE) {
               if (dp.idCargo === r.idCargoRelacion) {
                  bandera = true;
                  break;
               }
            }
            if (!bandera) {
               this.listPositionREE.push({label: dp.cargo, value: dp.idCargo});
            }
         }
      });
      this.absenceService.getPositionAll().subscribe(rest => {
         this.listPositionREP.push({label: 'Seleccione...', value: null});
         for (let dp of rest) {
            let bandera = false;
            for (let r of this.listAbsenceREP) {
               if (dp.idCargo === r.idCargoRelacion) {
                  bandera = true;
                  break;
               }
            }
            if (!bandera) {
               this.listPositionREP.push({label: dp.cargo, value: dp.idCargo});
            }
         }
      });

   }

   onSubmitREE() {
      this.msgs = [];
      this.absence.idTipoRelacion = 2; //Reemplaza a
      this.absence.idCargoRelacion = this.idCargoRelacionREE;
      this.guardandoA = true;
      this.absenceService.add(this.absence)
         .subscribe(data => {
            this.guardandoA = false;
            this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
            this.absenceService.getPositionById(data.idCargoRelacion).subscribe(res => {
               data.cargoRelacion = res.cargo;
            });
            this.idCargoRelacionREE = null;
            this.listAbsenceREE.push(data);
            this.listPositionREE = []
            this.absenceService.getPositionAll().subscribe(rest => {
               this.listPositionREE.push({label: 'Seleccione...', value: null});
               for (let dp of rest) {
                  let bandera = false;
                  for (let r of this.listAbsenceREE) {
                     if (dp.idCargo === r.idCargoRelacion) {
                        bandera = true;
                        break;
                     }
                  }
                  if (!bandera) {
                     this.listPositionREE.push({label: dp.cargo, value: dp.idCargo});
                  }
               }
            });
         }, error => {
            this.guardandoA = false;
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
         });
   }

   onSubmitREP() {
      this.msgs = [];
      this.guardandoP = true;
      this.absence.idTipoRelacion = 4;//Reemplazado por
      this.absence.idCargoRelacion = this.idCargoRelacionREP;
      this.absenceService.add(this.absence)
         .subscribe(data => {
            this.guardandoP = false;
            this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
            this.absenceService.getPositionById(data.idCargoRelacion).subscribe(res => {
               data.cargoRelacion = res.cargo;
               this.listPositionREP.splice(this.listPositionREP.indexOf(res), 1)
            });
            this.idCargoRelacionREP = null;
            this.listAbsenceREP.push(data);
            this.listPositionREP = [];
            this.absenceService.getPositionAll().subscribe(rest => {
               this.listPositionREP.push({label: 'Seleccione...', value: null});
               for (let dp of rest) {
                  let bandera = false;
                  for (let r of this.listAbsenceREP) {
                     if (dp.idCargo === r.idCargoRelacion) {
                        bandera = true;
                        break;
                     }
                  }
                  if (!bandera) {
                     this.listPositionREP.push({label: dp.cargo, value: dp.idCargo});
                  }
               }
            });
         }, error => {
            this.guardandoP = false;
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
         });
   }

   delREE(a: Absence) {
      this.dialogObjet = a;
      this.confirmationService.confirm({
         message: `¿Esta seguro que lo desea eliminar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',
         accept: () => {
            this.guardandoA = true;
            this.dialogObjet.indicadorHabilitado = false;
            this.absenceService.update(this.dialogObjet).subscribe(r => {
               this.guardandoA = false;
               this.listAbsenceREE.splice(this.listAbsenceREE.indexOf(this.dialogObjet), 1);
               this.dialogObjet = null;
               this.listPositionREE = []
               this.absenceService.getPositionAll().subscribe(rest => {
                  this.listPositionREE.push({label: 'Seleccione...', value: null});
                  for (let dp of rest) {
                     let bandera = false;
                     for (let r of this.listAbsenceREE) {
                        if (dp.idCargo === r.idCargoRelacion) {
                           bandera = true;
                           break;
                        }
                     }
                     if (!bandera) {
                        this.listPositionREE.push({label: dp.cargo, value: dp.idCargo});
                     }
                  }
               });
            });
         },
         reject: () => {
            this.dialogObjet = null;
         }
      });
   }

   delREP(a: Absence) {
      this.dialogObjet = a;
      this.confirmationService.confirm({
         message: `¿Esta seguro que lo desea eliminar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',
         accept: () => {
            this.guardandoP = true;
            this.dialogObjet.indicadorHabilitado = false;
            this.absenceService.update(this.dialogObjet).subscribe(r => {
               this.guardandoP = false;
               this.listAbsenceREP.splice(this.listAbsenceREP.indexOf(this.dialogObjet), 1);
               this.dialogObjet = null;
               this.listPositionREP = []
               this.absenceService.getPositionAll().subscribe(rest => {
                  this.listPositionREP.push({label: 'Seleccione...', value: null});
                  for (let dp of rest) {
                     let bandera = false;
                     for (let r of this.listAbsenceREP) {
                        if (dp.idCargo === r.idCargoRelacion) {
                           bandera = true;
                           break;
                        }
                     }
                     if (!bandera) {
                        this.listPositionREP.push({label: dp.cargo, value: dp.idCargo});
                     }
                  }
               });
            });
         },
         reject: () => {
            this.dialogObjet = null;
         }
      });
   }
   
   next(){
      if(this.listAbsenceREP.length > 0 &&   this.listAbsenceREE.length > 0){
         this.nextStep.emit(7);
         this.msgsAlert = [];
      }else{
         this.msgsAlert[0] = {severity: 'alert', summary: 'Error', detail: 'Debe llenar al menos una opción en cada' +
         ' posición'};
      }
   }
}