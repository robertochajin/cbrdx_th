import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { ListaService } from "../_services/lista.service";
import { ListaComponent } from "./lista.component";
import { ListaDetailComponent } from "./lista-detail.component";
import { SharedModule } from "../shared/shared.module";
import { FormSharedModule } from "../shared/form-shared.module";
import { ListaEditComponent } from "./lista-edit.component";

@NgModule( {
              imports: [ CommonModule, FormsModule, FormSharedModule, SharedModule ],
              declarations: [ ListaComponent, ListaDetailComponent, ListaEditComponent ],
              bootstrap: [ ListaComponent ],
              providers: [ ListaService ],
              exports: [ ListaComponent ]
           } )
export class ListaModule {
}