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
import { TipoDeAreaService } from "../_services/tipoDeArea.service";
import { TipoDeAreaComponent } from "./tipoDeArea.component";
import { TipoDeAreaAddComponent } from "./tipoDeArea-add.component";
import { TipoDeAreaEditComponent } from "./tipoDeArea-edit.component";
import { TipoDeAreaDetailComponent } from "./tipoDeArea-detail.component";
import { SharedModule } from "../shared/shared.module";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 28/02/2017.
 */

@NgModule( {
              imports: [ CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule, CalendarModule, SharedModule ],
              declarations: [ TipoDeAreaComponent, TipoDeAreaAddComponent, TipoDeAreaEditComponent, TipoDeAreaDetailComponent ],
              bootstrap: [ TipoDeAreaComponent ],
              providers: [ TipoDeAreaService ],
              exports: [ TipoDeAreaComponent ]
           } )
export class TipoDeAreaModule {
   
}
