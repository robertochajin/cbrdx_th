import { NgModule } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { MedicalInstitutionsComponent } from './medical-institutions.component';
import { DataTableModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { MedicalInstitutionService } from '../_services/medical-institutions.service';
import { MedicalInstitutionAddComponent } from './medical-institutions-add.component';
import { DropdownModule, InputMaskModule, AccordionModule, MessagesModule,InputTextModule,InputTextareaModule } from 'primeng/primeng';
import { LocationsModule } from '../locations/locations.module';
import { MedicalInstitutionUpdateComponent } from './medical-institutions-update.component';

@NgModule( {
              imports: [
                 SharedModule,
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
                 InputTextareaModule
              ],
              declarations: [ MedicalInstitutionsComponent, MedicalInstitutionAddComponent,MedicalInstitutionUpdateComponent
              ],
              bootstrap: [ MedicalInstitutionsComponent, MedicalInstitutionAddComponent ],
              providers: [ MedicalInstitutionService, ListaService ],
              exports: [ MedicalInstitutionsComponent, MedicalInstitutionAddComponent ]
           } )
export class MedicalInstitutionModule {
}
