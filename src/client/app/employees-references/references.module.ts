import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { ReferencesComponent }  from './references.component';
import { ReferencesDetailComponent }  from './references-detail.component';
import { ReferencesAddComponent }  from './references-add.component';
import { LocationsComponent }  from '../locations/locations.component';
import { ReferencesUpdateComponent }  from './references-update.component';
import { ReferencesService } from './references.service';
import { ReferencesTypesService } from '../_services/references-type.service';
import { LocateService } from '../_services/locate.service';
import { PoliticalDivisionService } from "../_services/political-division.service";

import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule,
  ConfirmDialogModule,
  MessagesModule,
  AutoCompleteModule,
  FileUploadModule
} from 'primeng/primeng';


@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,ButtonModule,
                    DialogModule,InputTextareaModule,CalendarModule,DropdownModule,
                    ConfirmDialogModule,
                    MessagesModule,
                    AutoCompleteModule,
                    FileUploadModule
                    ],
    declarations: [ReferencesComponent,
                    ReferencesDetailComponent,
                    ReferencesAddComponent,
                    ReferencesUpdateComponent,
                    LocationsComponent
                    ],
    bootstrap:    [ReferencesComponent],
    providers:    [ReferencesService,ReferencesTypesService,LocateService, PoliticalDivisionService],
    exports: 	  [ReferencesComponent]
})
export class ReferencesModule { }
