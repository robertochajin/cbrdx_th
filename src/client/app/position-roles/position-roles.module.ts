import {NgModule}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {FormSharedModule} from "../shared/form-shared.module";
import {PositionRolesComponent} from "./position-roles.component";
import {ProcessRolesServices} from "../_services/processRoles.service";
import {PositionRolesServices} from "../_services/position-roles.service";

@NgModule({
  imports: [CommonModule,
    SharedModule,
    FormSharedModule
  ],
  declarations: [PositionRolesComponent],
  bootstrap: [PositionRolesComponent],
  providers: [PositionRolesServices, ProcessRolesServices],
  exports: [PositionRolesComponent]
})

export class PositionRolesModule {

}
