import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';
import * as moment from 'moment/moment';
import {PositionCriterias} from "../_models/positionCriterias";
import {EvaluationCriterias} from "../_models/evaluationCriterias";
import {PositionCriteriasService} from "../_services/position-criterias.service";
import {Positions} from "../_models/positions";
import {EvaluationCriteriasServices} from "../_services/evaluation-criterias.service";

@Component({
   moduleId: module.id,
   templateUrl: 'evaluation-criterias.component.html',
   selector: 'evaluation-criterias',
   providers: [ConfirmationService]
})
export class EvaluationCriteriasComponent {

   @Input()
   position: Positions;
   editing: boolean = false;
   positionCriterias: PositionCriterias[] = [];
   backUpPositionCriterias: PositionCriterias[] = [];
   //criteria: PositionCriterias = new PositionCriterias();
   evaluationCriterias: EvaluationCriterias[] = [];
   oneHundred: boolean = false;
   criteriaRepeated: boolean = false;
   total: number = 0;

   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();

   constructor(private router: Router,
               private positionCriteriasService: PositionCriteriasService,
               private evaluationCriteriasServices: EvaluationCriteriasServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {

      this.evaluationCriteriasServices.getAllEnabled().subscribe(criterias => {
         this.evaluationCriterias.push({
            idCriterio: null,
            criterio: null,
            indicadorHabilitado: false,
            auditoriaUsuario: 1,
            auditoriaFecha: "",
            label: "seleccione...",
            value: null
         });

         criterias.map(c => this.evaluationCriterias.push(c));
         this.positionCriteriasService.getAllByPosition(this.position.idCargo)
            .subscribe(positionCriterias => {
               this.positionCriterias = positionCriterias;
               this.positionCriterias.map(p => {
                  p.idCargo = this.position.idCargo;
                  p.criterio = this.evaluationCriterias.find(e => e.idCriterio == p.idCriterio).criterio;
               });
            });

         this.evaluationCriterias.map(e => {
            e.label = e.criterio;
            e.value = e.idCriterio;
         });
      });

   }

   savePositionCriterias() {
      this.positionCriteriasService.addInBulk(this.positionCriterias).subscribe(data => {
         this.positionCriterias.map(pc => {
            pc.criterio = this.evaluationCriterias.find(e => e.idCriterio == pc.idCriterio).criterio;
         })
      });

      this.editing = false;
   }

   checkRepeated() {
      let pctemp = this.positionCriterias;
      let cont: number;
      for (let pc1 of this.positionCriterias) {
         cont = 0;
         for (let pc2 of pctemp) {
            if (pc1.idCriterio !== null && pc2.idCriterio === pc1.idCriterio) {
               cont = cont + 1;
            }
            if (cont > 1) return
         }
         if (cont > 1) return
      }

      if (cont > 1) {
         //lanza un mensaje advirtiendo que no se puede guardar dos criterios iguales
         this.criteriaRepeated = true;
      } else {
         this.criteriaRepeated = false;
      }
   }

   sumFactors() {
      this.total = 0;
      for (let p of this.positionCriterias) {
         if (p.factor != null) {
            this.total = this.total + Number(p.factor);
         }
      }
      if (this.total === 100) {
         this.oneHundred = true;
      } else {
         this.oneHundred = false;
      }
   }

   assignCriteria(criteria: PositionCriterias) {
      this.positionCriterias[this.positionCriterias.indexOf(criteria)].criterio = this.evaluationCriterias.find(e => e.idCriterio == criteria.idCriterio).criterio;
   }

   editCriterias() {
      this.backUpPositionCriterias = this.positionCriterias;
      if (this.positionCriterias.length == 0) {
         let nc = new PositionCriterias();
         nc.indicadorHabilitado = true;
         nc.idCargo = this.position.idCargo;
         this.positionCriterias.push(nc);
      }
      this.sumFactors();
      this.editing = true;
   }

   addCriteria() {
      let nc = new PositionCriterias();
      nc.indicadorHabilitado = true;
      nc.idCargo = this.position.idCargo;
      this.positionCriterias.push(nc);
   }

   removeCriteria(id: any) {
      this.positionCriterias.splice(id, 1);
      this.sumFactors();
   }

   goBack(): void {
      this.confirmationService.confirm({
         message: `¿Esta seguro que desea Cancelar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',

         accept: () => {
            this.editing = false;
            this.positionCriterias = this.backUpPositionCriterias;
         }
      });
   }

   next() {
      this.nextStep.emit(1);
   }
}
