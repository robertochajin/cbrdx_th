import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { RolesService } from '../_services/roles.service';
import { RolesComponent } from './roles.component';
import { RolesAddComponent } from './roles-add.component';
import { RolesUpdateComponent } from './roles-update.component';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { RolFuncionalitiesComponent } from './rol-functionalities.component';
import { RolFuncionalitiesServices } from '../_services/rolFuncionalities.service';
import { RolWidgetsComponent } from './rol-widgets.component';
import { RolWidgetsServices } from '../_services/rolWidgets.service';
import { RolFuncionalitiesConfigComponent } from './rol-functionalities-config.component';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [
                 RolesComponent,
                 RolesAddComponent,
                 RolesUpdateComponent,
                 RolFuncionalitiesComponent,
                 RolWidgetsComponent,
                 RolFuncionalitiesConfigComponent
              ],
              bootstrap: [ RolesComponent ],
              providers: [
                 RolesService,
                 RolFuncionalitiesServices,
                 RolWidgetsServices
              ],
              exports: [ RolesComponent ]
           } )
export class RolesModule {
}