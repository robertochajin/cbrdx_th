import { NgModule } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioDetailComponent } from './usuarios-detail.component';
import { UsuariosAddComponent } from './usuarios-add.component';
import { UsuariosEditComponent } from './usuarios-edit.component';
import { UserSessionComponent } from './userSession.component';
import { UsuariosService } from '../_services/usuarios.service';
import { RolesService } from '../_services/roles.service';
import { GruposGestionService } from '../_services/grupoGestion.service';
import { TercerosService } from '../_services/terceros.service';
import { ListaService } from '../_services/lista.service';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],
              declarations: [
                 UsuariosComponent,
                 UsuarioDetailComponent,
                 UsuariosAddComponent,
                 UsuariosEditComponent,
                 UserSessionComponent
              ],
              bootstrap: [ UsuariosComponent ],
              providers: [
                 UsuariosService,
                 GruposGestionService,
                 RolesService,
                 TercerosService,
                 ListaService
              ],
              exports: [ UsuariosComponent, UserSessionComponent ]
           } )
export class UsuariosModule {
}