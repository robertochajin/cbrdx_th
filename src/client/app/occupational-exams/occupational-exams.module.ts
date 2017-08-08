import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormSharedModule } from '../shared/form-shared.module';
import { OccupationalExamsComponent } from './occupational-exams.component';
import { ExamPipe } from '../_helpers/examPipe';
import { AnswerExamOccupationalPeriodComponent } from './answer-exam-occupational-period.component';

@NgModule( {
              imports: [
                 SharedModule,
                 FormSharedModule

              ],
              declarations: [ OccupationalExamsComponent, ExamPipe, AnswerExamOccupationalPeriodComponent ],
              bootstrap: [ OccupationalExamsComponent ],
              providers: [],
              exports: [ OccupationalExamsComponent ]
           } )
export class OccupationalExamsModule {

}
