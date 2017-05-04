import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {SelectItem, Message, ConfirmationService} from 'primeng/primeng';
import {CompetenciesServices} from "../_services/competencies.service";
import {Competencies} from "../_models/competencies";
import {GroupCompetenciesServices} from "../_services/groupCompetencies.service";
import {GroupCompetencies} from "../_models/groupCompetencies";

@Component({
   moduleId: module.id,
   templateUrl: 'competencies-groups.component.html',
   selector: 'competencies-groups',
   providers: [ConfirmationService]
})
export class CompetenciesGroupsComponent {

   private groups: GroupCompetencies[];
   group: GroupCompetencies = new GroupCompetencies();
   editingGroup: boolean = false;
   editingCompetencie: boolean = false;
   msgs: Message[] = [];
   private competencie: Competencies = new Competencies();


   constructor(private router: Router,
               private competenciesServices: CompetenciesServices,
               private groupCompetenciesServices: GroupCompetenciesServices,
               private confirmationService: ConfirmationService) {
   }

   ngOnInit() {
      this.groupCompetenciesServices.getAllEnabled().subscribe(groups => {
         this.groups = groups;
         this.groups.map(g => {
            this.competenciesServices.getAllByGroup(g.idGrupoCompetencia).subscribe(
               competencies => g.competencies = competencies
            );
         });
      });
   }

   editGroup(group: GroupCompetencies) {
      this.editingGroup = true;
      if (group !== null) {
         this.group = group;
      }
   }

   saveGroup() {
      if (this.group.idGrupoCompetencia !== null && this.group.idGrupoCompetencia !== undefined) {
         this.groupCompetenciesServices.update(this.group).subscribe(res => {
            if(res.ok){
               this.groups[this.groups.indexOf(this.groups.find(z => this.group.idGrupoCompetencia == z.idGrupoCompetencia))] = this.group;
               this.group = new GroupCompetencies();
               this.editingGroup = false;
            }
         });
      } else {
         this.groupCompetenciesServices.add(this.group).subscribe(res => {
            if(res.idGrupoCompetencia){
               this.groups.push(res); // se debe cambiar por lo que retorna el servicio
               this.group = new GroupCompetencies();
               this.editingGroup = false;
            }
         });
      }
   }

   cancelEditingGroup() {
      this.confirmationService.confirm({
         message: `¿Esta seguro que desea Cancelar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',

         accept: () => {
            this.group = new GroupCompetencies();
            this.editingGroup = false;
         }
      });
   }

   editCompetencie(competencie: Competencies, groupId: number) {
      this.editingCompetencie = true;
      if (competencie !== null) {
         this.competencie = Object.assign({},competencie) ;
      } else {
         this.competencie.idGrupoCompetencia = groupId;
         this.competencie.indicadorHabilitado = true;
      }
   }

   cancelEditingCompetencie(){

      this.confirmationService.confirm({
         message: `¿Esta seguro que desea Cancelar?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',

         accept: () => {
            this.competencie = new Competencies();
            this.editingCompetencie = false;
         }
      });

   }

   saveCompetencie(competencie: Competencies){

      if (this.competencie.idCompetencia !== null && this.competencie.idCompetencia !== undefined) {
         this.competenciesServices.update(this.competencie).subscribe(res => {
            if(res.ok){
               this.groups[this.groups.indexOf(this.groups.find(z => this.competencie.idGrupoCompetencia == z.idGrupoCompetencia))]
                  .competencies.map(c => {
                  if(c.idCompetencia == this.competencie.idCompetencia){
                     c = this.competencie;
                  }
               });

               this.competencie = new Competencies();
               this.editingCompetencie = false;
            }
            
         });

      } else {
         this.competenciesServices.add(this.competencie).subscribe(res => {
            if (res.idCompetencia){
               this.groups[this.groups.indexOf(this.groups.find(z => this.competencie.idGrupoCompetencia == z.idGrupoCompetencia))]
                  .competencies.push(res);

               this.competencie = new Competencies();
               this.editingCompetencie = false;
            }
         });
      }
   }

   disableCompetencie(competencie: Competencies){
      this.confirmationService.confirm({
         message: `¿Esta seguro que desea deshabilitar esta competencia?`,
         header: 'Corfirmación',
         icon: 'fa fa-question-circle',
         accept: () => {
            competencie.indicadorHabilitado = false;
            this.competenciesServices.update(competencie).subscribe(res => {
               let group = this.groups.find(z => competencie.idGrupoCompetencia == z.idGrupoCompetencia);
               let groupIndex = this.groups.indexOf(group);
               let competenceIndex = this.groups[groupIndex].competencies.indexOf(competencie);
               this.groups[groupIndex].competencies.splice(competenceIndex,1);
            });
         }
      });
   }
   capitalize() {
      let input = this.group.grupoCompetencia;
      input = input.toLowerCase().replace(/^.|\s\S/g, function(a) {
         return a.toUpperCase();
      });
      this.group.grupoCompetencia = input;
   }
   capitalizec() {
      let input = this.competencie.competencia;
      input = input.toLowerCase().replace(/^.|\s\S/g, function(a) {
         return a.toUpperCase();
      });
      this.competencie.competencia = input;
   }
}
