import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { DocumentManagementService } from '../_services/document-managgement.service';
import { DocumentManagementComponent } from './document-management.component';
import { LocationsModule } from '../locations/locations.module';
import { ZonesServices } from '../_services/zones.service';


@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 LocationsModule
              ],
              declarations: [ DocumentManagementComponent ],
              bootstrap: [ DocumentManagementComponent ],
              providers: [ DocumentManagementService ],
              exports: [ DocumentManagementComponent ]
           } )
export class DocumentManagementModule {

}
