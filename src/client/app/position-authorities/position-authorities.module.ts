import {NgModule}      from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import {AuthoritiesComponent} from "./position-authorities.component";
import {FormSharedModule } from '../shared/form-shared.module';
import {AbsenceService} from '../_services/position-absence.service';
// import {InputSwitchModule} from 'primeng/primeng';

@NgModule({
   imports: [
      FormSharedModule,
      ReactiveFormsModule,
   ],
   declarations: [
      AuthoritiesComponent
   ],
   bootstrap: [AuthoritiesComponent],
   providers: [AbsenceService],
   exports: [AuthoritiesComponent]
})
export class AuthoritiesModule {
}