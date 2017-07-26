import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { FamilyInformationComponent } from './family-information.component';
import { FamilyInformationDetailComponent } from './family-information-detail.component';
import { FamilyInformationAddComponent } from './family-information-add.component';
import { FamilyInformationUpdateComponent } from './family-information-update.component';
import { FamilyInformationService } from './family-information.service';
import { LocationsModule } from '../locations/locations.module';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { LocationsNomenclaturesServices } from '../_services/locationsNomenclatures.service';

@NgModule( {
              imports: [ CommonModule, FormsModule, ReactiveFormsModule,
                  LocationsModule, SharedModule,FormSharedModule

              ],
              declarations: [ FamilyInformationComponent,
                 FamilyInformationDetailComponent,
                 FamilyInformationAddComponent,
                 FamilyInformationUpdateComponent,
              ],
              bootstrap: [ FamilyInformationComponent ],
              providers: [ FamilyInformationService, PoliticalDivisionService,
                 LocationsNomenclaturesServices ],
              exports: [ FamilyInformationComponent ]
           } )
export class FamilyInformationModule {
}
