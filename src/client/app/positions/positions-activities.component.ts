import "rxjs/add/operator/switchMap";
import {Absence} from "../_models/position-absence";
import {Positions} from "../_models/positions";
import {PositionsActivities} from "../_models/positionsActivities";
import {AbsenceService} from "../_services/position-absence.service";
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SelectItem, Message, ConfirmationService} from 'primeng/primeng';
import { PositionsService } from "../_services/positions.service";

@Component({
   moduleId: module.id,
   templateUrl: 'positions-activities.component.html',
   selector: 'position-activities',
   providers: [ConfirmationService]
})

export class PositionActivitiesComponent {

   @Input() position: Positions;
   positionsActivities: PositionsActivities = new PositionsActivities();
   dialogObjet: Absence = new Absence();
   msgs: Message[] = [];
   listActivities: SelectItem[] = [];
   listPositionsActivities: PositionsActivities[] = [];

   constructor(private positionsService: PositionsService,
               private router: Router,
               private route: ActivatedRoute,
               private confirmationService: ConfirmationService,) {

   }

   ngOnInit() {

      this.positionsActivities.idCargo = this.position.idCargo;
      this.positionsService.getPositionActivitiesById(this.positionsActivities.idCargo).subscribe(
         rest => {
            // this.listPositionsActivities= rest;
            for (let r of rest) {
               this.positionsService.getActivitiesById(r.idOcupacion).subscribe(res => {
                  r.ocupacion = res.ocupacion;
               });
               this.listPositionsActivities.push(r);
            }
         });


      this.positionsService.getListActivities().subscribe(rest => {
         this.listActivities.push({label: 'Seleccione...', value: null});
         for (let dp of rest) {
            let bandera = false;
            for (let r of this.listPositionsActivities) {
               if (dp.idOcupacion === r.idOcupacion) {
                  bandera = true;
                  break;
               }
            }
            if (!bandera) {
               this.listActivities.push({label: dp.ocupacion, value: dp.idOcupacion});
            }
         }
      });

   }

   onSubmit() {
      this.msgs = [];
      this.positionsService.addPositionsActivities(this.positionsActivities)
         .subscribe(data => {
            this.msgs.push({severity: 'info', summary: 'Exito', detail: 'Registro guardado correctamente.'});
            this.positionsService.getActivitiesById(data.idOcupacion).subscribe(res => {
               data.ocupacion = res.ocupacion;
            });
            this.listPositionsActivities.push(data);
            this.listActivities = []
            this.positionsService.getListActivities().subscribe(rest => {
               this.listActivities.push({label: 'Seleccione...', value: null});
               for (let dp of rest) {
                  let bandera = false;
                  for (let r of this.listPositionsActivities) {
                     if (dp.idOcupacion === r.idOcupacion) {
                        bandera = true;
                        break;
                     }
                  }
                  if (!bandera) {
                     this.listActivities.push({label: dp.ocupacion, value: dp.idOcupacion});
                  }
               }
            });
         }, error => {
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error al guardar.'});
         });
   }



}