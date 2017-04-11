import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {SelectItem, ConfirmationService} from 'primeng/primeng';
import {CompetenciesServices} from "../_services/competencies.service";
import * as moment from 'moment/moment';
import {Competencies} from "../_models/competencies";
import {PositionCompetencies} from "../_models/positionCompetencies";
import {Positions} from "../_models/positions";
import {PositionCompetenciesServices} from "../_services/position-competencies.services";
import {PonderanciesServices} from "../_services/ponderancies.service";
import {GroupCompetenciesServices} from "../_services/groupCompetencies.service";
import {GroupCompetencies} from "../_models/groupCompetencies";
import {Ponderancies} from "../_models/ponderancies";

@Component({
   moduleId: module.id,
   templateUrl: 'position-competencies.component.html',
   selector: 'position-competencies',
   providers: [ConfirmationService]
})
export class PositionCompetenciesComponent {

   @Input()
   position: Positions;
   competencies: SelectItem[] = [];
   tr: PositionCompetencies = new PositionCompetencies();
   positionCompetencies: PositionCompetencies [] = [];
   private groups: GroupCompetencies[];
   private ponderancies: Ponderancies[];
   
   @Output()
   nextStep: EventEmitter<number> = new EventEmitter<number>();
   
   constructor(private router: Router,
               private positionCompetenciesService: PositionCompetenciesServices,
               private competenciesServices: CompetenciesServices,
               private ponderanciesServices: PonderanciesServices,
               private groupCompetenciesServices: GroupCompetenciesServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      // provisional
      this.position = new Positions();
      this.position.idCargo = 10;
      // fin provisional

      this.ponderanciesServices.getAllEnabled().subscribe(ponderancies => {
         this.ponderancies = ponderancies;
         this.groupCompetenciesServices.getAllEnabled().subscribe(groups => {
            this.groups = groups;
            this.groups.map(g => {
               this.competenciesServices.getAllEnabledByGroup(g.idGrupoCompetencia).subscribe(
                  competencies => {
                     g.competencies = competencies;
                     g.competencies.map(c => {
                        c.ponderaciones = this.ponderancies;
                     });
                  }
               );
            });
         });
      });
   }
   
   next(){
      this.nextStep.emit(10);
   }

}
