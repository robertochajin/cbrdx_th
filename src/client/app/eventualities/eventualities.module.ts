import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { EventualityServices } from '../_services/eventuality.service';
import { EventualitiesComponent } from './eventualities.component';
import { ConfirmationService } from 'primeng/primeng';
import { EventualitiesEditComponent } from './eventualities-edit.component';
import { EventualitiesDetailComponent } from './eventualities-detail.component';
import { EventualityRolesServices } from '../_services/eventualityRoles.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [
                 EventualitiesComponent,
                 EventualitiesEditComponent,
                 EventualitiesDetailComponent
              ],
              bootstrap: [ EventualitiesComponent ],
              providers: [ ConfirmationService,
                           EventualityServices,
                           EventualityRolesServices],
              exports: [  ]
           } )
export class EventualitiesModule {
}
