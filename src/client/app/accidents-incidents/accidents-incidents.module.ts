import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { AccidentIncidentComponent } from './accidents-incidents.component';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { AccidentIncidentPlanComponent } from './accidents-incidents-plan.component';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],
              declarations: [ AccidentIncidentComponent, AccidentIncidentPlanComponent ],
              bootstrap: [ AccidentIncidentComponent ],
              providers: [ EmployeeEventualitiesService ],
              exports: [ AccidentIncidentComponent ]
           } )
export class AccidentIncidentModule {

}