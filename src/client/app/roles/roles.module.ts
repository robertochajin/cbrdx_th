/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 26/02/2017.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
    MultiSelectModule,
    InputTextModule,
    DataTableModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    FieldsetModule,
    TabViewModule,
    CalendarModule
} from "primeng/primeng";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";
import any = jasmine.any;
import {RolesService} from "../_services/roles.service";
import {RolesComponent} from "./roles.component";
import {RolesAddComponent} from "./roles-add.component";
import {MenuElementoService} from "../_services/menuElemento.service";
@NgModule({
    imports: [CommonModule, FormsModule, MultiSelectModule, InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule, FieldsetModule, TabViewModule, CalendarModule],
    declarations: [RolesComponent, RolesAddComponent],
    bootstrap: [RolesComponent],
    providers: [RolesService, MenuElementoService],
    exports: [RolesComponent]
})
export class RolesModule {
}