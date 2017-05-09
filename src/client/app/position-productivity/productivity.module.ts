import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/primeng';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { ProductivityComponent }  from './productivity.component';
import {ProductivityService} from '../_services/productivity.service';
import {SharedModule} from '../shared/shared.module';
import { InputTextModule,DataTableModule,ButtonModule,DialogModule,
  DropdownModule, MessagesModule, ConfirmDialogModule} from 'primeng/primeng';


@NgModule({
  imports:[CommonModule,
    SharedModule,InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    MessagesModule,
    ConfirmDialogModule,
    CheckboxModule
  ],
  declarations: [ProductivityComponent,

              ],
              bootstrap: [ ProductivityComponent ],
              providers: [ ProductivityService ],
              exports: [ ProductivityComponent ]
           } )

export class ProductivityModule {
}
