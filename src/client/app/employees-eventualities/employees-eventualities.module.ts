import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { LocationsModule } from '../locations/locations.module';
import { EmployeeEventualitiesComponent } from './employees-eventualities.component';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { EmployeeEventualitiesAddComponent } from './employee-eventualities-edit.component';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 LocationsModule
              ],
              declarations: [ EmployeeEventualitiesComponent, EmployeeEventualitiesAddComponent ],
              bootstrap: [ EmployeeEventualitiesComponent ],
              providers: [ EmployeeEventualitiesService ],
              exports: [ EmployeeEventualitiesComponent ]
           } )
export class EmployeeEventualitiesModule {

}
