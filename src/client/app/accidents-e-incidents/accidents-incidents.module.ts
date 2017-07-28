import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { AccidentIncidentComponent } from './accidents-incidents.component';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule,
              ],
              declarations: [ AccidentIncidentComponent ],
              bootstrap: [ AccidentIncidentComponent ],
              providers: [  ],
              exports: [ AccidentIncidentComponent ]
           } )
export class AccidentIncidentModule {

}