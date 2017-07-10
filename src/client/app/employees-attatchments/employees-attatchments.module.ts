import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { EmployeesAttatchmentsComponent } from './employees-attatchments.component';
import { NavService } from '../_services/_nav.service';
import { DocumentsDownloadService } from '../_services/documentsDownload.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],
              declarations: [
                 EmployeesAttatchmentsComponent
              ],
              bootstrap: [ EmployeesAttatchmentsComponent ],
              providers: [ NavService, DocumentsDownloadService ],
              exports: [ EmployeesAttatchmentsComponent ]
           } )
export class EmployeesAttatchmentsModule {

}
