import { NgModule } from "@angular/core";
import {
   InputTextModule,
   DataTableModule,
   ButtonModule,
   CheckboxModule,
   DialogModule,
   CalendarModule
} from "primeng/primeng";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CentroCostosService } from "../_services/centroCostos.service";
import { CentroCostosComponent } from "./centroCostos.component";
import { CentroCostosAddComponent } from "./centroCostos-add.component";
import { CentroCostosEditComponent } from "./centroCostos-edit.component";
import { CentroCostosDetailComponent } from "./centroCostos-detail.component";
import "rxjs/add/operator/map";
import { SharedModule } from "../shared/shared.module";
import "rxjs/add/operator/switchMap";
/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 23/02/2017.
 */

@NgModule( {
              imports: [ CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule, CalendarModule, SharedModule ],
              declarations: [ CentroCostosComponent, CentroCostosAddComponent, CentroCostosEditComponent, CentroCostosDetailComponent ],
              bootstrap: [ CentroCostosComponent ],
              providers: [ CentroCostosService ],
              exports: [ CentroCostosComponent ]
           } )
export class CentroCostosModule {
   
}