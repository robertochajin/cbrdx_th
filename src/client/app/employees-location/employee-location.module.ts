import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import "rxjs/add/operator/toPromise";
import { LocationComponent } from "./employee-location.component";
import { LocationDetailComponent } from "./employee-location-detail.component";
import { LocationAddComponent } from "./employee-location-add.component";
import { LocationUpdateComponent } from "./employee-location-update.component";
import { LocationService } from "../_services/employee-location.service";
import { ListEmployeesService } from "../_services/lists-employees.service";
// import { LocationsComponent }  from '../locations/locations.component';
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
   CheckboxModule,
   ConfirmDialogModule
} from "primeng/primeng";
import { TercerosResidenciasServices } from "../_services/terceros-residencias.service";
import { ListaService } from "../_services/lista.service";

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
                 CheckboxModule,
                 ConfirmDialogModule,
                 SharedModule
              ],
              declarations: [ LocationComponent,
                 LocationDetailComponent,
                 LocationAddComponent,
                 LocationUpdateComponent,
                 //    LocationsComponent
              ],
              bootstrap: [ LocationComponent ],
              providers: [ LocationService, ListEmployeesService, TercerosResidenciasServices, ListaService ],
              exports: [ LocationComponent ]
           } )
export class LocationModule {
}
