/**
 * Created by jenni on 13/02/2017.
 */
import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import {UsuariosComponent}  from './usuarios.component';
import {UsuarioDetailComponent}  from './usuarios-detail.component';
import {UsuariosAddComponent}  from './usuarios-add.component';
import {UsuariosService} from '../_services/usuarios.service';
import {
    InputTextModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    PanelModule,
    CalendarModule,
    TabViewModule,
    DropdownModule,
    FieldsetModule,
    CheckboxModule
} from 'primeng/primeng';
import {RolesService} from "../_services/roles.service";
import {GruposGestionService} from "../_services/grupoGestion.service";
import {TercerosService} from "../_services/terceros.service";
import {ListaService} from "../_services/lista.service";
import {UsuariosEditComponent} from "./usuarios-edit.component";

@NgModule({
    imports: [CommonModule, InputTextModule, FormsModule, DataTableModule, ButtonModule, DialogModule, PanelModule, TabViewModule, CalendarModule, DropdownModule, FieldsetModule, CheckboxModule],
    declarations: [UsuariosComponent, UsuarioDetailComponent, UsuariosAddComponent,UsuariosEditComponent],
    bootstrap: [UsuariosComponent],
    providers: [UsuariosService, GruposGestionService, RolesService, TercerosService, ListaService],
    exports: [UsuariosComponent]
})
export class UsuariosModule {
}