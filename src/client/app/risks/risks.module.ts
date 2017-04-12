import {NgModule}      from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import {RisksComponent} from "./risks-component";
import {RisksAddComponent} from "./risks-add.component";
import {RisksUpdateComponent} from "./risks-update.component";
import {FormSharedModule } from '../shared/form-shared.module';
import {RisksService} from '../_services/risks.service';
import {InputSwitchModule,CheckboxModule} from 'primeng/primeng';

@NgModule({
   imports: [
      FormSharedModule,
      ReactiveFormsModule,
      InputSwitchModule,
      CheckboxModule
   ],
   declarations: [
      RisksComponent,RisksAddComponent,RisksUpdateComponent
   ],
   bootstrap: [RisksComponent,RisksAddComponent,RisksUpdateComponent],
   providers: [RisksService],
   exports: [RisksComponent,RisksAddComponent,RisksUpdateComponent]
})
export class RisksModule {
}
