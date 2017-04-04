import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { LocationsComponent }  from '../locations/locations.component';
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
    declarations: [
                    LocationsComponent
                    ],
    bootstrap:    [LocationsComponent],
    providers:    [LocateService, PoliticalDivisionService],
    exports: 	  [LocationsComponent]
})
export class LocationsModule { }
