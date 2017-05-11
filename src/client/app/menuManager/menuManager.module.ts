import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { MenuManagerComponent } from './menuManager.component';
import { MenuManagerService } from '../_services/menuManager.service';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule
              ],
              declarations: [ MenuManagerComponent ],
              bootstrap: [ MenuManagerComponent ],
              providers: [ MenuManagerService ],
              exports: [ MenuManagerComponent ]
           } )
export class MenuManagerModule {

}
