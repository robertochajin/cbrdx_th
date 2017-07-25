import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { NavService } from '../../_services/_nav.service';
import { SharedModule } from '../../shared/shared.module';
import { FormSharedModule } from '../../shared/form-shared.module';
import { ListaService } from '../../_services/lista.service';
import { SuppliesEmployeesComponent } from './supplies-employees.component';
import { SuppliesService } from '../../_services/supplies.service';
import { SuppliesEmployeesAddComponent } from './supplies-employees-add.component';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],

              declarations: [ SuppliesEmployeesComponent, SuppliesEmployeesAddComponent
              ],
              bootstrap: [ SuppliesEmployeesComponent ],
              providers: [ SuppliesService, NavService, ListaService ],
              exports: [ SuppliesEmployeesComponent ]
           } )
export class SuppliesModule {
}
