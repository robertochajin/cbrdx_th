import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {SelectItem, ConfirmationService} from 'primeng/primeng';
import {PositionResponsabilitiesService} from "../_services/position-responsabilities.service";
import {ResponsabilitiesServices} from "../_services/responsabilities.service";
import * as moment from 'moment/moment';
import {Responsabilities} from "../_models/responsabilities";
import {PositionResponsabilities} from "../_models/positionResponsabilities";
import {Positions} from "../_models/positions";

@Component({
   moduleId: module.id,
   templateUrl: 'position-responsabilities.component.html',
   selector: 'position-responsabilities',
   providers: [ConfirmationService]
})
export class PositionResponsabilitiesComponent {

   @Input()
   position: Positions;
   responsabilities: SelectItem[] = [];
   tr: PositionResponsabilities = new PositionResponsabilities();
   positionResponsabilities: PositionResponsabilities [] = [];
   
   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   constructor(private router: Router,
               private positionResponsabilitiesService: PositionResponsabilitiesService,
               private responsabilitiesServices: ResponsabilitiesServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {

      this.responsabilitiesServices.getAllEnabledByPosition(this.position.idCargo).subscribe(
         responsabilities => {
            this.responsabilities.unshift({label: 'Seleccione', value: null});
            responsabilities.map((s: Responsabilities) => {
               this.responsabilities.push({label: s.responsabilidad, value: s.idResponsabilidad});
            });
         }
      );

      this.positionResponsabilitiesService.getAllByPosition(this.position.idCargo).subscribe(prs => {
         this.positionResponsabilities = prs;
      });
   }

   save(pr: PositionResponsabilities) {
      console.info(pr);
      pr.indicadorHabilitado = true;
      pr.idCargo = this.position.idCargo;
      this.positionResponsabilitiesService.add(pr).subscribe(res => {
         if (res.idResponsabilidad) {
            this.responsabilities.map((r) => {
               if(pr.idResponsabilidad === r.value){
                  this.responsabilities.splice(this.responsabilities.indexOf(r));
               }
            });
            this.positionResponsabilitiesService.getAllByPosition(this.position.idCargo).subscribe(prs => {
               this.positionResponsabilities = prs;
            });
         }
      });
   }

   del(r: PositionResponsabilities) {
      this.confirmationService.confirm({
         message: ` ¿Esta seguro que desea eliminar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',
         accept: () => {
            r.indicadorHabilitado = false;
            this.positionResponsabilitiesService.update(r).subscribe(res => {
               this.positionResponsabilities.splice(this.positionResponsabilities.indexOf(r), 1);
               this.responsabilities = [];
               this.responsabilitiesServices.getAllEnabledByPosition(this.position.idCargo).subscribe(
                  responsabilities => {
                     this.responsabilities.unshift({label: 'Seleccione', value: null});
                     responsabilities.map((s: Responsabilities) => {
                        this.responsabilities.push({label: s.responsabilidad, value: s.idResponsabilidad});
                     });
                  }
               );
            });
         }, reject: () => {
         }
      });
   }
   
   next(){
      this.nextStep.emit(5);
   }

}
