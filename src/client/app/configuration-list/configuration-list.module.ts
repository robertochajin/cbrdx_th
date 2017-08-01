import { NgModule } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { ListaService } from '../_services/lista.service';
import { ConfigurationListComponent } from './configuration-list.component';
import { DataTableModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { ConfigurationListServices } from '../_services/configurationList.service';
import {
   DropdownModule, InputMaskModule, AccordionModule, MessagesModule, InputTextModule, InputTextareaModule, PanelModule, InputSwitchModule
} from 'primeng/primeng';
import { LocationsModule } from '../locations/locations.module';
import { ConfigurationListAddComponent } from './configuration-list-add.component';
import { ConfigurationListUpdateComponent } from './configuration-list-update.component';
import { ConfigurationListDetailComponent } from './configuration-list-detail.component';

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
                 InputTextareaModule,
                 PanelModule,
                 InputSwitchModule
              ],
              declarations: [ ConfigurationListComponent, ConfigurationListAddComponent, ConfigurationListUpdateComponent,
                 ConfigurationListDetailComponent
              ],
              bootstrap: [ ConfigurationListComponent ],
              providers: [ ConfigurationListServices, ListaService, ConfirmationService ],
              exports: [ ConfigurationListComponent ]
           } )
export class ConfigurationListModule {
}
