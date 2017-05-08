import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormSharedModule } from "../shared/form-shared.module";
import { PositionRolesComponent } from "./position-roles.component";
import { PositionRolesServices } from "../_services/position-roles.service";
import { ListaService } from "../_services/lista.service";

@NgModule( {
              imports: [ CommonModule,
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [ PositionRolesComponent ],
              bootstrap: [ PositionRolesComponent ],
              providers: [ PositionRolesServices, ListaService ],
              exports: [ PositionRolesComponent ]
           } )

export class PositionRolesModule {
   
}
