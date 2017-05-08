import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchPersonsComponent } from "./search-persons.component";

@NgModule( {
              imports: [ CommonModule
              ],
              declarations: [
                 SearchPersonsComponent
              ],
              bootstrap: [ SearchPersonsComponent ],
              providers: [],
              exports: [ SearchPersonsComponent ]
           } )
export class PersonsModule {
}