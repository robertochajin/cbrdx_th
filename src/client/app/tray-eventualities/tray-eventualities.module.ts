import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { NavService } from '../_services/_nav.service';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { ListaService } from '../_services/lista.service';
import { TrayEventualitiesComponent } from './tray-eventualities.component';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],

              declarations: [ TrayEventualitiesComponent
              ],
              bootstrap: [ TrayEventualitiesComponent ],
              providers: [ NavService, ListaService, EmployeeEventualitiesService ],
              exports: [ TrayEventualitiesComponent ]
           } )
export class TrayEventualitiesModule {
}
