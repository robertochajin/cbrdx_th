import { NgModule } from '@angular/core';
import { RolesService } from '../_services/roles.service';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { RolFuncionalitiesServices } from '../_services/rolFuncionalities.service';
import { SelectionProcessComponent } from './selection-process.component';
import { SelectionProcessAddComponent } from './selection-process-add.component';
import { RolWidgetsServices } from '../_services/rolWidgets.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [
                 SelectionProcessComponent,SelectionProcessAddComponent
              ],
              bootstrap: [ SelectionProcessComponent ],
              providers: [
                 RolesService,
                 RolFuncionalitiesServices,
                 RolWidgetsServices
              ],
              exports: [ SelectionProcessComponent ]
           } )
export class SelectionProcessModule {
}
