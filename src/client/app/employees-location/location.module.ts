/**
 * Created by Angel on 10/02/2017.
 */
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { LocationComponent }  from './location.component';
import { LocationDetailComponent }  from './location-detail.component';
import { LocationAddComponent }  from './location-add.component';
import { LocationUpdateComponent }  from './location-update.component';
import { LocationService } from './location.service';
import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule, AutoCompleteModule, DropdownModule } from 'primeng/primeng';


@NgModule({
    imports:      [CommonModule,
                    InputTextModule,
                    FormsModule,
                    DataTableModule,
                    ButtonModule,
                    DialogModule,
                    InputTextareaModule,
                    CalendarModule,
                    AutoCompleteModule,
                    DropdownModule],
    declarations: [LocationComponent,
                    LocationDetailComponent,
                    LocationAddComponent,
                    LocationUpdateComponent
                    ],
    bootstrap:    [LocationComponent],
    providers:    [LocationService],
    exports: 	  [LocationComponent]
})
export class LocationModule { }
