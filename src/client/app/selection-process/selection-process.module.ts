import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { SelectionProcessComponent } from './selection-process.component';
import { SelectionProcessAddComponent } from './selection-process-add.component';
import { PublicationsService } from '../_services/publications.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [
                 SelectionProcessComponent,SelectionProcessAddComponent
              ],
              bootstrap: [ SelectionProcessComponent ],
              providers: [
                 PublicationsService
              ],
              exports: [ SelectionProcessComponent ]
           } )
export class SelectionProcessModule {
}
