import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganizationalStructurePositionsComponent} from "./organizational-structure-positions.component";
import {PersonPositionsServices} from "../_services/personPositions.service";
import {OrganizationalStructurePositionsServices} from "../_services/organizationalStructurePositions.service";
import {ContractTypesServices} from "../_services/contractTypes.service";
import {SharedModule} from "../shared/shared.module";
import {FormSharedModule} from "../shared/form-shared.module";
import {PositionsService} from "../_services/positions.service";

@NgModule({
   imports:      [CommonModule,
      SharedModule,
      FormSharedModule
   ],
   declarations: [
      OrganizationalStructurePositionsComponent
   ],
   bootstrap:    [OrganizationalStructurePositionsComponent],
   providers:    [PersonPositionsServices, OrganizationalStructurePositionsServices, ContractTypesServices, PositionsService],
   exports: 	  [OrganizationalStructurePositionsComponent]
})
export class OrganizationalStructurePositionsModule { }
