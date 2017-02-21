/**
 * Created by Angel on 15/02/2017.
 */
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import 'rxjs/add/operator/toPromise';

import { WorkExperienceComponent }  from './work-experience.component';
import { WorkExperienceDetailComponent }  from './work-experience-detail.component';
import { WorkExperienceAddComponent }  from './work-experience-add.component';
import { WorkExperienceUpdateComponent }  from './work-experience-update.component';


import { WorkExperienceService } from './work-experience.service';
import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule,ConfirmDialogModule } from 'primeng/primeng';


@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,
                    ButtonModule,DialogModule,InputTextareaModule,CalendarModule,
                DropdownModule,ConfirmDialogModule],
    declarations: [
                    WorkExperienceComponent,
                    WorkExperienceAddComponent,
                    WorkExperienceUpdateComponent,
                    WorkExperienceDetailComponent
                    ],
    bootstrap:    [WorkExperienceComponent],
    providers:    [WorkExperienceService],
    exports: 	  [WorkExperienceComponent]
})
export class WorkExperienceModule { }
