import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { SelectionProcessComponent } from './selection-process.component';
import { SelectionProcessAddComponent } from './selection-process-add.component';
import { PublicationDetailComponent } from './selection-process-detail.component';
import { PublicationsService } from '../_services/publications.service';
import { VacanciesService } from '../_services/vacancies.service';
import { PublicationQuestionnairesService } from '../_services/publication-questionnaires.service';
import { QuestionnairesService } from '../_services/questionnaires.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [
                 SelectionProcessComponent,SelectionProcessAddComponent,PublicationDetailComponent
              ],
              bootstrap: [ SelectionProcessComponent ],
              providers: [
                 PublicationsService,
                 VacanciesService,
                 QuestionnairesService,
                 PublicationQuestionnairesService
              ],
              exports: [ SelectionProcessComponent ]
           } )
export class SelectionProcessModule {
}
