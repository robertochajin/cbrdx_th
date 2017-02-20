/**
 * Created by Angel on 10/02/2017.
 */
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { FamilyInformationComponent }  from './family-information.component';
import { FamilyInformationDetailComponent }  from './family-information-detail.component';
import { FamilyInformationAddComponent }  from './family-information-add.component';
import { FamilyInformationUpdateComponent }  from './family-information-update.component';
import { FamilyInformationService } from './family-information.service';
import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,ConfirmDialogModule } from 'primeng/primeng';


@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,ConfirmDialogModule],
    declarations: [FamilyInformationComponent,
                    FamilyInformationDetailComponent,
                    FamilyInformationAddComponent,
                    FamilyInformationUpdateComponent
                    ],
    bootstrap:    [FamilyInformationComponent],
    providers:    [FamilyInformationService],
    exports: 	  [FamilyInformationComponent]
})
export class FamilyInformationModule { }
