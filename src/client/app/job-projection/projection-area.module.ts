import {NgModule}      from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import {JobProjectionComponent} from "./projection-area.component";
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
      JobProjectionComponent
   ],
   bootstrap: [JobProjectionComponent],
   providers: [JobProjectionService],
   exports: [JobProjectionComponent]
})
export class JobProjectionModule {
}
