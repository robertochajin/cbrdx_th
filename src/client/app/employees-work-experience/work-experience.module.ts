import {NgModule}      from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

//import 'rxjs/add/operator/toPromise';

import {WorkExperienceComponent}  from './work-experience.component';
import {WorkExperienceDetailComponent}  from './work-experience-detail.component';
import {WorkExperienceAddComponent}  from './work-experience-add.component';
import {WorkExperienceUpdateComponent}  from './work-experience-update.component';
import {FormSharedModule } from '../shared/form-shared.module';

import {WorkExperienceService} from '../_services/work-experience.service';



@NgModule({
  imports: [
    FormSharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    WorkExperienceComponent,
    WorkExperienceAddComponent,
    WorkExperienceUpdateComponent,
    WorkExperienceDetailComponent,
  ],
  bootstrap: [WorkExperienceComponent],
  providers: [WorkExperienceService],
  exports: [WorkExperienceComponent]
})
export class WorkExperienceModule {
}
