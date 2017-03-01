import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { FormalStudiesComponent }  from './formal-studies.component';
import { FormalStudiesDetailComponent }  from './formal-studies-detail.component';
import { FormalStudiesAddComponent }  from './formal-studies-add.component';
import { FormalStudiesUpdateComponent }  from './formal-studies-update.component';

import { NoFormalStudiesComponent }  from './no-formal-studies.component';
import { NoFormalStudiesDetailComponent }  from './no-formal-studies-detail.component';
import { NoFormalStudiesAddComponent }  from './no-formal-studies-add.component';
import { NoFormalStudiesUpdateComponent }  from './no-formal-studies-update.component';

import { AcademicEducationService } from './academic-education.service';
import { CitiesServices } from '../_services/cities.service';
import { InstituteServices } from '../_services/institute.service';
import { StudyLevelServices } from '../_services/study-level.service';
import { StudyAreaServices } from '../_services/study-area.service';
import { StudyStateServices } from '../_services/study-state.service';

import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule,
        ConfirmDialogModule,AutoCompleteModule,CheckboxModule,MessagesModule } from 'primeng/primeng';


@NgModule({
    imports:      [ CommonModule,InputTextModule,FormsModule,ReactiveFormsModule,DataTableModule,
                    ButtonModule,DialogModule,InputTextareaModule,CalendarModule,
                    DropdownModule,ConfirmDialogModule,AutoCompleteModule,CheckboxModule, MessagesModule
                    ],
    declarations: [
                    FormalStudiesComponent,
                    FormalStudiesAddComponent,
                    FormalStudiesUpdateComponent,
                    FormalStudiesDetailComponent,
                    NoFormalStudiesComponent,
                    NoFormalStudiesAddComponent,
                    NoFormalStudiesUpdateComponent,
                    NoFormalStudiesDetailComponent
                    ],
    bootstrap:    [FormalStudiesComponent],
    providers:    [AcademicEducationService, CitiesServices, StudyLevelServices, StudyAreaServices, StudyStateServices,
                  InstituteServices],
    exports: 	  [FormalStudiesComponent,NoFormalStudiesComponent]
})
export class AcademicEducationModule { }
