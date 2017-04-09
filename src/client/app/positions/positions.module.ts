import "rxjs/add/operator/toPromise";
import { NgModule } from "@angular/core";
import { PositionsComponent } from "./positions.component";
import { PositionsUpdateComponent } from "./positions-update.component";
import { PositionsAddComponent } from "./positions-add.component";
import { PositionsObservationsListComponent } from "./positions-observations-list.component";
import { PositionsService } from "../_services/positions.service";
import { ListPositionsService } from "../_services/lists-positions.service";
import { PoliticalDivisionService } from "../_services/political-division.service";
import { NavService } from "../_services/_nav.service";
import { FormSharedModule } from "../shared/form-shared.module";

@NgModule( {
              imports: [
                 FormSharedModule,
              ],
   
              declarations: [
                 PositionsComponent,
                 PositionsUpdateComponent,
                 PositionsAddComponent,
                 PositionsObservationsListComponent
              ],
              bootstrap: [ PositionsComponent ],
              providers: [ PositionsService, ListPositionsService, PoliticalDivisionService, NavService ],
              exports: [ PositionsComponent ]
           } )
export class PositionsModule {
}
