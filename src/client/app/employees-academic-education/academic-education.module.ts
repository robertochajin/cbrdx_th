/**
 * Created by Angel on 15/02/2017.
 */
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { AcademicEducationComponent }  from './academic-education.component';
//import { AcademicEducationDetailComponent }  from './academic-education-detail.component';
//import { AcademicEducationAddComponent }  from './academic-education-add.component';
//import { AcademicEducationUpdateComponent }  from './academic-education-update.component';
import { AcademicEducationService } from './academic-education.service';
import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule } from 'primeng/primeng';


@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule],
    declarations: [AcademicEducationComponent,
                    // AcademicEducationDetailComponent,
                    // AcademicEducationAddComponent,
                    // AcademicEducationUpdateComponent
                    ],
    bootstrap:    [AcademicEducationComponent],
    providers:    [AcademicEducationService],
    exports: 	  [AcademicEducationComponent]
})
export class AcademicEducationModule { }
