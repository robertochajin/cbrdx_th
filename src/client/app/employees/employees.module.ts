import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import {EmployeesComponent}  from './employees.component';
import {EmployeesDetailComponent}  from './employees-detail.component';
import {EmployeesAddComponent}  from './employees-add.component';
import {EmployeesUpdateComponent}  from './employees-update.component';
import {EmployeesService} from './employees.service';
import {NavService}                 from '../_services/_nav.service';
import {
  InputTextModule,
  DataTableModule,
  ButtonModule,
  DialogModule,
  ConfirmDialogModule,
  TabViewModule,
  AccordionModule
} from 'primeng/primeng';

import {FamilyInformationModule} from './../employees-family-information/family-information.module';
import {ReferencesModule} from './../employees-references/references.module';
import {AcademicEducationModule} from './../employees-academic-education/academic-education.module';
import {WorkExperienceModule} from './../employees-work-experience/work-experience.module';
import {LocationModule} from './../employees-location/location.module';

@NgModule({
  imports: [CommonModule,
    InputTextModule,
    FormsModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    TabViewModule,
    FamilyInformationModule,
    ReferencesModule,
    AcademicEducationModule,
    WorkExperienceModule,
    LocationModule,
    AccordionModule
  ],
  declarations: [EmployeesComponent, EmployeesDetailComponent, EmployeesAddComponent, EmployeesUpdateComponent],
  bootstrap: [EmployeesComponent],
  providers: [EmployeesService,NavService],
  exports: [EmployeesComponent]
})
export class EmployeesModule {
}
