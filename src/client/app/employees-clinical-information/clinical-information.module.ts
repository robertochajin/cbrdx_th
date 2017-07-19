import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'rxjs/add/operator/toPromise';
import { SharedModule } from '../shared/shared.module';
import { ClinicalInformationComponent } from './clinical-information.component';
import { ClinicalInformationService } from '../_services/clinical-information.service';
import { DiagnosticCIEServices } from '../_services/diagnosticCIE.service';
import { FormSharedModule } from '../shared/form-shared.module';
import { MedicalExamInformedConsentComponent } from './informed-consent.component';

@NgModule( {
              imports: [ CommonModule,
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [ ClinicalInformationComponent, MedicalExamInformedConsentComponent ],
              bootstrap: [ ClinicalInformationComponent ],
              providers: [ ClinicalInformationService, DiagnosticCIEServices ],
              exports: [ ClinicalInformationComponent ]
           } )
export class ClinicalInformationModule {
}
