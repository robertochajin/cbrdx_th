import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { PhysicStructureComponent } from './physic-structure.component';
import { PhysicStructureAddComponent } from './physic-structure-add.component';
import { PhysicStructureDetailComponent } from './physic-structure-detail.component';
import { PhysicStructureUpdateComponent } from './physic-structure-update.component';
import { PhysicStructureService } from '../_services/physic-structure.service';
import { SharedModule } from '../shared/shared.module';
import { LocationsModule } from '../locations/locations.module';
import { FormSharedModule } from '../shared/form-shared.module';

import {
   InputTextModule, DataTableModule, ButtonModule, DialogModule, InputTextareaModule, CalendarModule, AutoCompleteModule, DropdownModule,
   CheckboxModule, InputMaskModule, MessagesModule, ConfirmDialogModule
} from 'primeng/primeng';

@NgModule( {
              imports: [ CommonModule,
                 InputTextModule,
                 FormsModule,
                 ReactiveFormsModule,
                 FormSharedModule,
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
                 CheckboxModule,
                 InputMaskModule,
                 LocationsModule,
              ],
              declarations: [ PhysicStructureComponent, PhysicStructureAddComponent,
                 PhysicStructureDetailComponent, PhysicStructureUpdateComponent

              ],
              bootstrap: [ PhysicStructureComponent, PhysicStructureAddComponent,
                 PhysicStructureDetailComponent, PhysicStructureUpdateComponent
              ],
              providers: [ PhysicStructureService ],
              exports: [ PhysicStructureComponent, PhysicStructureAddComponent,
                 PhysicStructureDetailComponent, PhysicStructureUpdateComponent
              ]
           } )
export class PhysicStructureModule {
}
