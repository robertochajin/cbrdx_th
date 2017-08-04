import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { AccidentIncidentComponent } from './accidents-incidents.component';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';
import { AccidentIncidentPlanComponent } from './accidents-incidents-plan.component';
import { EmployeeEventualitiesPlansService } from '../_services/employeeEventualitiesPlans.service';
import { EmployeeEventualitiesAttachmentService } from '../_services/employees-eventualities-attachment.service';
import { EmployeeEventualitiesPlansAttachmentService } from '../_services/employees-eventualities-plans-attachment.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],
              declarations: [ AccidentIncidentComponent, AccidentIncidentPlanComponent ],
              bootstrap: [ AccidentIncidentComponent ],
              providers: [
                 EmployeeEventualitiesService,
                 EmployeeEventualitiesPlansService,
                 EmployeeEventualitiesAttachmentService,
                 EmployeeEventualitiesPlansAttachmentService
              ],
              exports: [ AccidentIncidentComponent ]
           } )
export class AccidentIncidentModule {

}