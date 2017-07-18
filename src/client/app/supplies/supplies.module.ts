import 'rxjs/add/operator/toPromise';
import { NgModule } from '@angular/core';
import { NavService } from '../_services/_nav.service';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { ListaService } from '../_services/lista.service';
import { SuppliesComponent } from './supplies.component';
import { SuppliesService } from '../_services/supplies.service';
import { SuppliesAddComponent } from './supplies-add.component';
import { SuppliesUpdateComponent } from './supplies-update.component';


@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],

              declarations: [ SuppliesComponent, SuppliesAddComponent, SuppliesUpdateComponent
              ],
              bootstrap: [ SuppliesComponent ],
              providers: [ SuppliesService, NavService, ListaService ],
              exports: [ SuppliesComponent ]
           } )
export class SuppliesModule {
}
