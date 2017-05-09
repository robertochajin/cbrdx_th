/**
 * Created by Jenniferth Escobar - Felipe Aguirre on 9/03/2017.
 */
import { NgModule } from '@angular/core';
import {
   InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule, CalendarModule, TreeModule, TabViewModule, DropdownModule,
   FieldsetModule, GrowlModule, AutoCompleteModule
} from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { SharedModule } from '../shared/shared.module';
import { ActividadEconomicaService } from '../_services/actividadEconomica.service';
import { ActividadEconomicaComponent } from './actividadEconomica.component';

@NgModule( {
              imports: [ CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule,
                 CalendarModule, TreeModule, TabViewModule, DropdownModule, SharedModule,

                 FieldsetModule,

                 GrowlModule,
                 AutoCompleteModule

              ],
              declarations: [ ActividadEconomicaComponent ],
              bootstrap: [ ActividadEconomicaComponent ],
              providers: [ ActividadEconomicaService ],
              exports: [ ActividadEconomicaComponent ]
           } )
export class ActividadEconomicaModule {

}