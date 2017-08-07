import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { PositionsComponent } from './positions.component';
import { PositionsUpdateComponent } from './positions-update.component';
import { PositionsAddComponent } from './positions-add.component';
import { PositionsObservationsListComponent } from './positions-observations-list.component';
import { PositionAuthoritiesComponent } from './position-authorities.component';
import { PositionActivitiesComponent } from './positions-activities.component';
import { PositionsService } from '../_services/positions.service';
import { ListPositionsService } from '../_services/lists-positions.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { NavService } from '../_services/_nav.service';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { EvaluationCriteriasModule } from '../position-evaluation-criterias/evaluation-criterias.module';
import { PositionRolesModule } from '../position-roles/position-roles.module';
import { PositionResponsabilitiesModule } from '../position-responsabilities/position-responsabilities.module';
import { ProductivityModule } from '../position-productivity/productivity.module';
import { RiskModule } from '../position-risks/position-risks.module';
import { AbsenceModule } from '../position-absence/position-absence.module';
import { PositionCompetenciesModule } from '../position-competencies/position-competencies.module';
import { CompanyAssetsModule } from '../position-company-assets/company-assets.module';
import { PersonalityModule } from '../position-personality/personality.module';
import { PositionsDetailComponent } from './positions-detail.component';
import { PositionsDetailPdfComponent } from './positions-detail-pdf.component';
import { AssessmentListComponent } from '../position_assessment/assessment-list.component';
import { ListaService } from '../_services/lista.service';
import { TipoDeAreaService } from '../_services/tipoDeArea.service';
import { PositionAssessmentComponent } from '../position_assessment/position-assessment.component';
import { RiskService } from '../_services/positios-risks.service';
import { AssessmentVersionServices } from '../_services/assessmentVersion.services';
import { AssessmentVersionComponent } from '../position_assessment/assessment-version.component';
import { AdjuntosService } from '../_services/adjuntos.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 EvaluationCriteriasModule,
                 PositionRolesModule,
                 PositionResponsabilitiesModule,
                 RiskModule,
                 ProductivityModule,
                 AbsenceModule,
                 PositionCompetenciesModule,
                 CompanyAssetsModule,
                 PersonalityModule
              ],

              declarations: [
                 PositionsComponent,
                 PositionsUpdateComponent,
                 PositionsAddComponent,
                 PositionsObservationsListComponent,
                 PositionAuthoritiesComponent,
                 PositionActivitiesComponent,
                 AssessmentListComponent,
                 PositionAssessmentComponent,
                 AssessmentVersionComponent,
                 PositionsDetailPdfComponent
              ],
              bootstrap: [ PositionsComponent ],
              providers: [ PositionsService, ListPositionsService, PoliticalDivisionService, NavService,
                 ListaService,
                 RiskService,
                 AssessmentVersionServices,
                 AdjuntosService,
                 TipoDeAreaService
              ],
              exports: [ PositionsComponent ]
           } )
export class PositionsModule {
}
