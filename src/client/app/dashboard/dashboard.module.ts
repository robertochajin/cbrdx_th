import { NgModule } from "@angular/core";
import {
   InputTextModule,
   DataTableModule,
   ButtonModule,
   DialogModule,
   FieldsetModule,
   PanelModule,
   ChartModule,
   CheckboxModule,
   DragDropModule
} from "primeng/primeng";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard.component";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { TercerosService } from "../_services/terceros.service";
import { RolesService } from "../_services/roles.service";
import { UsuariosService } from "../_services/usuarios.service";
import { SharedModule } from "../shared/shared.module";

@NgModule( {
              imports: [ CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, DialogModule, FieldsetModule, PanelModule, ChartModule, CheckboxModule, DragDropModule,
                 SharedModule
              ],
              declarations: [ DashboardComponent ],
              bootstrap: [ DashboardComponent ],
              providers: [ TercerosService, RolesService, UsuariosService ],
              exports: [ DashboardComponent ]
           } )
export class DashboardModule {
   
}
