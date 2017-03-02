/**
 * Created by Angel on 14/02/2017.
 */
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { ReferencesComponent }  from './references.component';
import { ReferencesDetailComponent }  from './references-detail.component';
import { ReferencesAddComponent }  from './references-add.component';
import { ReferencesUpdateComponent }  from './references-update.component';
import { ReferencesService } from './references.service';
import { ReferencesTypesServices } from '../_services/references-type.service';

import { InputTextModule,DataTableModule,ButtonModule,DialogModule,InputTextareaModule,CalendarModule,DropdownModule,
  ConfirmDialogModule,
  MessagesModule,
  AutoCompleteModule
} from 'primeng/primeng';


@NgModule({
    imports:      [CommonModule,InputTextModule,FormsModule,DataTableModule,ButtonModule,
                    DialogModule,InputTextareaModule,CalendarModule,DropdownModule,
                    ConfirmDialogModule,
                    MessagesModule,
                    AutoCompleteModule
                    ],
    declarations: [ReferencesComponent,
                    ReferencesDetailComponent,
                    ReferencesAddComponent,
                    ReferencesUpdateComponent
                    ],
    bootstrap:    [ReferencesComponent],
    providers:    [ReferencesService,ReferencesTypesServices],
    exports: 	  [ReferencesComponent]
})
export class ReferencesModule { }
