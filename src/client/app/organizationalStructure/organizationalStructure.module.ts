import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { OrganizationalStructureService } from '../_services/organizationalStructure.service';
import { OrganizationalStructureComponent } from './organizationalStructure.component';
import { LocationsModule } from '../locations/locations.module';
import { ZonesServices } from '../_services/zones.service';
import { PoliticalDivisionService } from '../_services/political-division.service';
import { LocationsNomenclaturesServices } from '../_services/locationsNomenclatures.service';


@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 LocationsModule
              ],
              declarations: [ OrganizationalStructureComponent ],
              bootstrap: [ OrganizationalStructureComponent ],
              providers: [ OrganizationalStructureService, ZonesServices, PoliticalDivisionService, LocationsNomenclaturesServices ],
              exports: [ OrganizationalStructureComponent ]
           } )
export class OrganizationalStructureModule {

}
