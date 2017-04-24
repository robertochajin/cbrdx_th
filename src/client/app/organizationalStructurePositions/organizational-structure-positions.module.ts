import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrganizationalStructurePositionsComponent} from "./organizational-structure-positions.component";
import {PersonPositionsServices} from "../_services/personPositions.service";
import {OrganizationalStructurePositionsServices} from "../_services/organizationalStructurePositions.service";
import {SharedModule} from "../shared/shared.module";
import {FormSharedModule} from "../shared/form-shared.module";
import {PositionsService} from "../_services/positions.service";
import {ListaService} from "../_services/lista.service";

@NgModule({
   imports:      [CommonModule,
      SharedModule,
      FormSharedModule
   ],
   declarations: [
      OrganizationalStructurePositionsComponent
   ],
   bootstrap:    [OrganizationalStructurePositionsComponent],
   providers:    [PersonPositionsServices, OrganizationalStructurePositionsServices, ListaService, PositionsService],
   exports: 	  [OrganizationalStructurePositionsComponent]
})
export class OrganizationalStructurePositionsModule { }
