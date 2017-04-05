import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { EmployeesEstateComponent }  from './employee-estate.component';
import { EmployeeEstateDetailComponent }  from './employee-estate-detail.component';
import { EmployeesEstateAddComponent }  from './employee-estate-add.component';
import { EmployeesEstateUpdateComponent }  from './employee-estate-update.component';
import {EmployeeEstateService} from '../_services/employee-estate.service';


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
  ],
  declarations: [EmployeesEstateComponent,
    EmployeeEstateDetailComponent,
    EmployeesEstateAddComponent,
    EmployeesEstateUpdateComponent,

  ],
  bootstrap:    [EmployeesEstateComponent],
  providers:    [EmployeeEstateService],
  exports: 	  [EmployeesEstateComponent]
})
export class EmployeesEstateModule { }
