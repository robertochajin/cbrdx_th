import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { PersonnelRequirementComponent } from './personnel-requirement.component';
import { PersonnelRequirementEditComponent } from './personnel-requirement-edit.component';
import { PersonnelRequirementDetailComponent } from './personnel-requirement-detail.component';
import { PersonnelRequirementServices } from '../_services/personnelRequirement.service';
import { PositionsService } from '../_services/positions.service';
import { UsuariosService } from '../_services/usuarios.service';
import { EmployeesService } from '../_services/employees.service';
import { ListaService } from '../_services/lista.service';
import { ListPositionsService } from '../_services/lists-positions.service';
import { ZonesServices } from '../_services/zones.service';
import { ResoursesRequiredServices } from '../_services/resourcesRequiredPurchases.service';
import { ResoursesTicsService } from '../_services/resoursesTics.service';
import { CuestionariosService } from '../_services/cuestionarios.service';
import { RequirementReferralsServices } from '../_services/requirement-referrals.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],

              declarations: [ PersonnelRequirementComponent,PersonnelRequirementDetailComponent,
              PersonnelRequirementEditComponent
              ],
              bootstrap: [ PersonnelRequirementComponent ],
              providers: [ PersonnelRequirementServices,
                 UsuariosService,
                 RequirementReferralsServices,
                 EmployeesService,
                 PositionsService,
                 ListaService,
                 ListPositionsService,
                 ZonesServices,
                 ResoursesRequiredServices,
                 ResoursesTicsService,
                 CuestionariosService
              ],
              exports: [ PersonnelRequirementComponent ]
           } )
export class PersonnelRequirementModule {
}
