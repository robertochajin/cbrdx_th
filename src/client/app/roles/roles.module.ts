import { NgModule } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";
import { RolesService } from "../_services/roles.service";
import { RolesComponent } from "./roles.component";
import { RolesAddComponent } from "./roles-add.component";
import { RolesUpdateComponent } from "./roles-update.component";
import { MenuElementoService } from "../_services/menuElemento.service";
import { SharedModule } from "../shared/shared.module";
import { FormSharedModule } from "../shared/form-shared.module";

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [
                 RolesComponent,
                 RolesAddComponent,
                 RolesUpdateComponent
              ],
              bootstrap: [ RolesComponent ],
              providers: [
                 RolesService,
                 MenuElementoService
              ],
              exports: [ RolesComponent ]
           } )
export class RolesModule {
}