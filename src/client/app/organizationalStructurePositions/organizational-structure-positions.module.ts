import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganizationalStructurePositionsComponent} from "./organizational-structure-positions.component";
import {PersonPositionsServices} from "../_services/personPositions.service";
import {OrganizationalStructurePositionsServices} from "../_services/organizationalStructurePositions.service";
import {ContractTypesServices} from "../_services/contractTypes.service";

@NgModule({
   imports:      [CommonModule
   ],
   declarations: [
      OrganizationalStructurePositionsComponent
   ],
   bootstrap:    [OrganizationalStructurePositionsComponent],
   providers:    [PersonPositionsServices, OrganizationalStructurePositionsServices, ContractTypesServices],
   exports: 	  [OrganizationalStructurePositionsComponent]
})
export class OrganizationalStructurePositionsModule { }