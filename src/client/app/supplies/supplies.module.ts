import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { NavService } from '../_services/_nav.service';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { ListaService } from '../_services/lista.service';
import { SuppliesComponent } from './supplies.component';
import { SuppliesService } from '../_services/supplies.service';
import { SuppliesAddComponent } from './supplies-add.component';
import { SuppliesUpdateComponent } from './supplies-update.component';
import { SuppliesProjectionAddComponent } from './supplies-projection/supplies-projection-add.component';
import { SuppliesProjectionComponent } from './supplies-projection/supplies-projection.component';
import { SuppliesProjectionServices } from '../_services/suppliesProjection.service';
import { EmployessSuppliesServices } from '../_services/employeesSupplies.service';


@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,

              ],

              declarations: [ SuppliesComponent, SuppliesAddComponent, SuppliesUpdateComponent,
                 SuppliesProjectionComponent, SuppliesProjectionAddComponent
              ],
              bootstrap: [ SuppliesComponent ],
              providers: [ SuppliesService, NavService, ListaService, SuppliesProjectionServices, EmployessSuppliesServices ],
              exports: [ SuppliesComponent ]
           } )
export class SuppliesModule {
}
