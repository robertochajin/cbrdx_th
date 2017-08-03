import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { OccupationalExamsComponent } from './occupational-exams.component';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule

              ],
              declarations: [ OccupationalExamsComponent ],
              bootstrap: [ OccupationalExamsComponent ],
              providers: [],
              exports: [ OccupationalExamsComponent ]
           } )
export class OccupationalExamsModule {

}
