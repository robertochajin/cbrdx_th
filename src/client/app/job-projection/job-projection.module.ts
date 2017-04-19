import {NgModule}      from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import {JobProjectionComponent} from "./job-projection.component";
import {JobProjectionPositionsComponent} from "./job-projection-positions.component";
import {FormSharedModule } from '../shared/form-shared.module';
import {JobProjectionService} from '../_services/jobProjection.service';
import {InputSwitchModule,CheckboxModule} from 'primeng/primeng';

@NgModule({
   imports: [
      FormSharedModule,
      ReactiveFormsModule,
      InputSwitchModule,
      CheckboxModule
   ],
   declarations: [
      JobProjectionComponent,JobProjectionPositionsComponent
   ],
   bootstrap: [JobProjectionComponent,JobProjectionPositionsComponent],
   providers: [JobProjectionService],
   exports: [JobProjectionComponent,JobProjectionPositionsComponent]
})
export class JobProjectionModule {
}
