import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {SelectItem, Message, ConfirmationService} from 'primeng/primeng';
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
   styleUrls: ['position-competencies.component.css'],
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
   ponderanciesList: SelectItem[] = [];
   msgs: Message[] = [];

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
      this.ponderanciesServices.getAllEnabled().subscribe(ponderancies => {
         this.ponderanciesList.push({label: "Selccione...", value: null});
         ponderancies.map(p => {
            this.ponderanciesList.push({label: p.ponderacion, value: p.idPonderacion})
         });
      });

      this.positionCompetenciesService.getAllByPosition(this.position.idCargo).subscribe(pcs => {
         this.positionCompetencies = pcs;

         this.groupCompetenciesServices.getAllEnabled().subscribe(groups => {
            this.groups = groups;
            this.groups.map(g => {
               this.competenciesServices.getAllEnabledByGroup(g.idGrupoCompetencia).subscribe(
                  competencies => {
                     g.competencies = competencies;

                     g.competencies.map(c => {
                        let skill = this.positionCompetencies.find((element:PositionCompetencies, index:number, array:PositionCompetencies[]) => {
                           if(element.idCargo == this.position.idCargo && element.idCompetencia == c.idCompetencia){
                              return true;
                           } else {
                              return false;
                           }
                        });

                        if(skill !== undefined) {
                           c.cargoCompetencia = skill;
                        } else {
                           c.cargoCompetencia = new PositionCompetencies();
                        }

                     });
                  }
               );
            });
         });
      });
   }

   update(competencie: Competencies, idGrupo: number){

      //verificar el idPonderación si llega nulo para definir si se debe actualizar o agregar
      let skill = competencie.cargoCompetencia;
      if(skill.idCargoCompetencia !== null && skill.idCargoCompetencia !== undefined) {
         this.positionCompetenciesService.update(skill).subscribe(r => {});
      } else {
         if (skill.idPonderacion !== undefined && skill.idPonderacion !== null) {
            skill.idCompetencia = competencie.idCompetencia;
            skill.idCargo = this.position.idCargo;
            this.positionCompetenciesService.add(skill).subscribe(data => {
               if (data.idCargoCompetencia) {
                  this.groups[idGrupo].competencies.map(c => {
                     if (c.idCompetencia === data.idCompetencia) {
                        c.cargoCompetencia = data;
                     }
                  });
               }
            });
         }
      }
   }

   next(){
      this.msgs = [];
      let complete: boolean = true;
      for (let group of this.groups){
         for(let competencie of group.competencies){
            if(competencie.cargoCompetencia === undefined || competencie.cargoCompetencia.idCargoCompetencia === undefined){
               complete = false;
               break;
            }
         }
         if(!complete){
            break;
         }
      }

      if(complete){
         //emitir evento
         this.nextStep.emit(9);
      } else {
         //lanzar mensaje advirtiendo que un grupo no tiene asignado ningun factor
         this.msgs.push( { severity: 'warning', summary: 'Formulario incompleto', detail: 'Es necesario asignar ponderación a todas las competencias.' } );
      }
   }

}
