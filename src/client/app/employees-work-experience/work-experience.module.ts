import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

//import 'rxjs/add/operator/toPromise';

import {WorkExperienceComponent}  from './work-experience.component';
import {WorkExperienceDetailComponent}  from './work-experience-detail.component';
import {WorkExperienceAddComponent}  from './work-experience-add.component';
import {WorkExperienceUpdateComponent}  from './work-experience-update.component';


import {WorkExperienceService} from './work-experience.service';
import {CompanySectorService} from '../_services/company-sector.service';
import {CompanySubSectorService} from '../_services/company-sub-sector.service';
import {CitiesServices} from '../_services/cities.service';
import {
  InputTextModule,
  DataTableModule,
  ButtonModule,
  DialogModule,
  InputTextareaModule,
  CalendarModule,
  DropdownModule,
  ConfirmDialogModule,
  AutoCompleteModule
} from 'primeng/primeng';


@NgModule({
  imports: [CommonModule, InputTextModule, FormsModule, DataTableModule,
    ButtonModule, DialogModule, InputTextareaModule, CalendarModule,
    DropdownModule, ConfirmDialogModule, AutoCompleteModule],
  declarations: [
    WorkExperienceComponent,
    WorkExperienceAddComponent,
    WorkExperienceUpdateComponent,
    WorkExperienceDetailComponent,
  ],
  bootstrap: [WorkExperienceComponent],
  providers: [WorkExperienceService,
    CompanySectorService,
    CompanySubSectorService,
    CitiesServices
  ],
  exports: [WorkExperienceComponent]
})
export class WorkExperienceModule {
}
