import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { EmployeesComponent } from './employees.component';
import { EmployeesDetailComponent } from './employees-detail.component';
import { EmployeesAddComponent } from './employees-add.component';
import { EmployeesUpdateComponent } from './employees-update.component';
import { EmployeesAdditionalDataComponent } from './employees-additional-data.component';
import { EmployeesService } from '../_services/employees.service';
import { ListEmployeesService } from '../_services/lists-employees.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { NavService } from '../_services/_nav.service';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { FamilyInformationModule } from './../employees-family-information/family-information.module';
import { ReferencesModule } from './../employees-references/references.module';
import { AcademicEducationModule } from './../employees-academic-education/academic-education.module';
import { WorkExperienceModule } from './../employees-work-experience/work-experience.module';
import { LocationModule } from '../employees-location/employee-location.module';
import { ClinicalInformationModule } from '../employees-clinical-information/clinical-information.module';
import { EmployeesContactModule } from '../employees-contact/employees-contact.module';
import { EmployeesEstateModule } from '../employees-estate/employee-estate.module';
import { EmployeesVehicleModule } from '../employees-vehicle/employee-vehicles.module';
import { ListaService } from '../_services/lista.service';
import { EmployeesViewDetailComponent } from './employees-view-detail.component';
import { EmployeesCurriculumVitaeComponent } from './employees-curriculum-vitae.component';
import { AdjuntosService } from '../_services/adjuntos.service';
import { ConstanteService } from '../_services/constante.service';
import { EmployeesAttachmentsModule } from '../employees-attatchments/employees-attachments.module';
import { EmployeesAttachmentsComponent } from '../employees-attatchments/employees-attachments.component';
import { EmployeesRecruitmentComponent } from '../employees-recruitment/employees-recruitment.component';
import { EmployeesRecruitmentService } from '../_services/employees-recruitment.service';
import { EmployeesDetailPerfilComponent } from '../selecttion-process-apply/employees-detail-perfil.component';

@NgModule( {
              imports: [
                 FamilyInformationModule,
                 ReferencesModule,
                 AcademicEducationModule,
                 WorkExperienceModule,
                 LocationModule,
                 ClinicalInformationModule,
                 SharedModule,
                 FormSharedModule,
                 EmployeesContactModule,
                 EmployeesEstateModule,
                 EmployeesVehicleModule,
                 EmployeesAttachmentsModule
              ],

              declarations: [ EmployeesComponent, EmployeesDetailComponent, EmployeesAddComponent, EmployeesUpdateComponent,
                 EmployeesAdditionalDataComponent, EmployeesViewDetailComponent, EmployeesCurriculumVitaeComponent,
                 EmployeesRecruitmentComponent,
                 EmployeesDetailPerfilComponent
              ],
              bootstrap: [ EmployeesComponent ],
              providers: [ EmployeesService, ListEmployeesService, PoliticalDivisionService, NavService, ListaService, AdjuntosService, ConstanteService ],
              exports: [ EmployeesComponent ]
           } )
export class EmployeesModule {
}
