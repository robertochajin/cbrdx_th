import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import "rxjs/add/operator/toPromise";
import { AbsenceComponent } from "./position-absence.component";
import { FormSharedModule } from "../shared/form-shared.module";
import { AbsenceService } from "../_services/position-absence.service";
// import {InputSwitchModule} from 'primeng/primeng';

@NgModule( {
              imports: [
                 FormSharedModule,
                 ReactiveFormsModule,
                 // InputSwitchModule,
              ],
              declarations: [
                 AbsenceComponent
              ],
              bootstrap: [ AbsenceComponent ],
              providers: [ AbsenceService ],
              exports: [ AbsenceComponent ]
           } )
export class AbsenceModule {
}
