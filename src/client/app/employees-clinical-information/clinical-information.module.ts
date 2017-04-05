import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import 'rxjs/add/operator/toPromise';
import {SharedModule} from '../shared/shared.module';
import {
  InputTextModule, DataTableModule, ButtonModule, DialogModule, InputTextareaModule, CalendarModule, DropdownModule,
  ConfirmDialogModule,
  MessagesModule,
  AutoCompleteModule,
  FileUploadModule
} from 'primeng/primeng';
import {ClinicalInformationComponent} from "./clinical-information.component";
import {ClinicalInformationService} from "../_services/clinical-information.service";
import {DiagnosticCIEServices} from "../_services/diagnosticCIE.service";

@NgModule({
  imports: [CommonModule, InputTextModule, DataTableModule, ButtonModule,
    DialogModule, InputTextareaModule, CalendarModule, DropdownModule,
    ConfirmDialogModule,
    MessagesModule,
    AutoCompleteModule,
    FileUploadModule,
    SharedModule
  ],
  declarations: [ClinicalInformationComponent],
  bootstrap: [ClinicalInformationComponent],
  providers: [ClinicalInformationService, DiagnosticCIEServices],
  exports: [ClinicalInformationComponent]
})
export class ClinicalInformationModule {
}
