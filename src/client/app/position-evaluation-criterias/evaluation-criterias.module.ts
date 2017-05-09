import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'rxjs/add/operator/toPromise';
import { SharedModule } from '../shared/shared.module';
import { EvaluationCriteriasComponent } from './evaluation-criterias.component';
import { EvaluationCriteriasServices } from '../_services/evaluation-criterias.service';
import { PositionCriteriasService } from '../_services/position-criterias.service';
import { FormSharedModule } from '../shared/form-shared.module';
import { SpinnerModule } from 'primeng/primeng';

@NgModule( {
              imports: [ CommonModule,
                 SharedModule,
                 FormSharedModule,
                 SpinnerModule
              ],
              declarations: [ EvaluationCriteriasComponent ],
              bootstrap: [ EvaluationCriteriasComponent ],
              providers: [ EvaluationCriteriasServices, PositionCriteriasService ],
              exports: [ EvaluationCriteriasComponent ]
           } )

export class EvaluationCriteriasModule {
}
