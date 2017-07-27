import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { ContactInformationService } from './contact-information.service';
import { ContactInformationComponent } from './contact-information.component';
import { ContactInformationEditComponent } from './contact-information-edit.component';


@NgModule( {
              imports: [ CommonModule, FormSharedModule,SharedModule
              ],
              declarations: [ ContactInformationComponent,ContactInformationEditComponent ],
              bootstrap: [ ContactInformationComponent ],
              providers: [ ContactInformationService ],
              exports: [ ContactInformationComponent ]
           } )
export class ContactInformationModule {

}
