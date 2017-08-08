import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { JobAdaptationComponent } from './job-adaptation.component';
import { JobAdaptationExamComponent } from './job-daptation-exam.component';
import { EmployeeEventualitiesService } from '../_services/employees-eventualities.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],
              declarations: [ JobAdaptationComponent, JobAdaptationExamComponent ],
              bootstrap: [ JobAdaptationComponent ],
              providers: [
                 EmployeeEventualitiesService,
              ],
              exports: [ JobAdaptationComponent ]
           } )
export class JobAdaptationtModule {

}