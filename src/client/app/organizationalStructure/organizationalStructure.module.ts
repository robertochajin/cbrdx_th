import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import {NgModule} from "@angular/core";
import {SharedModule } from '../shared/shared.module';
import {FormSharedModule } from '../shared/form-shared.module';


import {OrganizationalStructureService} from "../_services/organizationalStructure.service";
import {OrganizationalStructureComponent} from "./organizationalStructure.component";

@NgModule({
    imports: [
       SharedModule,
       FormSharedModule,
    ],
    declarations: [OrganizationalStructureComponent],
    bootstrap: [OrganizationalStructureComponent],
    providers: [OrganizationalStructureService],
    exports: [OrganizationalStructureComponent]
})
export class OrganizationalStructureModule {

}