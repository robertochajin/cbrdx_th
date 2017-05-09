import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { FormManagerComponent } from './form-manager.component';
import { FormManagerAddComponent } from './form-manager-add.component';
import { FormManagerUpdateComponent } from './form-manager-update.component';
// import {FunctionalityComponent} from "./functionality.component";
import { FormManagerService } from '../_services/form-manager.service';
import { FormSharedModule } from '../shared/form-shared.module';
import { SharedModule } from '../shared/shared.module';
;

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 ReactiveFormsModule

              ],
              declarations: [
                 FormManagerComponent,
                 FormManagerAddComponent,
                 FormManagerUpdateComponent,
                 // FunctionalityComponent
              ],
              bootstrap: [ FormManagerComponent ],
              providers: [ FormManagerService ],
              exports: [ FormManagerComponent ]
           } )
export class FormManagerModule {
}
