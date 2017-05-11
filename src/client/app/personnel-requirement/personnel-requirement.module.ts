import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],

              declarations: [
              ],
              bootstrap: [ ],
              providers: [ ],
              exports: [ ]
           } )
export class PersonnelRequirementModule {
}
