import 'rxjs/add/operator/toPromise';
import {NgModule}      from '@angular/core';
import {EmployeesComponent}  from './employees.component';
import {EmployeesDetailComponent}  from './employees-detail.component';
import {EmployeesAddComponent}  from './employees-add.component';
import {EmployeesUpdateComponent}  from './employees-update.component';
import {EmployeesAdditionalDataComponent} from "./employees-additional-data.component";


import {EmployeesService} from '../_services/employees.service';
import { ListEmployeesService }   from '../_services/lists-employees.service';
import { PoliticalDivisionService } from "../_services/political-division.service";

import {NavService}                 from '../_services/_nav.service';

import {FormSharedModule } from '../shared/form-shared.module';

import {FamilyInformationModule} from './../employees-family-information/family-information.module';
import {ReferencesModule} from './../employees-references/references.module';
import {AcademicEducationModule} from './../employees-academic-education/academic-education.module';
import {WorkExperienceModule} from './../employees-work-experience/work-experience.module';
import {LocationModule} from '../employees-location/employee-location.module';
import {ClinicalInformationModule} from "../employees-clinical-information/clinical-information.module";
import {EmployeesContactModule} from "../employees-contact/employees-contact.module";
import {EmployeesEstateModule} from "../employees-estate/employee-estate.module";


@NgModule({
  imports: [
    FamilyInformationModule,
    ReferencesModule,
    AcademicEducationModule,
    WorkExperienceModule,
    LocationModule,
    ClinicalInformationModule,
    FormSharedModule,
    EmployeesContactModule,
    EmployeesEstateModule
  ],
  
  declarations: [EmployeesComponent, EmployeesDetailComponent, EmployeesAddComponent, EmployeesUpdateComponent,EmployeesAdditionalDataComponent],
  bootstrap: [EmployeesComponent],
  providers: [EmployeesService,ListEmployeesService, PoliticalDivisionService, NavService],
  exports: [EmployeesComponent]
})
export class EmployeesModule {
}
