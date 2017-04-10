/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 24/02/2017.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
    InputTextModule,
    DataTableModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    FieldsetModule
} from "primeng/primeng";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import {ListaService} from "../_services/lista.service";
import {ListaComponent} from "./lista.component";
import {ListaAddComponent} from "./lista-add.component";
import {ListaDetailComponent} from "./lista-detail.component";
import {SharedModule} from "../shared/shared.module";
import {ListaEditComponent} from "./lista-edit.component";

@NgModule({
    imports: [CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule, FieldsetModule,SharedModule],
    declarations: [ListaComponent, ListaAddComponent, ListaDetailComponent, ListaEditComponent],
    bootstrap: [ListaComponent],
    providers: [ListaService],
    exports: [ListaComponent]
})
export class ListaModule {
}