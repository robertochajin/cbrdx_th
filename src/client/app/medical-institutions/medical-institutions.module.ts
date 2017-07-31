import { NgModule } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { ButtonModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { MedicalInstitutionsComponent } from './medical-institutions.component';
import { DataTableModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { MedicalInstitutionService } from '../_services/medical-institutions.service';
import { MedicalInstitutionAddComponent } from './medical-institutions-add.component';
import {
   DropdownModule, InputMaskModule, AccordionModule, MessagesModule, InputTextModule, InputTextareaModule, PanelModule
} from 'primeng/primeng';
import { LocationsModule } from '../locations/locations.module';
import { MedicalInstitutionUpdateComponent } from './medical-institutions-update.component';
import { MedicalInstitutionDetailComponent } from './medical-institutions-detail.component';
import { AnswerExamsComponent } from './answer-exams.component';
import { QuestionnairesModule } from '../questionnaires/questionnaires.module';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { LocationsNomenclaturesServices } from '../_services/locationsNomenclatures.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 ButtonModule,
                 ConfirmDialogModule,
                 DataTableModule,
                 CheckboxModule,
                 MessagesModule,
                 AccordionModule,
                 DropdownModule,
                 InputMaskModule,
                 LocationsModule,
                 InputTextModule,
                 InputTextareaModule, PanelModule, QuestionnairesModule
              ],
              declarations: [ MedicalInstitutionsComponent, MedicalInstitutionAddComponent, MedicalInstitutionUpdateComponent,
                 MedicalInstitutionDetailComponent, AnswerExamsComponent
              ],
              bootstrap: [ MedicalInstitutionsComponent, MedicalInstitutionAddComponent ],
              providers: [ MedicalInstitutionService, ListaService, ConfirmationService, PoliticalDivisionService,
                 LocationsNomenclaturesServices
              ],
              exports: [ MedicalInstitutionsComponent, MedicalInstitutionAddComponent ]
           } )
export class MedicalInstitutionModule {
}
