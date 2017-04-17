import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import {PhysicStructureComponent}  from './physic-structure.component';
import {PhysicStructuteService} from '../_services/physic-structure.service';
import {SharedModule} from "../shared/shared.module";

import {
   InputTextModule, DataTableModule, ButtonModule, DialogModule, InputTextareaModule, CalendarModule,
   AutoCompleteModule, DropdownModule,
   MessagesModule,
   ConfirmDialogModule
} from 'primeng/primeng';

@NgModule({
   imports: [CommonModule,
      InputTextModule,
      FormsModule,
      ReactiveFormsModule,
      DataTableModule,
      ButtonModule,
      DialogModule,
      InputTextareaModule,
      CalendarModule,
      AutoCompleteModule,
      DropdownModule,
      MessagesModule,
      ConfirmDialogModule,
      SharedModule,
   ],
   declarations: [PhysicStructureComponent,

   ],
   bootstrap: [PhysicStructureComponent],
   providers: [PhysicStructuteService],
   exports: [PhysicStructureComponent]
})
export class PhysicStructuteModule {
}
