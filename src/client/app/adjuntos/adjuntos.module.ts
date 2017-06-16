import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { FormSharedModule } from '../shared/form-shared.module';
import { InputSwitchModule, CheckboxModule } from 'primeng/primeng';
import { SharedModule } from '../shared/shared.module';
import { AdjuntosComponent } from './adjuntos.component';
import { AdjuntosService } from '../_services/adjuntos.service';

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
              providers: [ AdjuntosService ],
              exports: [ AdjuntosComponent ]
           } )
export class AdjuntosModule {
}
