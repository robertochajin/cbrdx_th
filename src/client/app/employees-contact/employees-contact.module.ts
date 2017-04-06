import {NgModule}      from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

//import 'rxjs/add/operator/toPromise';

import {EmployeesContactComponent} from "../employees-contact/employees-contact.component";
import {EmployeesContactListComponent} from "../employees-contact/employees-contact-list.component";

import {FormSharedModule } from '../shared/form-shared.module';

import {EmployeesContactService} from '../_services/employees-contact.service';



@NgModule({
  imports: [
    FormSharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    EmployeesContactComponent,
    EmployeesContactListComponent
  ],
  bootstrap: [EmployeesContactComponent,EmployeesContactListComponent],
  providers: [EmployeesContactService],
  exports: [EmployeesContactComponent,EmployeesContactListComponent]
})
export class EmployeesContactModule {
}
