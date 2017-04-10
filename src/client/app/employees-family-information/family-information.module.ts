import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { FamilyInformationComponent }  from './family-information.component';
import { FamilyInformationDetailComponent }  from './family-information-detail.component';
import { FamilyInformationAddComponent }  from './family-information-add.component';
import { FamilyInformationUpdateComponent }  from './family-information-update.component';
import { FamilyInformationService } from './family-information.service';
import { RelationTypeServices } from '../_services/relation-type.service';
import {SharedModule} from "../shared/shared.module";
import {LocationsModule} from "../locations/locations.module";

import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule,ConfirmDialogModule,CheckboxModule,MessagesModule } from 'primeng/primeng';


@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,ReactiveFormsModule, DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule, ConfirmDialogModule,CheckboxModule,MessagesModule,LocationsModule,SharedModule

                    ],
    declarations: [FamilyInformationComponent,
                    FamilyInformationDetailComponent,
                    FamilyInformationAddComponent,
                    FamilyInformationUpdateComponent,
                    ],
    bootstrap:    [FamilyInformationComponent],
    providers:    [FamilyInformationService,RelationTypeServices],
    exports: 	  [FamilyInformationComponent]
})
export class FamilyInformationModule { }
