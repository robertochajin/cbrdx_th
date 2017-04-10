import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/primeng';
import * as moment from 'moment/moment';
import {PositionCriterias} from "../_models/positionCriterias";
import {EvaluationCriterias} from "../_models/evaluationCriterias";
import {PositionCriteriasService} from "../_services/position-criterias.service";
import {Positions} from "../_models/positions";

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
  //criteria: PositionCriterias = new PositionCriterias();
  evaluationCriterias: EvaluationCriterias[] = [];
  oneHundred: boolean = false;
  total: number = 0;

  constructor(private router: Router,
              private positionCriteriasService: PositionCriteriasService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
     // provisional
     this.position = new Positions();
     this.position.idCargo = 10;
     // fin provisional
    this.evaluationCriterias.push({
      idCriterio: 1,
      criterio: 1,
      indicadorHabilitado: true,
      auditoriaUsuario: 1,
      auditoriaFecha: "",
      label: "seleccione...",
      value: null
    });
    this.evaluationCriterias.push({
      idCriterio: 1,
      criterio: 1,
      indicadorHabilitado: true,
      auditoriaUsuario: 1,
      auditoriaFecha: "",
      label: "uno",
      value: 1
    });
    this.evaluationCriterias.push({
      idCriterio: 2,
      criterio: 2,
      indicadorHabilitado: true,
      auditoriaUsuario: 2,
      auditoriaFecha: "",
      label: "dos",
      value: 2
    });
    this.evaluationCriterias.push({
      idCriterio: 3,
      criterio: 3,
      indicadorHabilitado: true,
      auditoriaUsuario: 3,
      auditoriaFecha: "",
      label: "tres",
      value: 3
    });

    this.positionCriteriasService.getAllByPosition(this.position.idCargo).subscribe();
  }

  savePositionCriterias() {

     console.log(JSON.stringify(this.positionCriterias));
    this.editing = false;
  }

  sumFactors() {
    this.total = 0;
    for (let p of this.positionCriterias){
      if(p.factor != null){
        this.total = this.total + Number(p.factor);
      }
    }
    if (this.total === 100){
      this.oneHundred = true;
    } else {
      this.oneHundred = false;
    }
  }

  editCriterias() {
    this.sumFactors();
    this.editing = true;
  }

  addCriteria() {
    this.positionCriterias.push(new PositionCriterias());
  }

  removeCriteria(id: any){
    this.positionCriterias.splice(id, 1);
    this.sumFactors();
  }

  goBack(): void {
    this.confirmationService.confirm({
      message: `¿Esta seguro que desea Cancelar?`,
      header: 'Corfirmación',
      icon: 'fa fa-question-circle',

      accept: () => {

      }
    });
  }
}
