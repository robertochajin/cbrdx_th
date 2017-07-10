import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { SelectionProcessComponent } from './selection-process.component';
import { SelectionProcessAddComponent } from './selection-process-add.component';
import { PublicationsService } from '../_services/publications.service';
import { VacanciesService } from '../_services/vacancies.service';
import { PublicationQuestionnairesService } from '../_services/publication-questionnaires.service';
import { QuestionnairesService } from '../_services/questionnaires.service';
import { VacancyDetailComponent } from './vacancy-detail.component';
import { SelectionProcessVacanciesComponent } from './selection-process-vacancies.component';
import { ConstanteService } from '../_services/constante.service';
import { SelectionStepService } from '../_services/selection-step.service';
import { StepListComponent } from './step-list.component';
import { StepEditComponent } from './step-edit.component';
import { StepDetailComponent } from './step-detail.component';
import { StepProcessComponent } from './step-process.component';
import { EmployeesService } from '../_services/employees.service';
import { CandidateProcessService } from '../_services/candidate-process.service';
import { CandidatesComponent } from './candidates.component';
import { UsuariosService } from '../_services/usuarios.service';
import { CandidateRevisionComponent } from './candidate-revision.component';
import { CentralRiskComponent } from '../selection-process-risks/central-risk.component';
import { SafePipe } from '../_helpers/safePipe';
import { AttachmentsService } from '../_services/attachments-step.service';
import { AttachmentsComponent } from './attachments.component';
import { CandidateTestComponent } from './candidate-test.component';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [
                 SelectionProcessComponent,
                 SelectionProcessAddComponent,
                 VacancyDetailComponent,
                 StepListComponent,
                 StepEditComponent,
                 StepDetailComponent,
                 StepProcessComponent,
                 AttachmentsComponent,
                 SelectionProcessVacanciesComponent,
                 CandidatesComponent,
                 CandidateRevisionComponent,
                 CandidateTestComponent,
                 CentralRiskComponent,
                 SafePipe
              ],
              bootstrap: [ SelectionProcessComponent ],
              providers: [
                 PublicationsService,
                 VacanciesService,
                 ConstanteService,
                 QuestionnairesService,
                 EmployeesService,
                 CandidateProcessService,
                 SelectionStepService,
                 AttachmentsService,
                 PublicationQuestionnairesService,
                 UsuariosService
              ],
              exports: [ SelectionProcessComponent ]
           } )
export class SelectionProcessModule {
}
