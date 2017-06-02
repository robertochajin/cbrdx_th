import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { SelectionProcessComponent } from './selection-process.component';
import { SelectionProcessAddComponent } from './selection-process-add.component';
import { PublicationsService } from '../_services/publications.service';
import { RolWidgetsServices } from '../_services/rolWidgets.service';
import { VacanciesService } from '../_services/vacancies.service';
import { PublicationQuestionnairesService } from '../_services/publication-questionnaires.service';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { VacancyDetailComponent } from './vacancy-detail.component';
import { SelectionProcessVacanciesComponent } from './selection-process-vacancies.component';
import { ConstanteService } from '../_services/constante.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [
                 SelectionProcessComponent,
                 SelectionProcessAddComponent,
                 VacancyDetailComponent,
                 SelectionProcessVacanciesComponent
              ],
              bootstrap: [ SelectionProcessComponent ],
              providers: [
                 PublicationsService,
                 VacanciesService,
                 ConstanteService,
                 QuestionnairesService,
                 PublicationQuestionnairesService
              ],
              exports: [ SelectionProcessComponent ]
           } )
export class SelectionProcessModule {
}
