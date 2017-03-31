import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { LocationComponent }  from './employee-location.component';
import { LocationDetailComponent }  from './employee-location-detail.component';
import { LocationAddComponent }  from './employee-location-add.component';
import { LocationUpdateComponent }  from './employee-location-update.component';
import { LocationService } from '../_services/employee-location.service';
// import { LocationsComponent }  from '../locations/locations.component';
// import {SharedModule} from "../shared/shared.module";

import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,
    AutoCompleteModule, DropdownModule,
  MessagesModule,
  ConfirmDialogModule
} from 'primeng/primeng';


@NgModule({
    imports:      [CommonModule,
                    InputTextModule,
                    FormsModule,
                    ReactiveFormsModule,
                    DataTableModule,
                    ButtonModule,
                    DialogModule,
                    InputTextareaModule,
                    CalendarModule,
                    AutoCompleteModule,
                    DropdownModule,
                    MessagesModule,
                    ConfirmDialogModule,
                    // SharedModule
    ],
    declarations: [LocationComponent,
                   LocationDetailComponent,
                   LocationAddComponent,
                   LocationUpdateComponent,
                //    LocationsComponent
                    ],
    bootstrap:    [LocationComponent],
    providers:    [LocationService],
    exports: 	  [LocationComponent]
})
export class LocationModule { }
