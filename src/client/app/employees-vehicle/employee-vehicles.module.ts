import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import "rxjs/add/operator/toPromise";
import { EmployeesVehicleComponent } from "./employee-vehicles.component";
// import { EmployeeEstateDetailComponent }  from './employee-estate-detail.component';
import { EmployeesVehicleAddComponent } from "./employee-vehicles-add.component";
import { EmployeesVehicleUpdateComponent } from "./employee-vehicle-update.component";
import { EmployeeVehicleService } from "../_services/employee-vehicles.service";
import { SharedModule } from "../shared/shared.module";
import {
   InputTextModule,
   DataTableModule,
   ButtonModule,
   DialogModule,
   InputTextareaModule,
   CalendarModule,
   AutoCompleteModule,
   DropdownModule,
   MessagesModule,
   ConfirmDialogModule
} from "primeng/primeng";

@NgModule( {
              imports: [ CommonModule,
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
                 SharedModule,
              ],
              declarations: [ EmployeesVehicleComponent,
                 // EmployeeEstateDetailComponent,
                 EmployeesVehicleAddComponent,
                 EmployeesVehicleUpdateComponent,
   
              ],
              bootstrap: [ EmployeesVehicleComponent ],
              providers: [ EmployeeVehicleService ],
              exports: [ EmployeesVehicleComponent ]
           } )
export class EmployeesVehicleModule {
}
