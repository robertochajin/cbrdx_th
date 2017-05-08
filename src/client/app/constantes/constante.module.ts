import { NgModule } from '@angular/core';
import { InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConstanteService } from '../_services/constante.service';
import { ConstanteComponent } from './constante.component';
import { ConstanteAddComponent } from './constante-add.component';
import { ConstanteEditComponent } from './constante-edit.component';
import { ConstanteDetailComponent } from './constante-detail.component';
import { ListaService } from '../_services/lista.service';
import { SharedModule } from '../shared/shared.module';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { TercerosService } from '../_services/terceros.service';
@NgModule( {
              imports: [ CommonModule, FormsModule, InputTextModule, DataTableModule, ButtonModule, CheckboxModule, DialogModule, SharedModule ],
              declarations: [ ConstanteComponent, ConstanteAddComponent, ConstanteEditComponent, ConstanteDetailComponent ],
              bootstrap: [ ConstanteComponent ],
              providers: [ ConstanteService, ListaService, TercerosService ],
              exports: [ ConstanteComponent ]
           } )
export class ConstanteModule {

}
