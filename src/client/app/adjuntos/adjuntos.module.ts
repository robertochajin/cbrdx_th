import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { FormSharedModule } from '../shared/form-shared.module';
import { RisksService } from '../_services/risks.service';
import { InputSwitchModule, CheckboxModule } from 'primeng/primeng';
import { SharedModule } from '../shared/shared.module';
import { AdjuntosComponent } from './adjuntos.component';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
                 ReactiveFormsModule,
                 InputSwitchModule,
                 CheckboxModule
              ],
              declarations: [
                 AdjuntosComponent
              ],
              bootstrap: [ AdjuntosComponent ],
              providers: [ RisksService ],
              exports: [ AdjuntosComponent ]
           } )
export class AdjuntosModule {
}
