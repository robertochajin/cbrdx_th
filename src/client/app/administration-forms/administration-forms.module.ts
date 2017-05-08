import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormSharedModule } from "../shared/form-shared.module";
import { AdministrationFormsComponent } from "./administration-forms.component";

@NgModule( {
              imports: [
                 CommonModule,
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [ AdministrationFormsComponent ],
              bootstrap: [ AdministrationFormsComponent ],
              exports: [ AdministrationFormsComponent ]
           } )

export class AdministrationFormsModule {
   
}

