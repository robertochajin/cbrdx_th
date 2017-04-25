import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { ReferencesComponent }  from './references.component';
import { ReferencesDetailComponent }  from './references-detail.component';
import { ReferencesAddComponent }  from './references-add.component';
import { ReferencesUpdateComponent }  from './references-update.component';
import { ReferencesService } from './references.service';
import { LocateService } from '../_services/locate.service';
import {SharedModule} from "../shared/shared.module";
import { PoliticalDivisionService } from "../_services/political-division.service";
import { LocationsModule } from "../locations/locations.module";

import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule,
  ConfirmDialogModule,
  MessagesModule,
  AutoCompleteModule,
  FileUploadModule
} from 'primeng/primeng';
import {ListaService} from "../_services/lista.service";


@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,ButtonModule,
                    DialogModule,InputTextareaModule,CalendarModule,DropdownModule,
                    ConfirmDialogModule,
                    MessagesModule,
                    SharedModule,
                    AutoCompleteModule,
                    FileUploadModule,
                    LocationsModule
                    ],
    declarations: [ReferencesComponent,
                    ReferencesDetailComponent,
                    ReferencesAddComponent,
                    ReferencesUpdateComponent
                    ],
    bootstrap:    [ReferencesComponent],
    providers:    [ReferencesService,LocateService, PoliticalDivisionService,ListaService],
    exports: 	  [ReferencesComponent]
})
export class ReferencesModule { }
