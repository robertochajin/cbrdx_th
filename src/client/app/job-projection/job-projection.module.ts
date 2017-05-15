import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { JobProjectionComponent } from './job-projection.component';
import { JobProjectionUpdateComponent } from './job-projection-positions-update.component';
import { JobProjectionApprobeComponent } from './job-projection-positions-approve.component';
import { JobProjectionAddComponent } from './job-projection-positions-add.component';
import { JobProjectionDetailComponent } from './job-projection-positions-detail.component';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { JobProjectionService } from '../_services/jobProjection.service';
import { InputSwitchModule, CheckboxModule } from 'primeng/primeng';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 ReactiveFormsModule,
                 InputSwitchModule,
                 CheckboxModule
              ],
              declarations: [
                 JobProjectionComponent,
                 JobProjectionUpdateComponent,
                 JobProjectionApprobeComponent,
                 JobProjectionAddComponent,
                 JobProjectionDetailComponent
              ],
              bootstrap: [ JobProjectionComponent, JobProjectionUpdateComponent ],
              providers: [ JobProjectionService ],
              exports: [ JobProjectionComponent, JobProjectionUpdateComponent ]
           } )
export class JobProjectionModule {
}
