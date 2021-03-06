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
import { CallReferenceComponent } from './call-reference.component';
import { VacancyTestServices } from '../_services/vacancyTest.service';
import { PostulationHistoryComponent } from './postulation-history.component';
import { MedicalExamComponent } from './medical-exam.component';
import { MedicalExamService } from '../_services/medical-exam.service';

import { VacancyApplyComponent } from '../selecttion-process-apply/apply-detail.component';
import { ApplyQuestionnairesComponent } from '../selecttion-process-apply/questionnaires.component';
import { QuestionnairesModule } from '../questionnaires/questionnaires.module';
import { SolutionsQuestionnairesDetailComponent } from '../questionnaires/solutions-questionnaire/solutions-questionnaires-detail.component';
import { MasterAnswersService } from '../_services/masterAnswers.service';
import { CandidateContractingComponent } from './candidate-contracting.component';
import { AdjuntosService } from '../_services/adjuntos.service';
@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 QuestionnairesModule
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
                 CallReferenceComponent,
                 MedicalExamComponent,
                 CandidateContractingComponent,
                 PostulationHistoryComponent,
                 SafePipe,
                 VacancyApplyComponent,
                 ApplyQuestionnairesComponent
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
                 MedicalExamService,
                 VacancyTestServices,
                 MasterAnswersService,
                 PublicationQuestionnairesService,
                 UsuariosService,
                 AdjuntosService
              ],
              exports: [ SelectionProcessComponent ]
           } )
export class SelectionProcessModule {
}
