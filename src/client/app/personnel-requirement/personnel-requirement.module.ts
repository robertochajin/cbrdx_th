import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { PersonnelRequirementComponent } from './personnel-requirement.component';
import { PersonnelRequirementEditComponent } from './personnel-requirement-edit.component';
import { PersonnelRequirementDetailComponent } from './personnel-requirement-detail.component';
import { PersonnelRequirementHistoricalComponent } from './personnel-requirement-historical.component';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { PositionsService } from '../_services/positions.service';
import { UsuariosService } from '../_services/usuarios.service';
import { EmployeesService } from '../_services/employees.service';
import { ListaService } from '../_services/lista.service';
import { ListPositionsService } from '../_services/lists-positions.service';
import { ZonesServices } from '../_services/zones.service';
import { ResoursesRequiredServices } from '../_services/resourcesRequiredPurchases.service';
import { ResoursesTicsService } from '../_services/resoursesTics.service';
import { RequirementQuestionnairesService } from '../_services/requirement-questionnaires.service';
import { RequirementReferralsServices } from '../_services/requirement-referrals.service';
import { ConstanteService } from '../_services/constante.service';
import { VacanciesService } from '../_services/vacancies.service';
import { OrganizationalStructurePositionsServices } from '../_services/organizationalStructurePositions.service';
import { PositionsDetailComponent } from '../positions/positions-detail.component';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],

              declarations: [ PersonnelRequirementComponent,PersonnelRequirementDetailComponent,
              PersonnelRequirementEditComponent,PersonnelRequirementHistoricalComponent,PositionsDetailComponent
              ],
              bootstrap: [ PersonnelRequirementComponent ],
              providers: [ PersonnelRequirementServices,
                 UsuariosService,
                 VacanciesService,
                 ConstanteService,
                 RequirementReferralsServices,
                 OrganizationalStructurePositionsServices,
                 EmployeesService,
                 PositionsService,
                 ListaService,
                 ListPositionsService,
                 ZonesServices,
                 ResoursesRequiredServices,
                 ResoursesTicsService,
                 RequirementQuestionnairesService
              ],
              exports: [ PersonnelRequirementComponent ]
           } )
export class PersonnelRequirementModule {
}
