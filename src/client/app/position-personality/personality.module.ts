import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormSharedModule} from "../shared/form-shared.module";
import {PersonalityComponent} from "./personality.component";
import {PositionPersonalityServices} from "../_services/position-personality.service";
import {PositionPersonalityTypesServices} from "../_services/list-position-personality.service";

@NgModule({
   imports: [CommonModule,
      SharedModule,
      FormSharedModule
   ],
   declarations: [PersonalityComponent],
   bootstrap: [PersonalityComponent],
   providers: [PositionPersonalityServices, PositionPersonalityTypesServices],
   exports: [PersonalityComponent]
})

export class PersonalityModule {

}