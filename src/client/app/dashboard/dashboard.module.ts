import {NgModule} from "@angular/core";
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
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./dashboard.component";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@NgModule({
  imports: [CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, DialogModule, FieldsetModule, PanelModule, ChartModule, CheckboxModule, DragDropModule],
  declarations: [DashboardComponent],
  bootstrap: [DashboardComponent],
  providers: [],
  exports: [DashboardComponent]
})
export class DashboardModule {

}
