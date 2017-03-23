/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 03/02/2017.
 */

import {NgModule} from "@angular/core";
import {
    InputTextModule,
    DataTableModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    CalendarModule,
    TreeModule, TabViewModule, DropdownModule,
    FieldsetModule,
    GrowlModule,

} from "primeng/primeng";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import {DivisionPoliticaService} from "../_services/divisionPolitica.service";
import {DivisionPoliticaComponent} from "./divisionPolitica.component";
import {AutoCompleteModule} from "primeng/components/autocomplete/autocomplete";

@NgModule({
    imports: [CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule, CalendarModule, TreeModule, TabViewModule, DropdownModule,
        FieldsetModule,
        GrowlModule,
        AutoCompleteModule
    ],
    declarations: [DivisionPoliticaComponent],
    bootstrap: [DivisionPoliticaComponent],
    providers: [DivisionPoliticaService],
    exports: [DivisionPoliticaComponent]
})
export class DivisionPoliticaModule {

}