import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { EmployeesAttachmentsComponent } from './employees-attachments.component';
import { NavService } from '../_services/_nav.service';
import { EmployeesAttachmentService } from '../_services/employeesAttachment.service';
import { DialogModule } from 'primeng/primeng';
import { PipeSeguro } from '../_helpers/pipeSeguro';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 DialogModule
              ],
              declarations: [
                 EmployeesAttachmentsComponent, PipeSeguro
              ],
              bootstrap: [ EmployeesAttachmentsComponent ],
              providers: [ NavService, EmployeesAttachmentService ],
              exports: [ EmployeesAttachmentsComponent ]
           } )
export class EmployeesAttachmentsModule {

}
