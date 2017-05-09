import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { PositionResponsabilitiesComponent } from './position-responsabilities.component';
import { PositionResponsabilitiesService } from '../_services/position-responsabilities.service';
import { ResponsabilitiesServices } from '../_services/responsabilities.service';

@NgModule( {
              imports: [ CommonModule,
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [ PositionResponsabilitiesComponent ],
              bootstrap: [ PositionResponsabilitiesComponent ],
              providers: [ PositionResponsabilitiesService, ResponsabilitiesServices ],
              exports: [ PositionResponsabilitiesComponent ]
           } )

export class PositionResponsabilitiesModule {

}
