import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { LocationsModule } from '../locations/locations.module';
import { EmployeeNoveltyComponent } from './employee-novelty.component';
import { EmployeeNoveltyService } from '../_services/employee-novelty.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 LocationsModule
              ],
              declarations: [ EmployeeNoveltyComponent ],
              bootstrap: [ EmployeeNoveltyComponent ],
              providers: [ EmployeeNoveltyService ],
              exports: [ EmployeeNoveltyComponent ]
           } )
export class EmployeeNoveltyModule {

}
