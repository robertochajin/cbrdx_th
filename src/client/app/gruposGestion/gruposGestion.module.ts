import { NgModule } from '@angular/core';
import { InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule, CalendarModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GruposGestionService } from '../_services/grupoGestion.service';
import { GruposGestionComponent } from './gruposGestion.component';
import { GruposGestionAddComponent } from './gruposGestion-add.component';
import { GruposGestionEditComponent } from './gruposGestion-edit.component';
import { GruposGestionDetailComponent } from './gruposGestion-detail.component';
import { SharedModule } from '../shared/shared.module';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
/**
 * Created by Felipe Aguirre - Jenniferth Escobar on 23/02/2017.
 */

@NgModule( {
              imports: [ CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule,
                 CalendarModule, SharedModule
              ],
              declarations: [ GruposGestionComponent, GruposGestionAddComponent, GruposGestionEditComponent, GruposGestionDetailComponent ],
              bootstrap: [ GruposGestionComponent ],
              providers: [ GruposGestionService ],
              exports: [ GruposGestionComponent ]
           } )
export class GruposGestionModule {

}
