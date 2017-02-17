/**
 * Created by Angel on 15/02/2017.
 */
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { FormalStudiesComponent }  from './formal-studies.component';
import { FormalStudiesDetailComponent }  from './formal-studies-detail.component';
import { FormalStudiesAddComponent }  from './formal-studies-add.component';
import { FormalStudiesUpdateComponent }  from './formal-studies-update.component';
import { AcademicEducationService } from './academic-education.service';
import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule } from 'primeng/primeng';


@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule],
    declarations: [FormalStudiesComponent,
                    FormalStudiesAddComponent,
                    FormalStudiesUpdateComponent,
                    FormalStudiesDetailComponent],
    bootstrap:    [FormalStudiesComponent],
    providers:    [AcademicEducationService],
    exports: 	  [FormalStudiesComponent]
})
export class AcademicEducationModule { }
