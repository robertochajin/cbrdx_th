import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { NavService } from '../_services/_nav.service';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { ListaService } from '../_services/lista.service';
import { QuestionnairesComponent } from './questionnaires.component';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { QuestionnairesAddComponent } from './questionnaires-add.component';
import { QuestionnairesUpdateComponent } from './questionnaires-update.component';
import { SolutionsQuestionnairesComponent } from './solutions-questionnaire/solutions-questionnaires.component';
import { MasterAnswersService } from '../_services/masterAnswers.service';
import { SolutionsQuestionnairesDetailComponent } from './solutions-questionnaire/solutions-questionnaires-detail.component';


@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],

              declarations: [ QuestionnairesComponent, QuestionnairesAddComponent, QuestionnairesUpdateComponent,
                 SolutionsQuestionnairesComponent, SolutionsQuestionnairesDetailComponent
              ],
              bootstrap: [ QuestionnairesComponent ],
              providers: [ QuestionnairesService, NavService, ListaService, MasterAnswersService ],
              exports: [ QuestionnairesComponent, SolutionsQuestionnairesComponent, SolutionsQuestionnairesDetailComponent ]
           } )
export class QuestionnairesModule {
}
