import { NgModule } from '@angular/core';
import {
   InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule, CalendarModule, TreeModule, TabViewModule, DropdownModule,
   FieldsetModule, GrowlModule
} from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { DivisionPoliticaService } from '../_services/divisionPolitica.service';
import { DivisionPoliticaComponent } from './divisionPolitica.component';
import { SharedModule } from '../shared/shared.module';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import { FormSharedModule } from '../shared/form-shared.module';


@NgModule( {
              imports: [ CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule,
                 CalendarModule, TreeModule, TabViewModule, DropdownModule, SharedModule,
                 FieldsetModule,
                 GrowlModule, FormSharedModule,
                 AutoCompleteModule
              ],
              declarations: [ DivisionPoliticaComponent ],
              bootstrap: [ DivisionPoliticaComponent ],
              providers: [ DivisionPoliticaService ],
              exports: [ DivisionPoliticaComponent ]
           } )
export class DivisionPoliticaModule {

}
