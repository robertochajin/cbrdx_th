import "rxjs/add/operator/toPromise";
import { NgModule } from "@angular/core";
import { FaultsAndSanctionsComponent } from "./faults-and-sanctions.component";
import { FaultsAndSanctionsAddComponent } from "./faults-and-sanctions-add.component";
import { FaultsAndSanctionsUpdateComponent } from "./faults-and-sanctions-update.component";
import { SharedModule } from "../shared/shared.module";
import { FormSharedModule } from "../shared/form-shared.module";
import { FaultsAndSanctionsService } from "../_services/faultsAndSanctions.service";

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],
   
              declarations: [
                 FaultsAndSanctionsComponent,
                 FaultsAndSanctionsAddComponent,
                 FaultsAndSanctionsUpdateComponent
              ],
              bootstrap: [ FaultsAndSanctionsComponent ],
              providers: [ FaultsAndSanctionsService ],
              exports: [ FaultsAndSanctionsComponent ]
           } )
export class FaultsAndSanctionsModule {
}
