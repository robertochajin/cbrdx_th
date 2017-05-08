import {NgModule}      from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import {AbsenceComponent} from "./position-absence.component";
import {FormSharedModule } from '../shared/form-shared.module';
import {AbsenceService} from '../_services/position-absence.service';
import {SharedModule } from '../shared/shared.module';
// import {InputSwitchModule} from 'primeng/primeng';

@NgModule({
   imports: [
      SharedModule,
      FormSharedModule,
      ReactiveFormsModule,
      // InputSwitchModule,
   ],
   declarations: [
      AbsenceComponent
   ],
   bootstrap: [AbsenceComponent],
   providers: [AbsenceService],
   exports: [AbsenceComponent]
})
export class AbsenceModule {
}
