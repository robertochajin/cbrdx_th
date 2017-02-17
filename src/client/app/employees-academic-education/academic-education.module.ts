/**
 * Created by Angel on 15/02/2017.
 */
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import 'rxjs/add/operator/toPromise';

import { FormalStudiesComponent }  from './formal-studies.component';
import { FormalStudiesDetailComponent }  from './formal-studies-detail.component';
import { FormalStudiesAddComponent }  from './formal-studies-add.component';
import { FormalStudiesUpdateComponent }  from './formal-studies-update.component';

import { NoFormalStudiesComponent }  from './no-formal-studies.component';
import { NoFormalStudiesDetailComponent }  from './no-formal-studies-detail.component';
import { NoFormalStudiesAddComponent }  from './no-formal-studies-add.component';
import { NoFormalStudiesUpdateComponent }  from './no-formal-studies-update.component';

import { AcademicEducationService } from './academic-education.service';
import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule } from 'primeng/primeng';


@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule],
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
    providers:    [AcademicEducationService],
    exports: 	  [FormalStudiesComponent,NoFormalStudiesComponent]
})
export class AcademicEducationModule { }
